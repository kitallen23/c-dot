import { lineHeight, topbarHeight } from "@/styles/tokens.css";
import { createVar, globalStyle } from "@vanilla-extract/css";

export const topbarHeightVar = createVar();

globalStyle(":root", {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: 1.5,
    fontWeight: 400,
    colorScheme: "dark light",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",

    vars: {
        "--letter-spacing-lg": "0.05em",
        "--line-height": lineHeight.default,
        [topbarHeightVar]: `${topbarHeight}px`,
    },
});

globalStyle("*, *::before, *::after", {
    boxSizing: "border-box",
});

globalStyle("a", {
    fontWeight: 500,
    color: "#646cff",
    textDecoration: "inherit",
});

globalStyle("a:hover", {
    color: "#535bf2",
});

globalStyle("body", {
    margin: 0,
});

globalStyle("h1", {
    fontSize: "3.2em",
    lineHeight: 1.1,
});

globalStyle(".text-muted", {
    color: "var(--gray-11)",
});
