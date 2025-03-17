import { BACKGROUNDS } from "@/utils/constants";
import { createVar, globalStyle, style } from "@vanilla-extract/css";

export const sliderWidth = createVar();
const sliderThumbHeight = createVar();
const sliderBorderWidth = "3px";

export const hueSlider = style({
    vars: {
        [sliderWidth]: "34px",
    },

    position: "relative",
    width: sliderWidth,
    height: "100%",
    minHeight: "100px",
    userSelect: "none",
    touchAction: "none",
    background:
        "linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
    borderRadius: "var(--radius-3)",
});

export const hueThumb = style({
    vars: {
        [sliderThumbHeight]: "calc(var(--radius-3) * 2)",
    },

    position: "absolute",
    transform: "translateX(-0.25em)",
    pointerEvents: "none",
});

globalStyle(`${hueThumb}.isDragging`, {
    vars: {
        [sliderThumbHeight]: "calc(var(--radius-3) * 3)",
    },
});

globalStyle(`${hueThumb} > div`, {
    position: "absolute",
    transition: "height 0.05s",
});

globalStyle(`${hueThumb} > :nth-child(2)`, {
    width: `calc(${sliderWidth} + (0.25em * 2))`,
    height: sliderThumbHeight,
    transform: "translateY(-50%)",
    borderRadius: "var(--radius-3)",
    outlineWidth: sliderBorderWidth,
    outlineStyle: "solid",
});

globalStyle(`${hueThumb} > :nth-child(1)`, {
    width: `calc(${sliderWidth} + (0.25em * 2) + (${sliderBorderWidth} * 4))`,
    height: `calc(${sliderThumbHeight} + (${sliderBorderWidth} * 4))`,
    transform: "translateY(-50%)",
    borderRadius: `calc(var(--radius-3) + (${sliderBorderWidth} * 2))`,
    left: `calc(-1 * (${sliderBorderWidth} + ${sliderBorderWidth}))`,
});

// Dark theme styles
globalStyle(`.radix-themes.dark ${hueThumb} > :nth-child(2)`, {
    outlineColor: BACKGROUNDS.light,
});
globalStyle(`.radix-themes.dark ${hueThumb} > :nth-child(1)`, {
    backgroundColor: BACKGROUNDS.dark,
});

// Light theme styles
globalStyle(`.radix-themes.light ${hueThumb} > :nth-child(2)`, {
    outlineColor: BACKGROUNDS.dark,
    // outlineColor: BACKGROUNDS.light,
});
globalStyle(`.radix-themes.light ${hueThumb} > :nth-child(1)`, {
    backgroundColor: BACKGROUNDS.light,
    // backgroundColor: BACKGROUNDS.dark,
});
