import Color from "colorjs.io";

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
    // Create Color objects
    const color1 = new Color(hexColor);
    const color2 = new Color(background);

    // Calculate contrast ratio
    const contrast = color1.contrast(color2, "WCAG21");

    // WCAG AA requires a contrast ratio of at least 4.5:1 for normal text
    // and 3:1 for large text or UI components
    // We'll use 3:1 as our threshold for UI elements
    return contrast >= 3;
}

/**
 * Converts HSV color values to HSL color values
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param v Value (0-100)
 * @returns [h, s, l] array where h is 0-360, s and l are 0-100
 */
export function hsvToHsl(
    h: number,
    s: number,
    v: number
): [number, number, number] {
    // Create a color from HSV
    const color = new Color("hsv", [h, s, v]);

    // Convert to HSL
    const hslColor = color.to("hsl");

    // Extract HSL values
    const [hue, saturation, lightness] = hslColor.coords;

    // Handle NaN values that can occur with grayscale colors
    const finalHue = isNaN(hue) ? h : hue;

    // Convert saturation and lightness back to 0-100 range and round
    return [
        Math.round(finalHue),
        Math.round(saturation),
        Math.round(lightness),
    ];
}
