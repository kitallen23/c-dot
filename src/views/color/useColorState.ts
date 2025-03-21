import { useCallback, useEffect, useRef, useState } from "react";
import { ColorTuple, HSL, HSV, RGB } from "@/types/color";
import {
    hexToRgb,
    hslToRgb,
    hsvToRgb,
    rgbToHex,
    rgbToHsl,
    rgbToHsv,
    toHslObj,
    toHsvObj,
    toRgbObj,
} from "@/utils/colorUtils";

interface ColorState {
    hex: string;
    rgb: RGB;
    hsl: HSL;
    hsv: HSV;
}

type ColorSource = keyof ColorState;

type UseColorStateReturn = ColorState & {
    updateColor: (value: RGB | HSL | HSV | string, source: ColorSource) => void;
};

const isDefaultHueValue = (value: ColorTuple): boolean =>
    value[0] === 0 && value[1] === 0 && value[2] === 100;
const DEFAULT_HUE_VALUE: ColorTuple = [180, 0, 100];

// TODO: Set this value properly
const DEBOUNCE_MS = 1000;

export const useColorState = (initialColor: string): UseColorStateReturn => {
    const [colorState, setColorState] = useState<ColorState>(() => {
        const rgb = hexToRgb(initialColor);
        const hsv = rgbToHsv(...rgb);
        const hsl = rgbToHsl(...rgb);
        return {
            hex: initialColor,
            rgb: toRgbObj(rgb),
            hsl: toHslObj(isDefaultHueValue(hsl) ? DEFAULT_HUE_VALUE : hsl),
            hsv: toHsvObj(isDefaultHueValue(hsv) ? DEFAULT_HUE_VALUE : hsv),
        };
    });

    // Tracks the last update source to prevent unnecessary conversions
    const lastSourceRef = useRef<ColorSource | null>(null);

    // Store our timeout ID for debouncing
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const updateColor = useCallback(
        (value: RGB | HSL | HSV | string, source: ColorSource) => {
            setColorState(prevState => {
                const newState = { ...prevState, [source]: value };
                lastSourceRef.current = source;
                return newState;
            });

            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            debounceTimerRef.current = setTimeout(() => {
                setColorState(() => {
                    let rgb: RGB, hsv: HSV, hsl: HSL, hex: string;

                    switch (source) {
                        case "hex": {
                            hex = value as string;
                            const rgbArr = hexToRgb(hex);
                            rgb = toRgbObj(rgbArr);
                            hsv = toHsvObj(rgbToHsv(...rgbArr));
                            hsl = toHslObj(rgbToHsl(...rgbArr));
                            break;
                        }
                        case "rgb": {
                            rgb = value as RGB;
                            const rgbArr: ColorTuple = [rgb.r, rgb.g, rgb.b];
                            hex = rgbToHex(...rgbArr);
                            hsv = toHsvObj(rgbToHsv(...rgbArr));
                            hsl = toHslObj(rgbToHsl(...rgbArr));
                            break;
                        }
                        case "hsl": {
                            hsl = value as HSL;
                            const rgbArr = hslToRgb(hsl.h, hsl.s, hsl.l);
                            rgb = toRgbObj(rgbArr);
                            hex = rgbToHex(...rgbArr);
                            hsv = toHsvObj(rgbToHsv(...rgbArr));
                            break;
                        }
                        case "hsv": {
                            hsv = value as HSV;
                            const rgbArr = hsvToRgb(hsv.h, hsv.s, hsv.v);
                            rgb = toRgbObj(rgbArr);
                            hsl = toHslObj(rgbToHsl(...rgbArr));
                            hex = rgbToHex(...rgbArr);
                            break;
                        }
                    }

                    return { hex, rgb, hsl, hsv };
                });

                debounceTimerRef.current = null;
            }, DEBOUNCE_MS);
        },
        []
    );

    return {
        ...colorState,
        updateColor,
    };
};

export default useColorState;
