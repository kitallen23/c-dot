import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RGBField from "@/components/ColorPicker/RGBField";

describe("RGBField", () => {
    const mockOnChange = vi.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test("displays initial value correctly", () => {
        const initialValue = { r: 0, g: 0, b: 0 };
        render(<RGBField value={initialValue} onChange={() => {}} />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveValue("0, 0, 0");
    });

    test("doesn't call onChange on initial render", () => {
        const initialValue = { r: 0, g: 0, b: 0 };
        render(<RGBField value={initialValue} onChange={mockOnChange} />);

        expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("calls onChange with new values on input of valid values", async () => {
        const user = userEvent.setup();

        render(<RGBField value={null} onChange={mockOnChange} />);

        const input = screen.getByRole("textbox");

        const updatedValue = "100, 150, 200";
        const updatedValueAsRgb = { r: 100, g: 150, b: 200 };

        await user.type(input, updatedValue);

        expect(input).toHaveValue(updatedValue);

        // We expect 3 updates:
        // - Once with 100, 150, 2
        // - Another time with 100, 150, 20
        // - A final time with 100, 150, 200
        // Each keystroke of the final number will result in a valid RGB.
        expect(mockOnChange).toHaveBeenCalledTimes(3);
        expect(mockOnChange).toHaveBeenCalledWith(
            updatedValueAsRgb,
            expect.anything()
        );
    });

    test("does not call onChange with invalid values", async () => {
        const user = userEvent.setup();

        render(
            <RGBField value={{ r: 0, g: 0, b: 0 }} onChange={mockOnChange} />
        );

        const input = screen.getByRole("textbox");

        // Type an invalid RGB value
        await user.clear(input);
        await user.type(input, "invalid");

        expect(input).toHaveValue("invalid");
        expect(mockOnChange).not.toHaveBeenCalled();

        // Type another invalid RGB value
        await user.clear(input);
        await user.type(input, "100, 200, a");

        expect(input).toHaveValue("100, 200, a");
        expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("resets its rendered value to the value prop on blur when the rendered value is invalid", async () => {
        const user = userEvent.setup();
        const initialValue = { r: 100, g: 150, b: 200 };

        render(<RGBField value={initialValue} onChange={mockOnChange} />);

        const input = screen.getByRole("textbox");

        // Type an invalid value
        await user.clear(input);
        await user.type(input, "invalid");

        // Blur the input
        await user.tab();

        // Should reset to the last valid value
        expect(input).toHaveValue("100, 150, 200");
        expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("autoSelect prop selects all text when input is focused", async () => {
        const user = userEvent.setup();
        const initialValue = { r: 0, g: 0, b: 0 };
        render(
            <RGBField
                value={initialValue}
                onChange={() => {}}
                autoSelect={true}
            />
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;

        await user.click(input);

        expect(input.selectionStart).toBe(0);
        // Length of value should be 7 characters: "0, 0, 0"
        expect(input.selectionEnd).toBe(7);
    });

    test("does not select text when focused if autoSelect is false", async () => {
        const user = userEvent.setup();
        const initialValue = { r: 0, g: 0, b: 0 };
        render(
            <RGBField
                value={initialValue}
                onChange={() => {}}
                autoSelect={false}
            />
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;

        await user.click(input);

        // Check that the text is not selected (selection start and end should be the same)
        // Most browsers place the cursor at the end when clicking without selection
        expect(input.selectionStart).toBe(input.selectionEnd);
    });

    test("component updates when external value changes", async () => {
        const initialValue = { r: 0, g: 0, b: 0 };
        const { rerender } = render(
            <RGBField value={initialValue} onChange={mockOnChange} />
        );

        const updatedValue = { r: 100, g: 150, b: 200 };
        rerender(<RGBField value={updatedValue} onChange={mockOnChange} />);

        const input = screen.getByRole("textbox") as HTMLInputElement;

        expect(input).toHaveValue("100, 150, 200");
        expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("handles rgb() format input correctly", async () => {
        const user = userEvent.setup();

        render(
            <RGBField value={{ r: 0, g: 0, b: 0 }} onChange={mockOnChange} />
        );

        const input = screen.getByRole("textbox");

        // Clear and type an rgb() format
        await user.clear(input);
        await user.type(input, "rgb(100, 150, 200)");

        // Check that the input shows the rgb format
        expect(input).toHaveValue("100, 150, 200");

        // Check that onChange was called with the correct RGB object
        expect(mockOnChange).toHaveBeenCalledWith(
            { r: 100, g: 150, b: 200 },
            expect.anything()
        );

        // Blur the input to see if format is preserved
        await user.tab();
        expect(input).toHaveValue("100, 150, 200");
    });

    test("handles rgba() format input correctly", async () => {
        const user = userEvent.setup();

        render(
            <RGBField value={{ r: 0, g: 0, b: 0 }} onChange={mockOnChange} />
        );

        const input = screen.getByRole("textbox");

        // Clear and type an rgba() format
        await user.clear(input);
        await user.type(input, "rgba(100, 150, 200, 0.5)");

        // Check that the input updates to the default format
        expect(input).toHaveValue("100, 150, 200");

        // Check that onChange was called with the correct RGB object (alpha is ignored)
        expect(mockOnChange).toHaveBeenCalledWith(
            { r: 100, g: 150, b: 200 },
            expect.anything()
        );

        // Blur the input to see if format is preserved
        await user.tab();
        expect(input).toHaveValue("100, 150, 200");
    });

    test("handles space-separated rgb format (rgb(100 150 200)) correctly", async () => {
        const user = userEvent.setup();

        const { rerender } = render(
            <RGBField value={{ r: 0, g: 0, b: 0 }} onChange={mockOnChange} />
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;

        // Clear and type a space-separated rgb format
        await user.clear(input);
        await user.type(input, "rgb(100 150 200)");

        // Check that the input contains the typed value
        // Note: this input isn't controlled, so the rgb() isn't stripped /
        // re-formatted. This will happen below after we update the value of the
        // input field manually via a re-render.
        expect(input).toHaveValue("rgb(100 150 200)");

        // Check that it was only called once, as the value is only valid once
        // the closing bracket is added at the end
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        // Check that onChange was called with the correct RGB object
        expect(mockOnChange).toHaveBeenCalledWith(
            { r: 100, g: 150, b: 200 },
            expect.anything()
        );

        // Clear the call list
        mockOnChange.mockClear();

        rerender(
            <RGBField
                value={{ r: 100, g: 150, b: 200 }}
                onChange={mockOnChange}
            />
        );

        expect(mockOnChange).not.toHaveBeenCalled();
        expect(input).toHaveValue("100 150 200");

        // Blur the input to see if format is preserved
        await user.tab();
        expect(input).toHaveValue("100 150 200");
    });

    test("handles space-separated rgba format (rgba(100 150 200 0.5)) correctly", async () => {
        const user = userEvent.setup();

        const { rerender } = render(
            <RGBField value={{ r: 0, g: 0, b: 0 }} onChange={mockOnChange} />
        );

        const input = screen.getByRole("textbox") as HTMLInputElement;

        // Clear and type a space-separated rgb format
        await user.clear(input);
        await user.type(input, "rgba(100 150 200 0.5)");

        // Check that the input contains the typed value
        // Note: this input isn't controlled, so the rgb() isn't stripped /
        // re-formatted. This will happen below after we update the value of the
        // input field manually via a re-render.
        expect(input).toHaveValue("rgba(100 150 200 0.5)");

        // Check that it was only called once, as the value is only valid once
        // the closing bracket is added at the end
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        // Check that onChange was called with the correct RGB object
        expect(mockOnChange).toHaveBeenCalledWith(
            { r: 100, g: 150, b: 200 },
            expect.anything()
        );

        // Clear the call list
        mockOnChange.mockClear();

        rerender(
            <RGBField
                value={{ r: 100, g: 150, b: 200 }}
                onChange={mockOnChange}
            />
        );

        expect(mockOnChange).not.toHaveBeenCalled();
        expect(input).toHaveValue("100 150 200");

        // Blur the input to see if format is preserved
        await user.tab();
        expect(input).toHaveValue("100 150 200");
    });

    test("preserves input format when value is updated externally", async () => {
        const user = userEvent.setup();
        const initialValue = { r: 0, g: 0, b: 0 };

        const { rerender } = render(
            <RGBField value={initialValue} onChange={mockOnChange} />
        );

        const input = screen.getByRole("textbox");

        // Change the format by typing a custom delimiter
        await user.clear(input);
        await user.type(input, "100,150 200");

        // Verify the custom format is displayed
        expect(input).toHaveValue("100,150 200");

        // Update the value externally
        const updatedValue = { r: 50, g: 75, b: 100 };
        rerender(<RGBField value={updatedValue} onChange={mockOnChange} />);

        // Check that the format is preserved with new values
        expect(input).toHaveValue("50,75 100");
    });

    test("rounds decimal RGB values to integers", async () => {
        const user = userEvent.setup();

        const { rerender } = render(
            <RGBField value={{ r: 0, g: 0, b: 0 }} onChange={mockOnChange} />
        );

        const input = screen.getByRole("textbox");

        // Clear and type decimal values
        await user.clear(input);
        await user.type(input, "100.6, 150.2, 200.8");

        // Check that onChange was called with rounded values
        expect(mockOnChange).toHaveBeenCalledWith(
            { r: 100.6, g: 150.2, b: 200.8 },
            expect.anything()
        );

        // Re-render our component with the new updated value that contains decimals
        rerender(
            <RGBField
                value={{ r: 100.6, g: 150.2, b: 200.8 }}
                onChange={mockOnChange}
            />
        );

        // Blur the input to see the rounded values
        await user.tab();
        expect(input).toHaveValue("101, 150, 201");
    });

    test("ignores RGB values outside the limit (0 - 255)", async () => {
        const user = userEvent.setup();

        render(
            <RGBField value={{ r: 0, g: 0, b: 0 }} onChange={mockOnChange} />
        );

        const input = screen.getByRole("textbox");

        // Clear and type values outside the valid range
        await user.clear(input);
        await user.type(input, "-10, 300, 150");

        // Nothing happens because this isn't a valid value
        expect(mockOnChange).not.toHaveBeenCalled();

        // Blur the input to see it return to its previous value
        await user.tab();
        expect(input).toHaveValue("0, 0, 0");
    });
});
