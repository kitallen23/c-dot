import { globalStyle, style } from "@vanilla-extract/css";

export const colorInput = style({
    fontSize: "var(--font-size-3)",
    selectors: {
        "&:not(:focus-within)": {
            background: "transparent",
            boxShadow: "none",
        },
    },
});
globalStyle(`${colorInput} > input`, {
    fontWeight: "bold",
    letterSpacing: "var(--letter-spacing-lg)",
});
