import { hsvToHsl } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

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

    // Mid-range values
    it("should handle mid-range values correctly", () => {
        expect(hsvToHsl(60, 50, 80)).toEqual([60, 50, 60]);
    });

    it("should handle low saturation correctly", () => {
        expect(hsvToHsl(180, 15, 80)).toEqual([180, 23.076923, 74]);
    });

    it("should handle low value correctly", () => {
        expect(hsvToHsl(300, 80, 50)).toEqual([300, 66.666667, 30]);
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

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(hsvToHsl(30, 30, 95)).toEqual([30, 74.025974, 80.75]);
    });

    it("should handle dark colors correctly", () => {
        expect(hsvToHsl(270, 70, 40)).toEqual([270, 53.846154, 26]);
    });

    // Specific conversions
    it("should match specific HSV to HSL conversions", () => {
        expect(hsvToHsl(210, 65, 90)).toEqual([210, 74.522293, 60.75]);
        expect(hsvToHsl(45, 50, 95)).toEqual([45, 82.608696, 71.25]);
    });

    it("should round HSL values to 6 decimal places of precision", () => {
        const [h, s, l] = hsvToHsl(195, 33, 83);

        // Test that each value has at most 6 decimal places
        expect(h.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(s.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(l.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
    });

    it("should handle floating point precision issues", () => {
        // First get the result
        const result = hsvToHsl(200, 33, 67);

        // Then verify each value doesn't have more than 6 decimal places
        result.forEach(value => {
            const decimalPart = value.toString().split(".")[1] || "";
            expect(decimalPart.length).toBeLessThanOrEqual(6);
        });
    });

    it("should produce consistent results with the same input", () => {
        // Test that calling the function twice with the same input produces identical results
        const result1 = hsvToHsl(123, 45, 79);
        const result2 = hsvToHsl(123, 45, 79);
        expect(result1).toEqual(result2);
    });

    // Special case for grayscale
    it("should handle grayscale colors (s=0) correctly", () => {
        expect(hsvToHsl(180, 0, 40)).toEqual([180, 0, 40]);
        expect(hsvToHsl(270, 0, 60)).toEqual([270, 0, 60]);
    });
});
