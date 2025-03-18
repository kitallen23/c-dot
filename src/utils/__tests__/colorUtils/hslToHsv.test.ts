import { hslToHsv } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("hslToHsv", () => {
    // Primary colors
    it("should convert red (HSL) to red (HSV)", () => {
        expect(hslToHsv(0, 100, 50)).toEqual([0, 100, 100]);
    });

    it("should convert green (HSL) to green (HSV)", () => {
        expect(hslToHsv(120, 100, 50)).toEqual([120, 100, 100]);
    });

    it("should convert blue (HSL) to blue (HSV)", () => {
        expect(hslToHsv(240, 100, 50)).toEqual([240, 100, 100]);
    });

    // Edge cases
    it("should convert black (HSL) to black (HSV)", () => {
        expect(hslToHsv(0, 0, 0)).toEqual([0, 0, 0]);
    });

    it("should convert white (HSL) to white (HSV)", () => {
        expect(hslToHsv(0, 0, 100)).toEqual([0, 0, 100]);
    });

    it("should convert gray (HSL) to gray (HSV)", () => {
        expect(hslToHsv(0, 0, 50)).toEqual([0, 0, 50]);
    });

    // Mid-range values
    it("should handle mid-range values correctly", () => {
        expect(hslToHsv(60, 50, 60)).toEqual([60, 50, 80]);
    });

    it("should handle low saturation correctly", () => {
        expect(hslToHsv(180, 20, 75)).toEqual([180, 12.5, 80]);
    });

    it("should handle low lightness correctly", () => {
        expect(hslToHsv(300, 80, 30)).toEqual([300, 88.888889, 54]);
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(hslToHsv(60, 100, 50)).toEqual([60, 100, 100]);
    });

    it("should handle cyan correctly", () => {
        expect(hslToHsv(180, 100, 50)).toEqual([180, 100, 100]);
    });

    it("should handle magenta correctly", () => {
        expect(hslToHsv(300, 100, 50)).toEqual([300, 100, 100]);
    });

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(hslToHsv(30, 70, 80)).toEqual([30, 29.787234, 94]);
    });

    it("should handle dark colors correctly", () => {
        expect(hslToHsv(270, 50, 25)).toEqual([270, 66.666667, 37.5]);
    });

    // Specific conversions
    it("should match specific HSL to HSV conversions", () => {
        expect(hslToHsv(210, 70, 60)).toEqual([210, 63.636364, 88]);
        expect(hslToHsv(45, 80, 70)).toEqual([45, 51.06383, 94]);
    });

    it("should round HSV values to 6 decimal places of precision", () => {
        const [h, s, v] = hslToHsv(195.5, 33.333333, 82.9);

        // Test that each value has at most 6 decimal places
        expect(h.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(s.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(v.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
    });

    it("should handle floating point precision issues", () => {
        // First get the result
        const result = hslToHsv(200, 33.33, 66.67);

        // Then verify each value doesn't have more than 6 decimal places
        result.forEach(value => {
            const decimalPart = value.toString().split(".")[1] || "";
            expect(decimalPart.length).toBeLessThanOrEqual(6);
        });
    });

    it("should produce consistent results with the same input", () => {
        // Test that calling the function twice with the same input produces identical results
        const result1 = hslToHsv(123.456, 45.678, 78.901);
        const result2 = hslToHsv(123.456, 45.678, 78.901);
        expect(result1).toEqual(result2);
    });

    // Special case for grayscale
    it("should handle grayscale colors (s=0) correctly", () => {
        expect(hslToHsv(180, 0, 40)).toEqual([0, 0, 40]);
        expect(hslToHsv(270, 0, 60)).toEqual([0, 0, 60]);
    });
});
