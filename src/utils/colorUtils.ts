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

    // Default light theme values (for colors other than black)
    const lightBase: ColorScale = {
        1: "#fcfcfd",
        2: "#f9f9fb",
        3: "#f3f3f6",
        4: "#ececf1",
        5: "#e4e4e9",
        6: "#dcdce3",
        7: "#d0d0d9",
        8: "#c1c1cd",
        9: hexColor, // Original color
        10: "#8e8ea0",
        11: "#6f6f87",
        12: "#2c2c3c",
    };

    // Default dark theme values (for colors other than white)
    const darkBase: ColorScale = {
        1: "#111113",
        2: "#19191b",
        3: "#222325",
        4: "#292a2e",
        5: "#303136",
        6: "#393a40",
        7: "#46484f",
        8: "#5f606a",
        9: hexColor, // Original color
        10: "#f5f6f8",
        11: "#b2b3bd",
        12: "#eeeef0",
    };

    // Default alpha values
    const lightAlpha: ColorScale = {
        1: `${hexColor}03`,
        2: `${hexColor}06`,
        3: `${hexColor}0a`,
        4: `${hexColor}10`,
        5: `${hexColor}18`,
        6: `${hexColor}26`,
        7: `${hexColor}40`,
        8: `${hexColor}5e`,
        9: hexColor,
        10: `${hexColor}c8`,
        11: `${hexColor}e0`,
        12: `${hexColor}f0`,
    };

    const darkAlpha: ColorScale = {
        1: `${hexColor}03`,
        2: `${hexColor}0b`,
        3: `${hexColor}16`,
        4: `${hexColor}20`,
        5: `${hexColor}28`,
        6: `${hexColor}33`,
        7: `${hexColor}43`,
        8: `${hexColor}60`,
        9: hexColor,
        10: `${hexColor}f8`,
        11: `${hexColor}b9`,
        12: `${hexColor}ef`,
    };

    // Default utility colors
    const lightUtility = {
        contrast: "#ffffff",
        surface: "#f9f9fb80",
        indicator: "#000000",
        track: "#e4e4e9",
    };

    const darkUtility = {
        contrast: "#311921",
        surface: "#21212580",
        indicator: "#fff",
        track: "#fff",
    };

    // Handle special cases
    if (normalizedHex === "#ffffff") {
        // Use exact values for white in dark mode
        return {
            light: {
                base: lightBase,
                alpha: lightAlpha,
                utility: lightUtility,
            },
            dark: whiteInDarkMode,
        };
    } else if (normalizedHex === "#111111") {
        // Use exact values for black in light mode
        return {
            light: blackInLightMode,
            dark: {
                base: darkBase,
                alpha: darkAlpha,
                utility: darkUtility,
            },
        };
    }

    // For other colors, adjust the scales based on the color's properties
    const color = chroma(hexColor);
    const hue = color.get("hsl.h") || 0;
    const saturation = color.get("hsl.s");

    // Only modify the scales if the color has significant saturation
    if (saturation > 0.05) {
        // Adjust the dark scale with the color's hue
        for (let i = 1; i <= 8; i++) {
            // Keep the same lightness but apply the hue with reduced saturation
            const baseLightness = chroma(darkBase[i]).get("hsl.l");
            darkBase[i] = chroma
                .hsl(hue, Math.min(saturation * (i / 16), 0.2), baseLightness)
                .hex();
        }

        // Steps 10-12 in dark mode
        darkBase[10] = chroma
            .hsl(hue, Math.min(saturation * 0.3, 0.3), 0.93)
            .hex();
        darkBase[11] = chroma
            .hsl(hue, Math.min(saturation * 0.5, 0.4), 0.75)
            .hex();
        darkBase[12] = chroma
            .hsl(hue, Math.min(saturation * 0.2, 0.2), 0.9)
            .hex();

        // Adjust the light scale with the color's hue
        for (let i = 1; i <= 8; i++) {
            const baseLightness = chroma(lightBase[i]).get("hsl.l");
            lightBase[i] = chroma
                .hsl(hue, Math.min(saturation * (i / 20), 0.15), baseLightness)
                .hex();
        }

        // Steps 10-12 in light mode
        lightBase[10] = chroma
            .hsl(hue, Math.min(saturation * 0.4, 0.5), 0.6)
            .hex();
        lightBase[11] = chroma
            .hsl(hue, Math.min(saturation * 0.5, 0.6), 0.45)
            .hex();
        lightBase[12] = chroma
            .hsl(hue, Math.min(saturation * 0.6, 0.7), 0.22)
            .hex();

        // Adjust utility colors based on hue
        darkUtility.contrast = chroma.hsl((hue + 30) % 360, 0.3, 0.88).hex();
        lightUtility.contrast = chroma.hsl((hue + 180) % 360, 0.3, 0.12).hex();
    }

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
console.log("### Color test: \n", generateColorScales("#FFFFFF"));
