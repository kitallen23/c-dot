import { rgbToHex } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("rgbToHex", () => {
    // Primary colors
    it("should convert red (RGB) to red (HEX)", () => {
        expect(rgbToHex(255, 0, 0)).toEqual("#ff0000");
    });

    it("should convert green (RGB) to green (HEX)", () => {
        expect(rgbToHex(0, 255, 0)).toEqual("#00ff00");
    });

    it("should convert blue (RGB) to blue (HEX)", () => {
        expect(rgbToHex(0, 0, 255)).toEqual("#0000ff");
    });

    // Edge cases
    it("should convert black (RGB) to black (HEX)", () => {
        expect(rgbToHex(0, 0, 0)).toEqual("#000000");
    });

    it("should convert white (RGB) to white (HEX)", () => {
        expect(rgbToHex(255, 255, 255)).toEqual("#ffffff");
    });

    it("should convert gray (RGB) to gray (HEX)", () => {
        expect(rgbToHex(128, 128, 128)).toEqual("#808080");
    });

    // Mid-range values
    it("should handle mid-range values correctly", () => {
        expect(rgbToHex(204, 204, 102)).toEqual("#cccc66");
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(rgbToHex(255, 255, 0)).toEqual("#ffff00");
    });

    it("should handle cyan correctly", () => {
        expect(rgbToHex(0, 255, 255)).toEqual("#00ffff");
    });

    it("should handle magenta correctly", () => {
        expect(rgbToHex(255, 0, 255)).toEqual("#ff00ff");
    });

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(rgbToHex(230, 195, 161)).toEqual("#e6c3a1");
    });

    it("should handle dark colors correctly", () => {
        expect(rgbToHex(56, 10, 102)).toEqual("#380a66");
    });

    // Specific conversions
    it("should match specific RGB to HEX conversions", () => {
        expect(rgbToHex(69, 149, 230)).toEqual("#4595e6");
        expect(rgbToHex(242, 194, 48)).toEqual("#f2c230");
    });

    // Consistency tests
    it("should produce consistent results with the same input", () => {
        const result1 = rgbToHex(123, 45, 79);
        const result2 = rgbToHex(123, 45, 79);
        expect(result1).toEqual(result2);
    });

    // Format tests
    it("should always return a 7-character string starting with #", () => {
        const result = rgbToHex(100, 150, 200);
        expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });

    it("should handle non-integer RGB values by converting them properly", () => {
        expect(rgbToHex(127.5, 127.5, 127.5)).toEqual("#808080");
    });
});
