import { style } from "@vanilla-extract/css";

export const hueSlider = style({
    position: "relative",
    width: "20px", // Default width for the slider
    height: "100%",
    minHeight: "100px",
    userSelect: "none",
    touchAction: "none",
    background:
        "linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
    borderRadius: "4px",
});

export const hueThumb = style({
    position: "absolute",
    left: "50%",
    width: "28px", // Slightly wider than the slider
    height: "8px",
    backgroundColor: "white",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
    borderRadius: "3px",
    transform: "translateX(-50%)",
    pointerEvents: "none",
});
