import {
    normalizeHexColor,
    isValidHexColor,
    isBrandSafe,
    hsvToHsl,
} from "@/utils/colorUtils";
import { BACKGROUNDS } from "@/utils/constants";
import { describe, expect, it } from "vitest";

describe("isValidHexColor", () => {
    // Valid hex colors
    it("should return true for valid 3-digit hex colors", () => {
        expect(isValidHexColor("#123")).toBe(true);
        expect(isValidHexColor("#abc")).toBe(true);
        expect(isValidHexColor("#ABC")).toBe(true);
        expect(isValidHexColor("#1a2")).toBe(true);
        expect(isValidHexColor("#a1b")).toBe(true);
        expect(isValidHexColor("#A1b")).toBe(true);
    });

    it("should return true for valid 6-digit hex colors", () => {
        expect(isValidHexColor("#123456")).toBe(true);
        expect(isValidHexColor("#abcdef")).toBe(true);
        expect(isValidHexColor("#ABCDEF")).toBe(true);
        expect(isValidHexColor("#123abc")).toBe(true);
        expect(isValidHexColor("#def456")).toBe(true);
        expect(isValidHexColor("#DEF456")).toBe(true);
    });

    // Invalid hex colors
    it("should return false when # is missing", () => {
        expect(isValidHexColor("123")).toBe(false);
        expect(isValidHexColor("123456")).toBe(false);
    });
    it("should return false for invalid 3-digit hex colors", () => {
        expect(isValidHexColor("#ghi")).toBe(false);
        expect(isValidHexColor("#GHI")).toBe(false);
        expect(isValidHexColor("#12j")).toBe(false);
        expect(isValidHexColor("#@^$")).toBe(false);
    });
    it("should return false for invalid 6-digit hex colors", () => {
        expect(isValidHexColor("#12345x")).toBe(false);
        expect(isValidHexColor("#helloo")).toBe(false);
        expect(isValidHexColor("#12*456")).toBe(false);
    });
    it("should return false for incorrect length", () => {
        expect(isValidHexColor("#12")).toBe(false);
        expect(isValidHexColor("#1234")).toBe(false);
        expect(isValidHexColor("#12345")).toBe(false);
        expect(isValidHexColor("#1234567")).toBe(false);
    });
    it("should return false for invalid inputs", () => {
        expect(isValidHexColor("")).toBe(false);
        expect(isValidHexColor("#")).toBe(false);
        expect(isValidHexColor("##123")).toBe(false);
    });
});

describe("normalizeHexColor", () => {
    // Valid 3-digit hex colors
    it("should return a valid 6-digit hex color for valid 3-digit hex colors", () => {
        expect(normalizeHexColor("#123")).toBe("#112233");
        expect(normalizeHexColor("#abc")).toBe("#aabbcc");
        expect(normalizeHexColor("#1f9")).toBe("#11ff99");
    });

    // Valid 6-digit hex colors
    it("should return a valid 6-digit hex color for valid 6-digit hex colors", () => {
        expect(normalizeHexColor("#112233")).toBe("#112233");
        expect(normalizeHexColor("#aabbcc")).toBe("#aabbcc");
        expect(normalizeHexColor("#AABBCC")).toBe("#AABBCC");
        expect(normalizeHexColor("#11ff99")).toBe("#11ff99");
    });

    // Invalid hex colors
    it("should throw an error for invalid inputs", () => {
        expect(() => normalizeHexColor("")).toThrow("Invalid hex color format");
        expect(() => normalizeHexColor("#")).toThrow(
            "Invalid hex color format"
        );
        expect(() => normalizeHexColor("#12")).toThrow(
            "Invalid hex color format"
        );
        expect(() => normalizeHexColor("#1234")).toThrow(
            "Invalid hex color format"
        );
        expect(() => normalizeHexColor("abc")).toThrow(
            "Invalid hex color format"
        );
    });
});

describe("isBrandSafe", () => {
    // High contrast combinations (should pass)
    it("should return true for high contrast combinations", () => {
        expect(isBrandSafe("#000000", "#FFFFFF")).toBe(true); // Black on white
        expect(isBrandSafe("#FFFFFF", "#000000")).toBe(true); // White on black
        expect(isBrandSafe("#FF0000", "#FFFFFF")).toBe(true); // Red on white
        expect(isBrandSafe("#0000FF", "#FFFFFF")).toBe(true); // Blue on white
    });

    // Low contrast combinations (should fail)
    it("should return false for low contrast combinations", () => {
        expect(isBrandSafe("#777777", "#888888")).toBe(false); // Similar grays
        expect(isBrandSafe("#FFFF00", "#FFFFFF")).toBe(false); // Yellow on white
        expect(isBrandSafe("#00FFFF", "#FFFFFF")).toBe(false); // Cyan on white
        expect(isBrandSafe("#336699", "#334455")).toBe(false); // Similar dark colors
    });

    // Edge cases around the threshold (3:1 contrast ratio)
    it("should correctly handle edge cases around the contrast threshold on black / white backgrounds", () => {
        // These examples are approximately at the 3:1 threshold
        expect(isBrandSafe("#8A8A8A", BACKGROUNDS.light)).toBe(true); // Just above threshold on white
        expect(isBrandSafe("#9A9A9A", BACKGROUNDS.light)).toBe(false); // Just below threshold on white

        expect(isBrandSafe("#5F606A", BACKGROUNDS.dark)).toBe(true); // Just above threshold on black
        expect(isBrandSafe("#5C5C5C", BACKGROUNDS.dark)).toBe(false); // Just below threshold on black
    });
});

describe("hsvToHsl", () => {
    // Primary colors
    it("should convert red (HSV) to red (HSL)", () => {
        expect(hsvToHsl(0, 100, 100)).toEqual([0, 100, 50]);
    });

    it("should convert green (HSV) to green (HSL)", () => {
        expect(hsvToHsl(120, 100, 100)).toEqual([120, 100, 50]);
    });

    it("should convert blue (HSV) to blue (HSL)", () => {
        expect(hsvToHsl(240, 100, 100)).toEqual([240, 100, 50]);
    });

    // Edge cases
    it("should convert black (HSV) to black (HSL)", () => {
        expect(hsvToHsl(0, 0, 0)).toEqual([0, 0, 0]);
    });

    it("should convert white (HSV) to white (HSL)", () => {
        expect(hsvToHsl(0, 0, 100)).toEqual([0, 0, 100]);
    });

    it("should convert gray (HSV) to gray (HSL)", () => {
        expect(hsvToHsl(0, 0, 50)).toEqual([0, 0, 50]);
    });

    // Mid-range values with correct calculations
    it("should handle mid-range values correctly", () => {
        expect(hsvToHsl(60, 50, 80)).toEqual([60, 50, 60]);
    });

    it("should handle low saturation correctly", () => {
        expect(hsvToHsl(180, 20, 75)).toEqual([180, 23, 68]);
    });

    it("should handle low value correctly", () => {
        expect(hsvToHsl(300, 80, 30)).toEqual([300, 67, 18]);
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(hsvToHsl(60, 100, 100)).toEqual([60, 100, 50]);
    });

    it("should handle cyan correctly", () => {
        expect(hsvToHsl(180, 100, 100)).toEqual([180, 100, 50]);
    });

    it("should handle magenta correctly", () => {
        expect(hsvToHsl(300, 100, 100)).toEqual([300, 100, 50]);
    });

    // Other colors with correct calculations
    it("should handle pastel colors correctly", () => {
        expect(hsvToHsl(30, 30, 90)).toEqual([30, 57, 76]);
    });

    it("should handle dark colors correctly", () => {
        expect(hsvToHsl(270, 90, 40)).toEqual([270, 82, 22]);
    });

    // Specific conversions with correct calculations
    it("should match specific HSV to HSL conversions", () => {
        expect(hsvToHsl(210, 70, 90)).toEqual([210, 76, 59]);
        expect(hsvToHsl(45, 80, 95)).toEqual([45, 88, 57]);
    });

    // Rounding behavior
    it("should round output values to integers", () => {
        const [h, s, l] = hsvToHsl(210, 65, 85);
        expect(Number.isInteger(h)).toBe(true);
        expect(Number.isInteger(s)).toBe(true);
        expect(Number.isInteger(l)).toBe(true);
    });
});
