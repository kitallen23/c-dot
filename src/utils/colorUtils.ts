import { ColorScale, ColorScaleSet } from "@/types/theme";
// import { DEFAULT_COLOR_SCALE } from "@/utils/constants";
import chroma from "chroma-js";

export function isValidHexColor(color: string): boolean {
    const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
    return hexColorRegex.test(color);
}

export function normalizeHexColor(color: string): string {
    if (!color.startsWith("#")) {
        throw new Error("Invalid hex color format");
    }
    const cleanHex = color.replace(/^#/, "");
    let normalizedHex = "";

    // If it's already 6 digits, return it
    if (cleanHex.length === 6) {
        normalizedHex = `#${cleanHex}`;
    }

    // If it's 3 digits, expand it
    if (cleanHex.length === 3) {
        const expandedHex = cleanHex
            .split("")
            .map(char => char + char)
            .join("");
        normalizedHex = `#${expandedHex}`;
    }

    if (isValidHexColor(normalizedHex)) {
        return normalizedHex;
    }

    throw new Error("Invalid hex color format");
}

/**
 * Checks if a color has sufficient contrast against a background color
 * @param hexColor The color to check
 * @param background The background color to check against
 * @returns Whether the color has sufficient contrast for accessibility
 */
export function isBrandSafe(hexColor: string, background: string): boolean {
    const contrast = chroma.contrast(hexColor, background);

    // WCAG AA requires a contrast ratio of at least 4.5:1 for normal text
    // and 3:1 for large text or UI components
    // We'll use 3:1 as our threshold for UI elements
    return contrast >= 3;
}

export function generateColorScales(hexColor: string): {
    light: ColorScaleSet;
    dark: ColorScaleSet;
} {
    // Normalize hex color to lowercase for comparison
    // const normalizedHex = hexColor.toLowerCase();
    const color = chroma(hexColor);
    const hue = color.get("hsl.h") || 0;
    const saturation = color.get("hsl.s");
    const lightness = color.get("hsl.l");

    // Special case for white (#FFFFFF) in dark mode
    // const whiteInDarkMode: ColorScaleSet = DEFAULT_COLOR_SCALE.dark;

    // Special case for black (#111111) in light mode
    // const blackInLightMode: ColorScaleSet = DEFAULT_COLOR_SCALE.light;

    // Alpha scales
    const darkAlpha: ColorScale = {
        1: `${hexColor}07`,
        2: `${hexColor}13`,
        3: `${hexColor}2b`,
        4: `${hexColor}40`,
        5: `${hexColor}4e`,
        6: `${hexColor}5d`,
        7: `${hexColor}75`,
        8: `${hexColor}9d`,
        9: hexColor,
        10: `${hexColor}ba`,
        11: `${hexColor}fc`,
        12: `${hexColor}f8`,
    };

    const lightAlpha: ColorScale = {
        1: `${hexColor}05`,
        2: `${hexColor}0a`,
        3: `${hexColor}14`,
        4: `${hexColor}1d`,
        5: `${hexColor}2b`,
        6: `${hexColor}38`,
        7: `${hexColor}4f`,
        8: `${hexColor}7e`,
        9: hexColor,
        10: `${hexColor}cc`,
        11: `${hexColor}eb`,
        12: `${hexColor}f5`,
    };

    // Special cases for white and black
    // if (normalizedHex === "#ffffff") {
    //     return {
    //         light: {
    //             base: {
    //                 ...DEFAULT_COLOR_SCALE.light.base,
    //                 9: "#ffffff",
    //                 10: chroma
    //                     .hsl(
    //                         hue,
    //                         Math.min(saturation * 1.0, 0.85),
    //                         lightness * 0.9
    //                     )
    //                     .hex(),
    //             },
    //             alpha: lightAlpha,
    //             utility: {
    //                 contrast: "#ffffff",
    //                 surface: "#f9f9fb80",
    //                 indicator: "#000000",
    //                 track: "#e4e4e9",
    //                 background: "#ffffff",
    //             },
    //         },
    //         dark: whiteInDarkMode,
    //     };
    // } else if (normalizedHex === "#111111") {
    //     return {
    //         light: blackInLightMode,
    //         dark: {
    //             base: {
    //                 ...DEFAULT_COLOR_SCALE.dark.base,
    //                 9: "#111111",
    //                 10: chroma
    //                     .hsl(
    //                         hue,
    //                         Math.min(saturation * 0.95, 0.9),
    //                         lightness * 0.93
    //                     )
    //                     .hex(),
    //             },
    //             alpha: darkAlpha,
    //             utility: {
    //                 contrast: "#311921",
    //                 surface: "#21212580",
    //                 indicator: "#ffffff",
    //                 track: "#ffffff",
    //                 background: "#111111",
    //             },
    //         },
    //     };
    // }

    // Much more vibrant dark mode scale generation
    const darkBase: ColorScale = {
        1: chroma.hsl(hue, Math.min(saturation * 0.6, 0.3), 0.09).hex(),
        2: chroma.hsl(hue, Math.min(saturation * 0.7, 0.35), 0.11).hex(),
        3: chroma.hsl(hue, Math.min(saturation * 0.8, 0.4), 0.14).hex(),
        4: chroma.hsl(hue, Math.min(saturation * 0.9, 0.45), 0.17).hex(),
        5: chroma.hsl(hue, Math.min(saturation * 1.0, 0.5), 0.21).hex(),
        6: chroma.hsl(hue, Math.min(saturation * 1.1, 0.55), 0.25).hex(),
        7: chroma.hsl(hue, Math.min(saturation * 1.2, 0.6), 0.31).hex(),
        8: chroma.hsl(hue, Math.min(saturation * 1.3, 0.65), 0.39).hex(),
        9: hexColor, // Original color
        10: chroma
            .hsl(hue, Math.min(saturation * 0.95, 0.9), lightness * 0.93)
            .hex(),
        11: chroma.hsl(hue, Math.min(saturation * 1.0, 0.9), 0.78).hex(),
        12: chroma.hsl(hue, Math.min(saturation * 0.5, 0.5), 0.9).hex(),
    };

    // Much more vibrant light mode scale generation
    const lightBase: ColorScale = {
        1: chroma.hsl(hue, Math.min(saturation * 0.08, 0.04), 0.99).hex(),
        2: chroma.hsl(hue, Math.min(saturation * 0.12, 0.06), 0.98).hex(),
        3: chroma.hsl(hue, Math.min(saturation * 0.16, 0.08), 0.95).hex(),
        4: chroma.hsl(hue, Math.min(saturation * 0.24, 0.12), 0.92).hex(),
        5: chroma.hsl(hue, Math.min(saturation * 0.36, 0.16), 0.89).hex(),
        6: chroma.hsl(hue, Math.min(saturation * 0.48, 0.24), 0.85).hex(),
        7: chroma.hsl(hue, Math.min(saturation * 0.64, 0.32), 0.78).hex(),
        8: chroma.hsl(hue, Math.min(saturation * 0.85, 0.48), 0.67).hex(),
        9: hexColor, // Original color
        10: chroma
            .hsl(hue, Math.min(saturation * 1.0, 0.85), lightness * 0.9)
            .hex(),
        11: chroma.hsl(hue, Math.min(saturation * 1.2, 1.0), 0.62).hex(),
        12: chroma.hsl(hue, Math.min(saturation * 1.0, 0.85), 0.22).hex(),
    };

    // Improved utility colors
    const darkUtility = {
        contrast: "#fff",
        surface: chroma
            .hsl(hue, Math.min(saturation * 0.7, 0.3), 0.12)
            .alpha(0.5)
            .hex(),
        indicator: hexColor,
        track: hexColor,
        background: "#111111",
    };

    const lightUtility = {
        contrast: "#fff",
        surface: chroma
            .hsl(hue, Math.min(saturation * 0.15, 0.08), 0.97)
            .alpha(0.5)
            .hex(),
        indicator: hexColor,
        track: chroma.hsl(hue, Math.min(saturation * 0.3, 0.15), 0.89).hex(),
        background: "#ffffff",
    };

    return {
        light: {
            base: lightBase,
            alpha: lightAlpha,
            utility: lightUtility,
        },
        dark: {
            base: darkBase,
            alpha: darkAlpha,
            utility: darkUtility,
        },
    };
}
