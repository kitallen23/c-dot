import { rgbToHsv } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("rgbToHsv", () => {
    // Primary colors
    it("should convert red (RGB) to red (HSV)", () => {
        expect(rgbToHsv(255, 0, 0)).toEqual([0, 100, 100]);
    });

    it("should convert green (RGB) to green (HSV)", () => {
        expect(rgbToHsv(0, 255, 0)).toEqual([120, 100, 100]);
    });

    it("should convert blue (RGB) to blue (HSV)", () => {
        expect(rgbToHsv(0, 0, 255)).toEqual([240, 100, 100]);
    });

    // Edge cases
    it("should convert black (RGB) to black (HSV)", () => {
        expect(rgbToHsv(0, 0, 0)).toEqual([0, 0, 0]);
    });

    it("should convert white (RGB) to white (HSV)", () => {
        expect(rgbToHsv(255, 255, 255)).toEqual([0, 0, 100]);
    });

    it("should convert middle gray (RGB) to gray (HSV)", () => {
        expect(rgbToHsv(127.5, 127.5, 127.5)).toEqual([0, 0, 50]);
    });

    // Mid-range values
    it("should handle mid-range values correctly", () => {
        expect(rgbToHsv(204, 204, 102)).toEqual([60, 50, 80]);
    });

    it("should handle low saturation correctly", () => {
        expect(rgbToHsv(153, 191, 191)).toEqual([180, 19.895288, 74.901961]);
    });

    it("should handle low value correctly", () => {
        expect(rgbToHsv(77, 15, 77)).toEqual([300, 80.519481, 30.196078]);
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(rgbToHsv(255, 255, 0)).toEqual([60, 100, 100]);
    });

    it("should handle cyan correctly", () => {
        expect(rgbToHsv(0, 255, 255)).toEqual([180, 100, 100]);
    });

    it("should handle magenta correctly", () => {
        expect(rgbToHsv(255, 0, 255)).toEqual([300, 100, 100]);
    });

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(rgbToHsv(230, 195, 161)).toEqual([29.565217, 30, 90.196078]);
    });

    it("should handle dark colors correctly", () => {
        expect(rgbToHsv(56, 10, 102)).toEqual([270, 90.196078, 40]);
    });

    // Specific conversions
    it("should match specific RGB to HSV conversions", () => {
        expect(rgbToHsv(69, 149, 230)).toEqual([210.186335, 70, 90.196078]);
        expect(rgbToHsv(242, 194, 48)).toEqual([
            45.154639, 80.165289, 94.901961,
        ]);
    });

    it("should round HSV values to 6 decimal places of precision", () => {
        const [h, s, v] = rgbToHsv(123, 210, 178);

        // Test that each value has at most 6 decimal places
        expect(h.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(s.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(v.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
    });

    it("should handle floating point precision issues", () => {
        // First get the result
        const result = rgbToHsv(112, 158, 170);

        // Then verify each value doesn't have more than 6 decimal places
        result.forEach(value => {
            const decimalPart = value.toString().split(".")[1] || "";
            expect(decimalPart.length).toBeLessThanOrEqual(6);
        });
    });

    it("should produce consistent results with the same input", () => {
        // Test that calling the function twice with the same input produces identical results
        const result1 = rgbToHsv(123, 45, 78);
        const result2 = rgbToHsv(123, 45, 78);
        expect(result1).toEqual(result2);
    });

    // Grayscale handling
    it("should handle grayscale values correctly", () => {
        expect(rgbToHsv(100, 100, 100)).toEqual([0, 0, 39.215686]);
        expect(rgbToHsv(200, 200, 200)).toEqual([0, 0, 78.431373]);
    });
});
