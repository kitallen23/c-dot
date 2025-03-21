import Color from "colorjs.io";
import { HSL, HSV, RGB } from "@/types/color";

export const toRgbObj = (arr: [number, number, number]): RGB => ({
    r: arr[0],
    g: arr[1],
    b: arr[2],
});
export const toHslObj = (arr: [number, number, number]): HSL => ({
    h: arr[0],
    s: arr[1],
    l: arr[2],
});
export const toHsvObj = (arr: [number, number, number]): HSV => ({
    h: arr[0],
    s: arr[1],
    v: arr[2],
});

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
 * Conversions to RGB
 */

/**
 * Converts HSV color values to RGB color values.
 *
 * @param h - The hue value (0-360)
 * @param s - The saturation value (0-100)
 * @param v - The value/brightness (0-100)
 * @returns An array of RGB values, each in the range 0-255
 */
export function hsvToRgb(
    h: number,
    s: number,
    v: number
): [number, number, number] {
    // Create a color in HSV space
    const color = new Color("hsv", [h, s, v]);

    // Convert to sRGB
    const rgb = color.to("srgb");

    // Fix floating point precision issues by rounding to 6 decimal places
    // This properly handles values like 0.29999999999999993
    return [
        Math.round(rgb.coords[0] * 255 * 1000000) / 1000000,
        Math.round(rgb.coords[1] * 255 * 1000000) / 1000000,
        Math.round(rgb.coords[2] * 255 * 1000000) / 1000000,
    ];
}

/**
 * Converts a HEX color string to RGB color values.
 *
 * @param hex - The hex color string (e.g., "#ff0000")
 * @returns An array of RGB values, each in the range 0-255
 */
export function hexToRgb(hex: string): [number, number, number] {
    const color = new Color(hex);
    const rgb = color.to("srgb");

    // Fix floating point precision issues by rounding to 6 decimal places
    // This properly handles values like 0.29999999999999993
    return [
        Math.round(rgb.coords[0] * 255 * 1000000) / 1000000,
        Math.round(rgb.coords[1] * 255 * 1000000) / 1000000,
        Math.round(rgb.coords[2] * 255 * 1000000) / 1000000,
    ];
}

/**
 * Converts HSL color values to RGB color values.
 *
 * @param h - The hue value (0-360)
 * @param s - The saturation value (0-100)
 * @param l - The lightness value (0-100)
 * @returns An array of RGB values, each in the range 0-255
 */
export function hslToRgb(
    h: number,
    s: number,
    l: number
): [number, number, number] {
    const color = new Color("hsl", [h, s, l]);
    const rgb = color.to("srgb");

    // Fix floating point precision issues by rounding to 6 decimal places
    // This properly handles values like 0.29999999999999993
    return [
        Math.round(rgb.coords[0] * 255 * 1000000) / 1000000,
        Math.round(rgb.coords[1] * 255 * 1000000) / 1000000,
        Math.round(rgb.coords[2] * 255 * 1000000) / 1000000,
    ];
}

/**
 * Conversions from RGB to other formats
 */

/**
 * Converts RGB color values to HSV color values.
 *
 * @param r - The red value (0-255)
 * @param g - The green value (0-255)
 * @param b - The blue value (0-255)
 * @returns An array of HSV values [h(0-360), s(0-100), v(0-100)]
 */
export function rgbToHsv(
    r: number,
    g: number,
    b: number
): [number, number, number] {
    let h = 0,
        s = 0,
        v = 0;

    // Check for grayscale
    if (r === g && g === b) {
        // For grayscale, only calculate value (v)
        v = r / 2.55; // Convert to 0-100 range
    } else {
        const color = new Color("srgb", [r / 255, g / 255, b / 255]);
        const hsv = color.to("hsv");

        h = isNaN(hsv.coords[0]) ? 0 : hsv.coords[0];
        s = hsv.coords[1];
        v = hsv.coords[2];
    }

    // Apply consistent rounding to all values
    return [
        Math.round(h * 1000000) / 1000000,
        Math.round(s * 1000000) / 1000000,
        Math.round(v * 1000000) / 1000000,
    ];
}

/**
 * Converts RGB color values to HEX color string.
 *
 * @param r - The red value (0-255)
 * @param g - The green value (0-255)
 * @param b - The blue value (0-255)
 * @returns A hex color string (e.g., "#ff0000")
 */
export function rgbToHex(r: number, g: number, b: number): string {
    const color = new Color("srgb", [r / 255, g / 255, b / 255]);
    return color.to("srgb").toString({ format: "hex", collapse: false });
}

/**
 * Converts RGB color values to HSL color values.
 *
 * @param r - The red value (0-255)
 * @param g - The green value (0-255)
 * @param b - The blue value (0-255)
 * @returns An array of HSL values [h(0-360), s(0-100), l(0-100)]
 */
export function rgbToHsl(
    r: number,
    g: number,
    b: number
): [number, number, number] {
    let h = 0,
        s = 0,
        l = 0;

    // Check for grayscale
    if (r === g && g === b) {
        // For grayscale, only lightness matters
        l = r / 2.55; // Convert to 0-100 range
    } else {
        const color = new Color("srgb", [r / 255, g / 255, b / 255]);
        const hsl = color.to("hsl");

        h = isNaN(hsl.coords[0]) ? 0 : hsl.coords[0];
        s = hsl.coords[1];
        l = hsl.coords[2];
    }

    // Apply consistent rounding to all values
    return [
        Math.round(h * 1000000) / 1000000,
        Math.round(s * 1000000) / 1000000,
        Math.round(l * 1000000) / 1000000,
    ];
}

/**
 * Other color format converters
 */

/**
 * Converts HSL color values to HSV color values.
 *
 * @param h - The hue value (0-360)
 * @param s - The saturation value (0-100)
 * @param l - The lightness value (0-100)
 * @returns An array of HSV values [h(0-360), s(0-100), v(0-100)]
 */
export function hslToHsv(
    h: number,
    s: number,
    l: number
): [number, number, number] {
    // For grayscale (s=0), hue is irrelevant
    if (s === 0) {
        return [0, 0, l];
    }

    const color = new Color("hsl", [h, s, l]);
    const hsv = color.to("hsv");

    return [
        Math.round(hsv.coords[0] * 1000000) / 1000000 || 0, // Handle NaN
        Math.round(hsv.coords[1] * 1000000) / 1000000,
        Math.round(hsv.coords[2] * 1000000) / 1000000,
    ];
}

/**
 * Converts HEX color string to HSV color values.
 *
 * @param hex - The hex color string (e.g., "#ff0000")
 * @returns An array of HSV values [h(0-360), s(0-100), v(0-100)]
 */
export function hexToHsv(hex: string): [number, number, number] {
    let h = 0,
        s = 0,
        v = 0;

    const color = new Color(hex);

    // Check for grayscale by converting to RGB first
    const rgb = color.to("srgb");
    const r = Math.round(rgb.coords[0] * 255);
    const g = Math.round(rgb.coords[1] * 255);
    const b = Math.round(rgb.coords[2] * 255);

    if (r === g && g === b) {
        // For grayscale, only calculate value (v)
        v = r / 2.55; // Convert to 0-100 range
    } else {
        const hsv = color.to("hsv");

        h = isNaN(hsv.coords[0]) ? 0 : hsv.coords[0];
        s = hsv.coords[1];
        v = hsv.coords[2];
    }

    // Apply consistent rounding to all values
    return [
        Math.round(h * 1000000) / 1000000,
        Math.round(s * 1000000) / 1000000,
        Math.round(v * 1000000) / 1000000,
    ];
}

/**
 * Converts HSV color values to HSL color values.
 *
 * @param h - The hue value (0-360)
 * @param s - The saturation value (0-100)
 * @param v - The value/brightness (0-100)
 * @returns An array of HSL values [h(0-360), s(0-100), l(0-100)]
 */
export function hsvToHsl(
    h: number,
    s: number,
    v: number
): [number, number, number] {
    let hOut = h,
        sOut = 0,
        lOut = 0;

    // For grayscale (s=0)
    if (s === 0) {
        // For grayscale, lightness equals value
        lOut = v;
    } else {
        const color = new Color("hsv", [h, s, v]);
        const hsl = color.to("hsl");

        hOut = isNaN(hsl.coords[0]) ? h : hsl.coords[0];
        sOut = hsl.coords[1];
        lOut = hsl.coords[2];
    }

    return [
        Math.round(hOut * 1000000) / 1000000,
        Math.round(sOut * 1000000) / 1000000,
        Math.round(lOut * 1000000) / 1000000,
    ];
}
