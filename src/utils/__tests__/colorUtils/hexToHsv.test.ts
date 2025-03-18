import { hexToHsv } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("hexToHsv", () => {
    // Primary colors
    it("should convert red (HEX) to red (HSV)", () => {
        expect(hexToHsv("#ff0000")).toEqual([0, 100, 100]);
    });

    it("should convert green (HEX) to green (HSV)", () => {
        expect(hexToHsv("#00ff00")).toEqual([120, 100, 100]);
    });

    it("should convert blue (HEX) to blue (HSV)", () => {
        expect(hexToHsv("#0000ff")).toEqual([240, 100, 100]);
    });

    // Edge cases
    it("should convert black (HEX) to black (HSV)", () => {
        expect(hexToHsv("#000000")).toEqual([0, 0, 0]);
    });

    it("should convert white (HEX) to white (HSV)", () => {
        expect(hexToHsv("#ffffff")).toEqual([0, 0, 100]);
    });

    it("should convert middle gray (HEX) to gray (HSV)", () => {
        expect(hexToHsv("#808080")).toEqual([0, 0, 50.196078]);
    });

    // Mid-range values
    it("should handle mid-range values correctly", () => {
        expect(hexToHsv("#cccc66")).toEqual([60, 50, 80]);
    });

    it("should handle low saturation correctly", () => {
        expect(hexToHsv("#99bfbf")).toEqual([180, 19.895288, 74.901961]);
    });

    it("should handle low value correctly", () => {
        expect(hexToHsv("#4d0f4d")).toEqual([300, 80.519481, 30.196078]);
    });

    // Secondary colors
    it("should handle yellow correctly", () => {
        expect(hexToHsv("#ffff00")).toEqual([60, 100, 100]);
    });

    it("should handle cyan correctly", () => {
        expect(hexToHsv("#00ffff")).toEqual([180, 100, 100]);
    });

    it("should handle magenta correctly", () => {
        expect(hexToHsv("#ff00ff")).toEqual([300, 100, 100]);
    });

    // Other colors
    it("should handle pastel colors correctly", () => {
        expect(hexToHsv("#e6c3a1")).toEqual([29.565217, 30, 90.196078]);
    });

    it("should handle dark colors correctly", () => {
        expect(hexToHsv("#380a66")).toEqual([270, 90.196078, 40]);
    });

    // Specific conversions
    it("should match specific HEX to HSV conversions", () => {
        expect(hexToHsv("#4595e6")).toEqual([210.186335, 70, 90.196078]);
        expect(hexToHsv("#f2c230")).toEqual([45.154639, 80.165289, 94.901961]);
    });

    it("should round HSV values to 6 decimal places of precision", () => {
        const [h, s, v] = hexToHsv("#55a3b1");

        // Test that each value has at most 6 decimal places
        expect(h.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(s.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
        expect(v.toString()).toMatch(/^\d+(\.\d{1,6})?$/);
    });

    it("should handle floating point precision issues", () => {
        // First get the result
        const result = hexToHsv("#5599aa");

        // Then verify each value doesn't have more than 6 decimal places
        result.forEach(value => {
            const decimalPart = value.toString().split(".")[1] || "";
            expect(decimalPart.length).toBeLessThanOrEqual(6);
        });
    });

    it("should produce consistent results with the same input", () => {
        // Test that calling the function twice with the same input produces identical results
        const result1 = hexToHsv("#7a3bc5");
        const result2 = hexToHsv("#7a3bc5");
        expect(result1).toEqual(result2);
    });

    // Additional tests for different hex formats
    it("should handle 3-digit hex codes", () => {
        expect(hexToHsv("#f00")).toEqual([0, 100, 100]);
        expect(hexToHsv("#0f0")).toEqual([120, 100, 100]);
    });

    it("should handle hex codes with alpha (ignoring alpha)", () => {
        expect(hexToHsv("#ff0000ff")).toEqual([0, 100, 100]);
        expect(hexToHsv("#00ff0080")).toEqual([120, 100, 100]);
    });
});
