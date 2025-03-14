import { BACKGROUNDS } from "@/utils/constants";
import { createVar, globalStyle, style } from "@vanilla-extract/css";

const basePointerWidth = createVar();
const pointerBorderWidth = "3px";

export const svPicker = style({
    position: "relative",
    width: "100%",
    height: "100%",
    userSelect: "none",
    touchAction: "none",
    borderRadius: "var(--radius-3)",

    // Make the component maintain square aspect ratio
    "::before": {
        content: '""',
        display: "block",
        paddingTop: "100%",
    },
});

export const svWhiteGradient = style({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to right, white, rgba(255, 255, 255, 0))",
    borderRadius: "var(--radius-3)",
});

export const svBlackGradient = style({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to top, black, rgba(0, 0, 0, 0))",
    borderRadius: "calc(var(--radius-3) - 1px)",
});

export const svPointer = style({
    vars: {
        [basePointerWidth]: "9px",
    },

    position: "absolute",
    transform: "translate(-50%, 50%)",
    pointerEvents: "none",
});

globalStyle(`${svPointer}.isDragging`, {
    vars: {
        [basePointerWidth]: "20px",
    },
    zIndex: 1,
});

globalStyle(`${svPointer} > div`, {
    position: "absolute",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "width, height 0.05s",
});

globalStyle(`${svPointer} > :nth-child(2)`, {
    width: basePointerWidth,
    height: basePointerWidth,
    outline: `${pointerBorderWidth} solid ${BACKGROUNDS.light}`,
});

globalStyle(`${svPointer} > :nth-child(1)`, {
    // Border width * 2 gives us the edge of the white circle.
    // So border width * 4 gives us the edge of this; the black circle.
    width: `calc(${basePointerWidth} + ${pointerBorderWidth} * 4)`,
    height: `calc(${basePointerWidth} + ${pointerBorderWidth} * 4)`,
    backgroundColor: BACKGROUNDS.dark,
});
