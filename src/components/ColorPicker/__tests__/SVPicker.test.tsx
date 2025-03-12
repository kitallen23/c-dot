import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SVPicker from "@/components/ColorPicker/SVPicker";
import { svPicker, svPointer } from "@/components/ColorPicker/SVPicker.css";

describe("SVPicker", () => {
    const mockOnChange = vi.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    test("renders with initial values", () => {
        const { container } = render(
            <SVPicker
                hue={180}
                saturation={50}
                value={75}
                onChange={mockOnChange}
            />
        );

        const pointer = container.querySelector(`.${svPointer}`);
        expect(pointer).toHaveStyle("left: 50%");
        expect(pointer).toHaveStyle("bottom: 75%");
    });

    test("does not call onChange during drag", async () => {
        const user = userEvent.setup();
        const { container } = render(
            <SVPicker
                hue={180}
                saturation={50}
                value={75}
                onChange={mockOnChange}
            />
        );

        // Mock getBoundingClientRect for the container
        const containerElement = container.querySelector(`.${svPicker}`);
        const mockRect = new DOMRect(0, 0, 200, 200);
        vi.spyOn(
            containerElement as HTMLElement,
            "getBoundingClientRect"
        ).mockReturnValue(mockRect);

        // Start dragging
        await user.pointer({
            target: containerElement as HTMLElement,
            keys: "[MouseLeft>]",
        });

        // Move during drag
        await user.pointer({
            coords: { clientX: 150, clientY: 100 },
        });

        // Verify onChange not called yet
        expect(mockOnChange).not.toHaveBeenCalled();
    });

    test("calls onChange with new values on mouse up", async () => {
        const user = userEvent.setup();
        const { container } = render(
            <SVPicker
                hue={180}
                saturation={50}
                value={75}
                onChange={mockOnChange}
            />
        );

        // Mock getBoundingClientRect
        const containerElement = container.querySelector(`.${svPicker}`);
        const mockRect = new DOMRect(0, 0, 200, 200);
        vi.spyOn(
            containerElement as HTMLElement,
            "getBoundingClientRect"
        ).mockReturnValue(mockRect);

        // Start dragging
        await user.pointer({
            target: containerElement as HTMLElement,
            keys: "[MouseLeft>]",
        });

        // Move during drag
        await user.pointer({
            coords: { clientX: 150, clientY: 100 },
        });

        // End drag
        await user.pointer({
            keys: "[/MouseLeft]",
        });

        // Verify onChange called with expected values (75% saturation, 50% value)
        expect(mockOnChange).toHaveBeenCalledWith(75, 50);
    });

    test("calls onChange with new values on click", async () => {
        const user = userEvent.setup();
        const { container } = render(
            <SVPicker
                hue={0}
                saturation={50}
                value={50}
                onChange={mockOnChange}
            />
        );

        // Mock getBoundingClientRect
        const containerElement = container.querySelector(`.${svPicker}`);
        const mockRect = new DOMRect(0, 0, 200, 200);
        vi.spyOn(
            containerElement as HTMLElement,
            "getBoundingClientRect"
        ).mockReturnValue(mockRect);

        // Click in top left corner
        await user.pointer({
            target: containerElement as HTMLElement,
            keys: "[MouseLeft]",
            coords: { clientX: 0, clientY: 0 },
        });
        // Verify onChange called with expected values (0% saturation, 100% value)
        expect(mockOnChange).toHaveBeenCalledWith(0, 100);

        mockOnChange.mockClear();

        // Click in top right corner
        await user.pointer({
            target: containerElement as HTMLElement,
            keys: "[MouseLeft]",
            coords: { clientX: 200, clientY: 0 },
        });
        // Verify onChange called with expected values (100% saturation, 100% value)
        expect(mockOnChange).toHaveBeenCalledWith(100, 100);
    });

    test("calls onChange with new values on touch end", async () => {
        const user = userEvent.setup();
        const mockOnChange = vi.fn();

        const { container } = render(
            <SVPicker
                hue={180}
                saturation={50}
                value={75}
                onChange={mockOnChange}
            />
        );

        // Get the container element and mock its bounding rectangle
        const containerElement = container.querySelector(`.${svPicker}`);
        const mockRect = new DOMRect(0, 0, 200, 200);
        vi.spyOn(
            containerElement as HTMLElement,
            "getBoundingClientRect"
        ).mockReturnValue(mockRect);

        // await user.pointer([
        //     {
        //         keys: "[TouchA>]",
        //         target: containerElement as HTMLElement,
        //         coords: { x: 0, y: 200 },
        //     },
        //     {
        //         pointerName: "TouchA",
        //         target: containerElement as HTMLElement,
        //         coords: { x: 150, y: 100 },
        //     },
        //     { keys: "[/TouchA]" },
        // ]);
        // expect(mockOnChange).toHaveBeenCalledTimes(1);
        // expect(mockOnChange).toHaveBeenCalledWith(75, 50);

        // Simulate touch start
        await user.pointer({
            target: containerElement as HTMLElement,
            coords: { clientX: 0, clientY: 0 }, // Start at top-left
            keys: "[TouchA>]",
        });

        // At this point, the component should register the touch but not call onChange yet
        expect(mockOnChange).not.toHaveBeenCalled();

        // Simulate touch move to coordinates that would represent 75% saturation, 50% value
        await user.pointer({
            pointerName: "TouchA",
            coords: { clientX: 150, clientY: 100 },
        });
        // The component should track the position internally but not call onChange during move
        expect(mockOnChange).not.toHaveBeenCalled();

        // Simulate touch end
        await user.pointer({ pointerName: "TouchA", keys: "[/TouchA]" });

        // Now the component should call onChange with the final values
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(75, 50);
    });
});
