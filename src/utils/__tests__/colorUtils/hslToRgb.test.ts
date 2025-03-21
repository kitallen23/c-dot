import { hslToRgb } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("hslToRgb", () => {
    // Primary colors
    it("should convert red (HSL) to red (RGB)", () => {
        expect(hslToRgb(0, 100, 50)).toEqual([255, 0, 0]);
    });

    it("should convert green (HSL) to green (RGB)", () => {
        expect(hslToRgb(120, 100, 50)).toEqual([0, 255, 0]);
    });

    it("should convert blue (HSL) to blue (RGB)", () => {
        expect(hslToRgb(240, 100, 50)).toEqual([0, 0, 255]);
    });

    // Edge cases
    it("should convert black (HSL) to black (RGB)", () => {
        expect(hslToRgb(0, 0, 0)).toEqual([0, 0, 0]);
    });

    it("should convert white (HSL) to white (RGB)", () => {
        expect(hslToRgb(0, 0, 100)).toEqual([255, 255, 255]);
    });

    it("should convert gray (HSL) to gray (RGB)", () => {
        expect(hslToRgb(0, 0, 50)).toEqual([127.5, 127.5, 127.5]);
    });

    // Mid-range values
    it("should handle mid-range values correctly", () => {
        expect(hslToRgb(60, 50, 60)).toEqual([204, 204, 102]);
    });

    it("should handle low saturation correctly", () => {
        expect(hslToRgb(180, 20, 70)).toEqual([163.2, 193.8, 193.8]);
    });

    it("should handle low lightness correctly", () => {
        expect(hslToRgb(300, 80, 20)).toEqual([91.8, 10.2, 91.8]);
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(hslToRgb(60, 100, 50)).toEqual([255, 255, 0]);
    });

    it("should handle cyan correctly", () => {
        expect(hslToRgb(180, 100, 50)).toEqual([0, 255, 255]);
    });

    it("should handle magenta correctly", () => {
        expect(hslToRgb(300, 100, 50)).toEqual([255, 0, 255]);
    });

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(hslToRgb(30, 70, 80)).toEqual([239.7, 204, 168.3]);
    });

    it("should handle dark colors correctly", () => {
        expect(hslToRgb(270, 50, 25)).toEqual([63.75, 31.875, 95.625]);
    });

    // Specific conversions
    it("should match specific HSL to RGB conversions", () => {
        expect(hslToRgb(210, 70, 60)).toEqual([81.6, 153, 224.4]);
        expect(hslToRgb(45, 80, 60)).toEqual([234.6, 193.8, 71.4]);
    });

    it("should round RGB values to 6 decimal places of precision", () => {
        const [r, g, b] = hslToRgb(195.5, 100 / 3, 62.9);

        // Test that each value has at most 6 decimal places
        expect(r.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(g.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(b.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
    });

    it("should handle floating point precision issues", () => {
        // First get the result
        const result = hslToRgb(200, 33.33, 66.67);

        // Then verify each value doesn't have more than 6 decimal places
        result.forEach(value => {
            const decimalPart = value.toString().split(".")[1] || "";
            expect(decimalPart.length).toBeLessThanOrEqual(6);
        });
    });

    it("should produce consistent results with the same input", () => {
        // Test that calling the function twice with the same input produces identical results
        const result1 = hslToRgb(123.456, 45.678, 78.901);
        const result2 = hslToRgb(123.456, 45.678, 78.901);
        expect(result1).toEqual(result2);
    });
});
