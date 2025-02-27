import { normalizeHexColor, isValidHexColor } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("isValidHexColor", () => {
    // Valid hex colors
    it("should return true for valid 3-digit hex colors", () => {
        expect(isValidHexColor("#123")).toBe(true);
        expect(isValidHexColor("#abc")).toBe(true);
        expect(isValidHexColor("#ABC")).toBe(true);
        expect(isValidHexColor("#1a2")).toBe(true);
        expect(isValidHexColor("#a1b")).toBe(true);
        expect(isValidHexColor("#A1b")).toBe(true);
    });

    it("should return true for valid 6-digit hex colors", () => {
        expect(isValidHexColor("#123456")).toBe(true);
        expect(isValidHexColor("#abcdef")).toBe(true);
        expect(isValidHexColor("#ABCDEF")).toBe(true);
        expect(isValidHexColor("#123abc")).toBe(true);
        expect(isValidHexColor("#def456")).toBe(true);
        expect(isValidHexColor("#DEF456")).toBe(true);
    });

    // Invalid hex colors
    it("should return false when # is missing", () => {
        expect(isValidHexColor("123")).toBe(false);
        expect(isValidHexColor("123456")).toBe(false);
    });
    it("should return false for invalid 3-digit hex colors", () => {
        expect(isValidHexColor("#ghi")).toBe(false);
        expect(isValidHexColor("#GHI")).toBe(false);
        expect(isValidHexColor("#12j")).toBe(false);
        expect(isValidHexColor("#@^$")).toBe(false);
    });
    it("should return false for invalid 6-digit hex colors", () => {
        expect(isValidHexColor("#12345x")).toBe(false);
        expect(isValidHexColor("#helloo")).toBe(false);
        expect(isValidHexColor("#12*456")).toBe(false);
    });
    it("should return false for incorrect length", () => {
        expect(isValidHexColor("#12")).toBe(false);
        expect(isValidHexColor("#1234")).toBe(false);
        expect(isValidHexColor("#12345")).toBe(false);
        expect(isValidHexColor("#1234567")).toBe(false);
    });
    it("should return false for invalid inputs", () => {
        expect(isValidHexColor("")).toBe(false);
        expect(isValidHexColor("#")).toBe(false);
        expect(isValidHexColor("##123")).toBe(false);
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
