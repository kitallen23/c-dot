import { rgbToHsl } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("rgbToHsl", () => {
    // Primary colors
    it("should convert red (RGB) to red (HSL)", () => {
        expect(rgbToHsl(255, 0, 0)).toEqual([0, 100, 50]);
    });

    it("should convert green (RGB) to green (HSL)", () => {
        expect(rgbToHsl(0, 255, 0)).toEqual([120, 100, 50]);
    });

    it("should convert blue (RGB) to blue (HSL)", () => {
        expect(rgbToHsl(0, 0, 255)).toEqual([240, 100, 50]);
    });

    // Edge cases
    it("should convert black (RGB) to black (HSL)", () => {
        expect(rgbToHsl(0, 0, 0)).toEqual([0, 0, 0]);
    });

    it("should convert white (RGB) to white (HSL)", () => {
        expect(rgbToHsl(255, 255, 255)).toEqual([0, 0, 100]);
    });

    it("should convert gray (RGB) to gray (HSL)", () => {
        expect(rgbToHsl(128, 128, 128)).toEqual([0, 0, 50.196078]);
    });

    // Mid-range values
    it("should handle mid-range values correctly", () => {
        expect(rgbToHsl(204, 204, 102)).toEqual([60, 50, 60]);
    });

    it("should handle low saturation correctly", () => {
        expect(rgbToHsl(153, 191, 191)).toEqual([180, 22.891566, 67.45098]);
    });

    it("should handle low lightness correctly", () => {
        expect(rgbToHsl(77, 15, 77)).toEqual([300, 67.391304, 18.039216]);
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(rgbToHsl(255, 255, 0)).toEqual([60, 100, 50]);
    });

    it("should handle cyan correctly", () => {
        expect(rgbToHsl(0, 255, 255)).toEqual([180, 100, 50]);
    });

    it("should handle magenta correctly", () => {
        expect(rgbToHsl(255, 0, 255)).toEqual([300, 100, 50]);
    });

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(rgbToHsl(230, 195, 161)).toEqual([
            29.565217, 57.983193, 76.666667,
        ]);
    });

    it("should handle dark colors correctly", () => {
        expect(rgbToHsl(56, 10, 102)).toEqual([270, 82.142857, 21.960784]);
    });

    // Specific conversions
    it("should match specific RGB to HSL conversions", () => {
        expect(rgbToHsl(69, 149, 230)).toEqual([
            210.186335, 76.303318, 58.627451,
        ]);
        expect(rgbToHsl(242, 194, 48)).toEqual([
            45.154639, 88.181818, 56.862745,
        ]);
    });

    it("should round HSL values to 6 decimal places of precision", () => {
        const [h, s, l] = rgbToHsl(123, 210, 220);

        // Test that each value has at most 6 decimal places
        expect(h.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(s.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(l.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
    });

    it("should handle floating point precision issues", () => {
        // First get the result
        const result = rgbToHsl(112, 158, 170);

        // Then verify each value doesn't have more than 6 decimal places
        result.forEach(value => {
            const decimalPart = value.toString().split(".")[1] || "";
            expect(decimalPart.length).toBeLessThanOrEqual(6);
        });
    });

    it("should produce consistent results with the same input", () => {
        // Test that calling the function twice with the same input produces identical results
        const result1 = rgbToHsl(123, 45, 67);
        const result2 = rgbToHsl(123, 45, 67);
        expect(result1).toEqual(result2);
    });

    // Grayscale handling
    it("should handle grayscale values correctly", () => {
        expect(rgbToHsl(150, 150, 150)).toEqual([0, 0, 58.823529]);
    });
});
