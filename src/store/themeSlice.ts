import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColorScaleSet, ThemeState } from "../types/theme";
import { isBrandSafe } from "@/utils/colorUtils";
import {
    BRAND_ACCENT,
    DEFAULT_COLOR_SCALE,
    GRAYSCALE,
} from "@/utils/constants";

const initialState: ThemeState = {
    mode: "dark",
    colors: {
        selected: {
            hex: "#FFFFFF",
            isBrandSafe: true,
        },
        brandAccent: BRAND_ACCENT.dark,
        colorScale: DEFAULT_COLOR_SCALE,
        grayScale: GRAYSCALE.dark,
        text: GRAYSCALE.dark.base[12],
        textMuted: GRAYSCALE.dark.base[11],
    },
    customPalette: [],
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<"light" | "dark">) => {
            const grayScale = GRAYSCALE[action.payload];

            const hex = state.colors.selected.hex;
            const background = grayScale.base[1];
            const isSafe = isBrandSafe(state.colors.selected.hex, background);
            state.colors.selected = {
                ...state.colors.selected,
                isBrandSafe: isSafe,
            };

            state.colors.brandAccent = isSafe
                ? hex
                : BRAND_ACCENT[action.payload];

            state.mode = action.payload;
            state.colors.grayScale = grayScale;
            state.colors.text = grayScale.base[12];
            state.colors.textMuted = grayScale.base[11];
        },
        setSelectedColor: (state, action: PayloadAction<string>) => {
            const hex = action.payload;
            const background = state.colors.grayScale.base[1];
            const isSafe = isBrandSafe(hex, background);

            state.colors.selected = {
                hex,
                isBrandSafe: isSafe,
            };

            state.colors.brandAccent = isSafe ? hex : state.colors.brandAccent;
        },
        updateCustomPalette: (state, action: PayloadAction<string[]>) => {
            state.customPalette = action.payload;
        },
        updateColorScales: (
            state,
            action: PayloadAction<{
                light: ColorScaleSet;
                dark: ColorScaleSet;
            }>
        ) => {
            state.colors.colorScale = action.payload;
        },
    },
});

export const {
    setThemeMode,
    setSelectedColor,
    updateCustomPalette,
    updateColorScales,
} = themeSlice.actions;
export default themeSlice.reducer;
