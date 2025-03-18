import { hsvToRgb } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("hsvToRgb", () => {
    // Primary colors
    it("should convert red (HSV) to red (RGB)", () => {
        expect(hsvToRgb(0, 100, 100)).toEqual([255, 0, 0]);
    });

    it("should convert green (HSV) to green (RGB)", () => {
        expect(hsvToRgb(120, 100, 100)).toEqual([0, 255, 0]);
    });

    it("should convert blue (HSV) to blue (RGB)", () => {
        expect(hsvToRgb(240, 100, 100)).toEqual([0, 0, 255]);
    });

    // Edge cases
    it("should convert black (HSV) to black (RGB)", () => {
        expect(hsvToRgb(0, 0, 0)).toEqual([0, 0, 0]);
    });

    it("should convert white (HSV) to white (RGB)", () => {
        expect(hsvToRgb(0, 0, 100)).toEqual([255, 255, 255]);
    });

    it("should convert middle gray (HSV) to gray (RGB)", () => {
        expect(hsvToRgb(0, 0, 50)).toEqual([127.5, 127.5, 127.5]);
    });

    // Mid-range values
    it("should handle mid-range values correctly", () => {
        expect(hsvToRgb(60, 50, 80)).toEqual([204, 204, 102]);
    });

    it("should handle low saturation correctly", () => {
        expect(hsvToRgb(180, 20, 75)).toEqual([153, 191.25, 191.25]);
    });

    it("should handle low value correctly", () => {
        expect(hsvToRgb(300, 80, 30)).toEqual([76.5, 15.3, 76.5]);
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(hsvToRgb(60, 100, 100)).toEqual([255, 255, 0]);
    });

    it("should handle cyan correctly", () => {
        expect(hsvToRgb(180, 100, 100)).toEqual([0, 255, 255]);
    });

    it("should handle magenta correctly", () => {
        expect(hsvToRgb(300, 100, 100)).toEqual([255, 0, 255]);
    });

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(hsvToRgb(30, 30, 90)).toEqual([229.5, 195.075, 160.65]);
    });

    it("should handle dark colors correctly", () => {
        expect(hsvToRgb(270, 90, 40)).toEqual([56.1, 10.2, 102]);
    });

    // Specific conversions
    it("should match specific HSV to RGB conversions", () => {
        expect(hsvToRgb(210, 70, 90)).toEqual([68.85, 149.175, 229.5]);
        expect(hsvToRgb(45, 80, 95)).toEqual([242.25, 193.8, 48.45]);
    });

    it("should round RGB values to 6 decimal places of precision", () => {
        const [r, g, b] = hsvToRgb(195.5, 100 / 3, 82.9);

        // Test that each value has at most 6 decimal places
        expect(r.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(g.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(b.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
    });

    it("should handle floating point precision issues", () => {
        // First get the result
        const result = hsvToRgb(200, 33.33, 66.67);

        // Then verify each value doesn't have more than 6 decimal places
        result.forEach(value => {
            const decimalPart = value.toString().split(".")[1] || "";
            expect(decimalPart.length).toBeLessThanOrEqual(6);
        });
    });

    it("should produce consistent results with the same input", () => {
        // Test that calling the function twice with the same input produces identical results
        const result1 = hsvToRgb(123.456, 45.678, 78.901);
        const result2 = hsvToRgb(123.456, 45.678, 78.901);
        expect(result1).toEqual(result2);
    });
});
