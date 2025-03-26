import React, { ComponentProps, useEffect, useState } from "react";
import { TextField } from "@radix-ui/themes";

import { isValidHexString } from "@/utils/colorUtils";

interface HexFieldProps
    extends Omit<ComponentProps<typeof TextField.Root>, "onChange" | "value"> {
    value: string;
    autoSelect?: boolean;
    onChange: (
        value: string,
        event?: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

const HexField = ({ value, autoSelect, onChange, ...rest }: HexFieldProps) => {
    const [tempValue, setTempValue] = useState<string>(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Filter out invalid hex characters, keeping only 0-9, a-f, A-F, and #
        const filteredValue = event.target.value.replace(/[^0-9a-fA-F]/g, "");

        // Ensure it starts with #
        const tempValue = `#${filteredValue}`;

        // Immediately update the temp value regardless of validity
        setTempValue(tempValue);

        const isValid = isValidHexString(tempValue);
        if (isValid) {
            onChange(tempValue, event);
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (autoSelect) {
            e.target.select();
        }
    };

    // On blur, reset our string value if it isn't a valid RGB
    const handleBlur = () => {
        const isValid = isValidHexString(tempValue);
        if (!isValid) {
            setTempValue(value);
        }
    };

    // Update temp value when external value changes
    useEffect(() => {
        setTempValue(value);
    }, [value]);

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

export default HexField;
