import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HexField from "@/components/ColorPicker/HexField";

describe("HexField", () => {
    const mockOnChange = vi.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test("displays initial value correctly", () => {
        const initialValue = "#ff5500";
        render(<HexField value={initialValue} onChange={() => {}} />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveValue(initialValue);
    });

    test("doesn't call onChange on initial render", () => {
        const initialValue = "";
        render(<HexField value={initialValue} onChange={mockOnChange} />);

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("calls onChange with new values on input of valid values", async () => {
        const user = userEvent.setup();

        const initialValue = "";
        render(<HexField value={initialValue} onChange={mockOnChange} />);

        const input = screen.getByRole("textbox");
        const updatedValue = "ff0011";
        await user.type(input, updatedValue);

        expect(input).toHaveValue(`#${updatedValue}`);

        // When typing, 3 hex code will also register as a valid value, thus
        // onChange will be called twice
        expect(mockOnChange).toHaveBeenCalledTimes(2);
        expect(mockOnChange).toHaveBeenCalledWith(
            `#${updatedValue.substring(0, 3)}`,
            expect.anything()
        );
        expect(mockOnChange).toHaveBeenCalledWith(
            `#${updatedValue}`,
            expect.anything()
        );
    });

    test("does not update to contain invalid characters", async () => {
        const initialValue = "";
        render(<HexField value={initialValue} onChange={mockOnChange} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, {
            target: {
                value: "ghijklmnopqrstuvwxyzGHIJKLMNOPQRSTUVWXYZ!@$%^&*()_+-={}[]|\\:;\"'<>,.?/`~",
            },
        });
        expect(input).toHaveValue("#");
    });

    test("automatically prepends # to input values", async () => {
        render(<HexField value="#ff0000" onChange={mockOnChange} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "abc123" } });

        // Check that the displayed value has # prepended
        expect(input).toHaveValue("#abc123");

        // Check that the onChange handler was called with the # prepended
        expect(mockOnChange).toHaveBeenCalledWith("#abc123", expect.anything());

        // Clear the input
        await userEvent.clear(input);
        expect(input).toHaveValue("#");

        mockOnChange.mockClear();

        // Type a few "#" characters
        await userEvent.type(input, "###");
        // Expect no change to the value of the input
        expect(input).toHaveValue("#");
        expect(mockOnChange).not.toHaveBeenCalled();
    });
});
