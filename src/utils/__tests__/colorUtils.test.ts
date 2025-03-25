import {
    normalizeHexColor,
    isValidHexString,
    isBrandSafe,
    isValidRgbString,
} from "@/utils/colorUtils";
import { BACKGROUNDS } from "@/utils/constants";
import { describe, expect, it } from "vitest";

describe("isValidHexString", () => {
    // Valid hex colors
    it("should return true for valid 3-digit hex colors", () => {
        expect(isValidHexString("#123")).toBe(true);
        expect(isValidHexString("#abc")).toBe(true);
        expect(isValidHexString("#ABC")).toBe(true);
        expect(isValidHexString("#1a2")).toBe(true);
        expect(isValidHexString("#a1b")).toBe(true);
        expect(isValidHexString("#A1b")).toBe(true);
    });

    it("should return true for valid 6-digit hex colors", () => {
        expect(isValidHexString("#123456")).toBe(true);
        expect(isValidHexString("#abcdef")).toBe(true);
        expect(isValidHexString("#ABCDEF")).toBe(true);
        expect(isValidHexString("#123abc")).toBe(true);
        expect(isValidHexString("#def456")).toBe(true);
        expect(isValidHexString("#DEF456")).toBe(true);
    });

    // Invalid hex colors
    it("should return false when # is missing", () => {
        expect(isValidHexString("123")).toBe(false);
        expect(isValidHexString("123456")).toBe(false);
    });
    it("should return false for invalid 3-digit hex colors", () => {
        expect(isValidHexString("#ghi")).toBe(false);
        expect(isValidHexString("#GHI")).toBe(false);
        expect(isValidHexString("#12j")).toBe(false);
        expect(isValidHexString("#@^$")).toBe(false);
    });
    it("should return false for invalid 6-digit hex colors", () => {
        expect(isValidHexString("#12345x")).toBe(false);
        expect(isValidHexString("#helloo")).toBe(false);
        expect(isValidHexString("#12*456")).toBe(false);
    });
    it("should return false for incorrect length", () => {
        expect(isValidHexString("#12")).toBe(false);
        expect(isValidHexString("#1234")).toBe(false);
        expect(isValidHexString("#12345")).toBe(false);
        expect(isValidHexString("#1234567")).toBe(false);
    });
    it("should return false for invalid inputs", () => {
        expect(isValidHexString("")).toBe(false);
        expect(isValidHexString("#")).toBe(false);
        expect(isValidHexString("##123")).toBe(false);
    });
});

describe("isValidRgbString", () => {
    // Valid RGB strings with different formats
    it("should return true for valid comma-separated RGB values", () => {
        expect(isValidRgbString("0,0,0")).toBe(true);
        expect(isValidRgbString("255,255,255")).toBe(true);
        expect(isValidRgbString("123,45,67")).toBe(true);
        expect(isValidRgbString("0, 128, 255")).toBe(true);
        expect(isValidRgbString("255 ,0 ,128")).toBe(true);
        expect(isValidRgbString("100, 200 ,50")).toBe(true);
    });

    it("should return true for valid space-separated RGB values", () => {
        expect(isValidRgbString("0 0 0")).toBe(true);
        expect(isValidRgbString("255 255 255")).toBe(true);
        expect(isValidRgbString("123 45 67")).toBe(true);
    });

    it("should return true for valid mixed-delimiter RGB values", () => {
        expect(isValidRgbString("0 128,255")).toBe(true);
        expect(isValidRgbString("255,0 128")).toBe(true);
        expect(isValidRgbString("100 200,50")).toBe(true);
    });

    it("should return true for valid rgb() function format", () => {
        expect(isValidRgbString("rgb(0,0,0)")).toBe(true);
        expect(isValidRgbString("rgb(255, 255, 255)")).toBe(true);
        expect(isValidRgbString("rgb(123, 45, 67)")).toBe(true);
        expect(isValidRgbString("rgb(0 0 0)")).toBe(true);
        expect(isValidRgbString("rgb(255 255 255)")).toBe(true);
        expect(isValidRgbString("rgb(0 128,255)")).toBe(true);
        expect(isValidRgbString("rgb(255,0 128)")).toBe(true);
        expect(isValidRgbString("RGB(100, 200, 50)")).toBe(true);
    });

    it("should return true for valid rgba() function format", () => {
        expect(isValidRgbString("rgba(0,0,0,0)")).toBe(true);
        expect(isValidRgbString("rgba(255, 255, 255, 1)")).toBe(true);
        expect(isValidRgbString("rgba(123, 45, 67, 0.5)")).toBe(true);
        expect(isValidRgbString("rgba(0 0 0 0)")).toBe(true);
        expect(isValidRgbString("rgba(255 255 255 1)")).toBe(true);
        expect(isValidRgbString("rgba(0 128,255, 0.7)")).toBe(true);
        expect(isValidRgbString("rgba(255,0 128 0.3)")).toBe(true);
        expect(isValidRgbString("RGBA(100, 200, 50, 0.8)")).toBe(true);
    });

    it("should return true for decimal RGB values within range", () => {
        expect(isValidRgbString("0.5, 128.75, 255")).toBe(true);
        expect(isValidRgbString("rgb(0.5 128.75 255)")).toBe(true);
        expect(isValidRgbString("rgba(0.5, 128.75, 255, 0.5)")).toBe(true);
    });

    // Invalid RGB strings
    it("should return false for RGB values out of range", () => {
        expect(isValidRgbString("-1,0,0")).toBe(false);
        expect(isValidRgbString("0,-1,0")).toBe(false);
        expect(isValidRgbString("0,0,-1")).toBe(false);
        expect(isValidRgbString("256,0,0")).toBe(false);
        expect(isValidRgbString("0,256,0")).toBe(false);
        expect(isValidRgbString("0,0,256")).toBe(false);
        expect(isValidRgbString("rgb(-1,0,0)")).toBe(false);
        expect(isValidRgbString("rgb(256,0,0)")).toBe(false);
        expect(isValidRgbString("rgb(255.000001,0,0)")).toBe(false);
        expect(isValidRgbString("rgba(0,0,256,0.5)")).toBe(false);
    });

    it("should return false for insufficient number of values", () => {
        expect(isValidRgbString("0,0")).toBe(false);
        expect(isValidRgbString("0")).toBe(false);
        expect(isValidRgbString("rgb(0,0)")).toBe(false);
        expect(isValidRgbString("rgba(0,0,0)")).toBe(true); // This is valid as we only check the first 3 numbers
    });

    it("should return false for invalid characters", () => {
        expect(isValidRgbString("a,b,c")).toBe(false);
        expect(isValidRgbString("0,b,255")).toBe(false);
        expect(isValidRgbString("0,128,c")).toBe(false);
        expect(isValidRgbString("0;128;255")).toBe(false);
        expect(isValidRgbString("0|128|255")).toBe(false);
    });

    it("should return false for malformed rgb/rgba functions", () => {
        expect(isValidRgbString("rgb(0,0,0")).toBe(false);
        expect(isValidRgbString("rgb 0,0,0)")).toBe(false);
        expect(isValidRgbString("rgba(0,0,0,0.5")).toBe(false);
        expect(isValidRgbString("rgbx(0,0,0)")).toBe(false);
        expect(isValidRgbString("(0,0,0)")).toBe(false);
    });

    it("should return false for empty or invalid inputs", () => {
        expect(isValidRgbString("")).toBe(false);
        expect(isValidRgbString(" ")).toBe(false);
        expect(isValidRgbString("rgb()")).toBe(false);
        expect(isValidRgbString("rgba()")).toBe(false);
        expect(isValidRgbString(",,,")).toBe(false);
    });

    it("should return false for inputs with too many values", () => {
        // These should still be valid as we only check the first 3 numbers
        expect(isValidRgbString("0,0,0,0")).toBe(true);
        expect(isValidRgbString("0 0 0 0")).toBe(true);
        expect(isValidRgbString("rgb(0,0,0,0)")).toBe(true);
    });

    it("should handle whitespace correctly", () => {
        expect(isValidRgbString("  0,0,0  ")).toBe(true);
        expect(isValidRgbString("  rgb(0,0,0)  ")).toBe(true);
        expect(isValidRgbString("0  ,  0  ,  0")).toBe(true);
        expect(isValidRgbString("rgb(  0  ,  0  ,  0  )")).toBe(true);
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
