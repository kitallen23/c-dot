import { isValidHexColor } from "@/utils/colorUtils";
import { describe, expect, it } from "vitest";

describe("isValidHexColor", () => {
    // Valid hex colors
    it("should return true for valid 3-digit hex colors", () => {
        expect(isValidHexColor("#123")).toBe(true);
        expect(isValidHexColor("#abc")).toBe(true);
        expect(isValidHexColor("#1a2")).toBe(true);
        expect(isValidHexColor("#a1b")).toBe(true);
    });

    it("should return true for valid 6-digit hex colors", () => {
        expect(isValidHexColor("#123456")).toBe(true);
        expect(isValidHexColor("#abcdef")).toBe(true);
        expect(isValidHexColor("#123abc")).toBe(true);
        expect(isValidHexColor("#def456")).toBe(true);
    });

    // Invalid hex colors
    it("should return false when # is missing", () => {
        expect(isValidHexColor("123")).toBe(false);
        expect(isValidHexColor("123456")).toBe(false);
    });
    it("should return false for invalid 3-digit hex colors", () => {
        expect(isValidHexColor("#ghi")).toBe(false);
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
