import { hexToRgb } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("hexToRgb", () => {
    // Primary colors
    it("should convert red (HEX) to red (RGB)", () => {
        expect(hexToRgb("#ff0000")).toEqual([255, 0, 0]);
    });

    it("should convert green (HEX) to green (RGB)", () => {
        expect(hexToRgb("#00ff00")).toEqual([0, 255, 0]);
    });

    it("should convert blue (HEX) to blue (RGB)", () => {
        expect(hexToRgb("#0000ff")).toEqual([0, 0, 255]);
    });

    // Edge cases
    it("should convert black (HEX) to black (RGB)", () => {
        expect(hexToRgb("#000000")).toEqual([0, 0, 0]);
    });

    it("should convert white (HEX) to white (RGB)", () => {
        expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
    });

    it("should convert gray (HEX) to gray (RGB)", () => {
        expect(hexToRgb("#808080")).toEqual([128, 128, 128]);
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(hexToRgb("#ffff00")).toEqual([255, 255, 0]);
    });

    it("should handle cyan correctly", () => {
        expect(hexToRgb("#00ffff")).toEqual([0, 255, 255]);
    });

    it("should handle magenta correctly", () => {
        expect(hexToRgb("#ff00ff")).toEqual([255, 0, 255]);
    });

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(hexToRgb("#ffc0cb")).toEqual([255, 192, 203]);
    });

    it("should handle dark colors correctly", () => {
        expect(hexToRgb("#800080")).toEqual([128, 0, 128]);
    });

    // Shorthand hex
    it("should handle shorthand hex values", () => {
        expect(hexToRgb("#f00")).toEqual([255, 0, 0]);
        expect(hexToRgb("#0f0")).toEqual([0, 255, 0]);
        expect(hexToRgb("#00f")).toEqual([0, 0, 255]);
    });

    // Hex with alpha (should ignore alpha)
    it("should handle hex values with alpha", () => {
        expect(hexToRgb("#ff0000ff")).toEqual([255, 0, 0]);
        expect(hexToRgb("#00ff0080")).toEqual([0, 255, 0]);
    });

    // Specific conversions
    it("should match specific HEX to RGB conversions", () => {
        expect(hexToRgb("#4682b4")).toEqual([70, 130, 180]);
        expect(hexToRgb("#f5deb3")).toEqual([245, 222, 179]);
    });

    it("should produce consistent results with the same input", () => {
        // Test that calling the function twice with the same input produces identical results
        const result1 = hexToRgb("#4c7f9d");
        const result2 = hexToRgb("#4c7f9d");
        expect(result1).toEqual(result2);
    });
});
