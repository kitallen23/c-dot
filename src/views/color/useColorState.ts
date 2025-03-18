import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    hexToHsv,
    hslToHsv,
    hsvToRgb,
    rgbToHex,
    rgbToHsl,
    rgbToHsv,
} from "@/utils/colorUtils";
import { HSL, HSV, RGB } from "@/types/color";

interface ColorState {
    hex: string;
    rgb: RGB;
    hsl: HSL;
    hsv: HSV;
}

const toRgbObject = ([r, g, b]: number[]): RGB => ({ r, g, b });
const toHsvObject = ([h, s, v]: number[]): HSV => ({ h, s, v });
const toHslObject = ([h, s, l]: number[]): HSL => ({ h, s, l });

const useColorState = (externalHex: string) => {
    // Use HSV as the source of truth, as this will likely update the most
    const [internalColor, setInternalColor] = useState<HSV>(
        toHsvObject(hexToHsv(externalHex))
    );
    const isInternalUpdateRef = useRef(false);

    const debouncedFunctionsRef = useRef({
        updateHex: (hex: string) => {
            isInternalUpdateRef.current = true;
            setInternalColor(toHsvObject(hexToHsv(hex)));
        },
        updateRgb: (rgb: RGB) => {
            isInternalUpdateRef.current = true;
            setInternalColor(toHsvObject(rgbToHsv(rgb.r, rgb.g, rgb.b)));
        },
        updateHsl: (hsl: HSL) => {
            isInternalUpdateRef.current = true;
            setInternalColor(toHsvObject(hslToHsv(hsl.h, hsl.s, hsl.l)));
        },
        updateHsv: (hsv: HSV) => {
            isInternalUpdateRef.current = true;
            setInternalColor(hsv);
        },
    });

    // Listen for external hex changes
    useEffect(() => {
        if (!isInternalUpdateRef.current) {
            setInternalColor(toHsvObject(hexToHsv(externalHex)));
        } else {
            isInternalUpdateRef.current = false;
        }
    }, [externalHex]);

    // Derived color values
    const colorState = useMemo<ColorState>(() => {
        const rgb = toRgbObject(
            hsvToRgb(internalColor.h, internalColor.s, internalColor.v)
        );
        return {
            hsv: internalColor,
            rgb,
            hex: rgbToHex(rgb.r, rgb.g, rgb.b),
            hsl: toHslObject(rgbToHsl(rgb.r, rgb.g, rgb.b)),
        };
    }, [internalColor]);

    // Wrapper functions that call the debounced functions
    const updateHex = useCallback((hex: string) => {
        debouncedFunctionsRef.current.updateHex(hex);
    }, []);

    const updateRgb = useCallback((rgb: RGB) => {
        debouncedFunctionsRef.current.updateRgb(rgb);
    }, []);

    const updateHsl = useCallback((hsl: HSL) => {
        debouncedFunctionsRef.current.updateHsl(hsl);
    }, []);

    const updateHsv = useCallback((hsv: HSV) => {
        debouncedFunctionsRef.current.updateHsv(hsv);
    }, []);

    return { ...colorState, updateHex, updateRgb, updateHsl, updateHsv };
};

export default useColorState;
