import { style } from "@vanilla-extract/css";

export const colorPicker = style({
    display: "flex",
    gap: "16px",
    maxWidth: "300px",
});

export const svPickerContainer = style({
    flex: 1,
    minWidth: 0, // Allows the container to shrink below its content size
});

export const hueSliderContainer = style({
    height: "auto", // Will match the height of the SVPicker due to its square aspect ratio
});
