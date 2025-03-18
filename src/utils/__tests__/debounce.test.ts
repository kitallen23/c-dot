import { describe, it, expect, vi, beforeEach } from "vitest";
import debounce from "@/utils/debounce";

describe("debounce", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    it("should call the function after the specified delay", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should only call the function once when called multiple times within delay", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        debouncedFn();
        debouncedFn();

        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should pass arguments to the debounced function", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn("test", 123);
        vi.advanceTimersByTime(100);

        expect(mockFn).toHaveBeenCalledWith("test", 123);
    });

    it("should reset the timer when called again within delay", () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        vi.advanceTimersByTime(50);

        debouncedFn();
        vi.advanceTimersByTime(50);
        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(50);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
