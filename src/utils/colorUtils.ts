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

// Update the type definition with an index signature
interface ColorScale {
    [key: number]: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
}

interface ColorScaleSet {
    base: ColorScale;
    alpha: ColorScale;
    utility: {
        contrast: string;
        surface: string;
        indicator: string;
        track: string;
    };
}

export function generateColorScales(hexColor: string): {
    light: ColorScaleSet;
    dark: ColorScaleSet;
} {
    // Normalize hex color to lowercase for comparison
    const normalizedHex = hexColor.toLowerCase();
    const color = chroma(hexColor);
    const hue = color.get("hsl.h") || 0;
    const saturation = color.get("hsl.s");
    const lightness = color.get("hsl.l");

    // Special case for white (#FFFFFF) in dark mode
    const whiteInDarkMode: ColorScaleSet = {
        base: {
            1: "#111113",
            2: "#19191b",
            3: "#222325",
            4: "#292a2e",
            5: "#303136",
            6: "#393a40",
            7: "#46484f",
            8: "#5f606a",
            9: "#ffffff", // Original color
            10: "#f5f6f8",
            11: "#b2b3bd",
            12: "#eeeef0",
        },
        alpha: {
            1: "#1111bb03",
            2: "#cbcbf90b",
            3: "#d6e2f916",
            4: "#d1d9f920",
            5: "#d7ddfd28",
            6: "#d9defc33",
            7: "#dae2fd43",
            8: "#e0e3fd60",
            9: "#ffffff",
            10: "#fcfdfff8",
            11: "#eff0feb9",
            12: "#fdfdffef",
        },
        utility: {
            contrast: "#311921",
            surface: "#21212580",
            indicator: "#fff",
            track: "#fff",
        },
    };

    // Special case for black (#111111) in light mode
    const blackInLightMode: ColorScaleSet = {
        base: {
            1: "#fcfcfc",
            2: "#f9f9f9",
            3: "#f0f0f0",
            4: "#e8e8e8",
            5: "#e1e1e1",
            6: "#d9d9d9",
            7: "#cecece",
            8: "#bbbbbb",
            9: "#111111", // Original color
            10: "#2a2a2a",
            11: "#636363",
            12: "#1f1f1f",
        },
        alpha: {
            1: "#00000003",
            2: "#00000006",
            3: "#0000000f",
            4: "#00000017",
            5: "#0000001e",
            6: "#00000026",
            7: "#00000031",
            8: "#00000044",
            9: "#000000ee",
            10: "#000000d5",
            11: "#0000009c",
            12: "#000000e0",
        },
        utility: {
            contrast: "#ffffff",
            surface: "#f8f8f8cc",
            indicator: "#111111",
            track: "#111111",
        },
    };

    // Special cases for white and black
    if (normalizedHex === "#ffffff") {
        return {
            light: {
                base: {
                    1: "#fcfcfd",
                    2: "#f9f9fb",
                    3: "#f3f3f6",
                    4: "#ececf1",
                    5: "#e4e4e9",
                    6: "#dcdce3",
                    7: "#d0d0d9",
                    8: "#c1c1cd",
                    9: "#ffffff",
                    10: "#8e8ea0",
                    11: "#6f6f87",
                    12: "#2c2c3c",
                },
                alpha: {
                    1: "#ffffff03",
                    2: "#ffffff06",
                    3: "#ffffff0a",
                    4: "#ffffff10",
                    5: "#ffffff18",
                    6: "#ffffff26",
                    7: "#ffffff40",
                    8: "#ffffff5e",
                    9: "#ffffff",
                    10: "#ffffffc8",
                    11: "#ffffffe0",
                    12: "#fffffff0",
                },
                utility: {
                    contrast: "#ffffff",
                    surface: "#f9f9fb80",
                    indicator: "#000000",
                    track: "#e4e4e9",
                },
            },
            dark: whiteInDarkMode,
        };
    } else if (normalizedHex === "#111111") {
        return {
            light: blackInLightMode,
            dark: {
                base: {
                    1: "#111113",
                    2: "#19191b",
                    3: "#222325",
                    4: "#292a2e",
                    5: "#303136",
                    6: "#393a40",
                    7: "#46484f",
                    8: "#5f606a",
                    9: "#111111",
                    10: "#f5f6f8",
                    11: "#b2b3bd",
                    12: "#eeeef0",
                },
                alpha: {
                    1: "#11111103",
                    2: "#1111110b",
                    3: "#11111116",
                    4: "#11111120",
                    5: "#11111128",
                    6: "#11111133",
                    7: "#11111143",
                    8: "#11111160",
                    9: "#111111",
                    10: "#111111f8",
                    11: "#111111b9",
                    12: "#111111ef",
                },
                utility: {
                    contrast: "#311921",
                    surface: "#21212580",
                    indicator: "#fff",
                    track: "#fff",
                },
            },
        };
    }

    // Improved dark mode scale generation
    const darkBase: ColorScale = {
        1: chroma.hsl(hue, Math.min(saturation * 0.25, 0.12), 0.09).hex(),
        2: chroma.hsl(hue, Math.min(saturation * 0.3, 0.14), 0.11).hex(),
        3: chroma.hsl(hue, Math.min(saturation * 0.4, 0.18), 0.14).hex(),
        4: chroma.hsl(hue, Math.min(saturation * 0.5, 0.22), 0.17).hex(),
        5: chroma.hsl(hue, Math.min(saturation * 0.6, 0.24), 0.21).hex(),
        6: chroma.hsl(hue, Math.min(saturation * 0.65, 0.26), 0.25).hex(),
        7: chroma.hsl(hue, Math.min(saturation * 0.7, 0.28), 0.31).hex(),
        8: chroma.hsl(hue, Math.min(saturation * 0.8, 0.32), 0.39).hex(),
        9: hexColor, // Original color
        10: chroma
            .hsl(hue, Math.min(saturation * 0.85, 0.9), lightness * 0.93)
            .hex(),
        11: chroma.hsl(hue, Math.min(saturation * 0.9, 0.9), 0.78).hex(),
        12: chroma.hsl(hue, Math.min(saturation * 0.3, 0.5), 0.9).hex(),
    };

    // Improved light mode scale generation
    const lightBase: ColorScale = {
        1: chroma.hsl(hue, Math.min(saturation * 0.04, 0.02), 0.99).hex(),
        2: chroma.hsl(hue, Math.min(saturation * 0.08, 0.04), 0.98).hex(),
        3: chroma.hsl(hue, Math.min(saturation * 0.12, 0.06), 0.95).hex(),
        4: chroma.hsl(hue, Math.min(saturation * 0.16, 0.08), 0.92).hex(),
        5: chroma.hsl(hue, Math.min(saturation * 0.24, 0.1), 0.89).hex(),
        6: chroma.hsl(hue, Math.min(saturation * 0.32, 0.12), 0.85).hex(),
        7: chroma.hsl(hue, Math.min(saturation * 0.44, 0.16), 0.78).hex(),
        8: chroma.hsl(hue, Math.min(saturation * 0.65, 0.24), 0.67).hex(),
        9: hexColor, // Original color
        10: chroma
            .hsl(hue, Math.min(saturation * 0.85, 0.8), lightness * 0.9)
            .hex(),
        11: chroma.hsl(hue, Math.min(saturation * 1.1, 1), 0.62).hex(),
        12: chroma.hsl(hue, Math.min(saturation * 0.8, 0.7), 0.22).hex(),
    };

    // Improved alpha scales
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

    // Improved utility colors
    const darkUtility = {
        contrast: "#fff",
        surface: chroma
            .hsl(hue, Math.min(saturation * 0.5, 0.2), 0.12)
            .alpha(0.5)
            .hex(),
        indicator: hexColor,
        track: hexColor,
    };

    const lightUtility = {
        contrast: "#fff",
        surface: chroma
            .hsl(hue, Math.min(saturation * 0.1, 0.05), 0.97)
            .alpha(0.5)
            .hex(),
        indicator: hexColor,
        track: chroma.hsl(hue, Math.min(saturation * 0.2, 0.1), 0.89).hex(),
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

// TODO: Remove me
// console.log("### Color test: \n", generateColorScales("#FFFFFF"));
