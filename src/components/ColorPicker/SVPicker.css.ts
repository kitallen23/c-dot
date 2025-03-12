import { globalStyle, style } from "@vanilla-extract/css";

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
    position: "absolute",
    transform: "translate(-50%, 50%)",
    pointerEvents: "none",
});

globalStyle(`${svPointer} > *`, {
    position: "absolute",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
});

globalStyle(`${svPointer} > :nth-child(3)`, {
    width: "8px",
    height: "8px",
});

globalStyle(`${svPointer} > :nth-child(2)`, {
    width: "14px",
    height: "14px",
    backgroundColor: "white",
});

globalStyle(`${svPointer} > :nth-child(1)`, {
    width: "20px",
    height: "20px",
    backgroundColor: "black",
});
