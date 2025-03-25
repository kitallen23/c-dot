import {
    normalizeHexColor,
    isValidHexString,
    isBrandSafe,
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
