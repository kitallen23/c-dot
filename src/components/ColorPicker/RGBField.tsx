import React, { ComponentProps, useEffect, useState } from "react";
import { TextField } from "@radix-ui/themes";

import { isValidRgbString, rgbToString, stringToRgb } from "@/utils/colorUtils";
import { RGB } from "@/types/color";

/**
 * Cleans an RGB/RGBA string input by removing formatting if present,
 * but preserves raw number inputs.
 *
 * @param input - The string to clean, which could be in various RGB formats
 * @returns The cleaned string containing just the RGB values separated by commas
 */
function cleanRgbInput(input: string): string {
    // Trim whitespace
    const trimmed = input.trim();

    // Check if it's an rgb/rgba format with parentheses
    const rgbRegex =
        /^rgba?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i;
    const match = trimmed.match(rgbRegex);

    if (match) {
        // Extract just the RGB values (ignore alpha)
        return `${match[1]}, ${match[2]}, ${match[3]}`;
    }

    return trimmed;
}

interface RGBFieldProps
    extends Omit<ComponentProps<typeof TextField.Root>, "onChange" | "value"> {
    value: RGB;
    autoSelect?: boolean;
    onChange: (value: RGB, event?: React.ChangeEvent<HTMLInputElement>) => void;
}

const RGBField = ({ value, autoSelect, onChange, ...rest }: RGBFieldProps) => {
    // tempRgb acts as a value buffer to only update the text input when the
    // underlying RGB value changes. This is important to reduce the number of
    // times our text value is updated, as updating this value causes cursor
    // jumps.
    const [tempRgb, setTempRgb] = useState<RGB | null>(value);
    // tempValue is our string value; the actual value the input field interacts
    // with.
    const [tempValue, setTempValue] = useState<string>(rgbToString(value));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tempValue = cleanRgbInput(event.target.value);

        // Immediately update the temp value regardless of validity
        setTempValue(tempValue);

        const isValid = isValidRgbString(tempValue);
        if (isValid) {
            const rgb = stringToRgb(tempValue)!;
            onChange(rgb);
        }
    };

    // On blur, reset our string value if it isn't a valid RGB
    const handleBlur = () => {
        const isValid = isValidRgbString(tempValue);
        if (!isValid) {
            setTempValue(rgbToString(tempRgb));
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (autoSelect) {
            e.target.select();
        }
    };

    // Update temp value when external value changes
    useEffect(() => {
        if (!tempRgb) {
            // Temp RGB was null, so update it to the external value
            setTempRgb(value);
        } else if (
            tempRgb.r !== value.r ||
            tempRgb.g !== value.g ||
            tempRgb.b !== value.b
        ) {
            // Temp RGB is different to new value, so update temp RGB to be the
            // new external value
            setTempRgb(value);
        } else {
            // Value hasn't changed, so keep temp RGB (do nothing)
            return;
        }
    }, [value, tempRgb]);

    useEffect(() => {
        setTempValue(rgbToString(tempRgb));
    }, [tempRgb]);

    return (
        <TextField.Root
            {...rest}
            value={tempValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
        />
    );
};

export default RGBField;
