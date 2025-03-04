import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "../types/theme";
import { isBrandSafe } from "@/utils/colorUtils";
import {
    BACKGROUNDS,
    BRAND_ACCENT,
    DEFAULT_COLOR_SCALE,
    DEFAULT_THEME_CSS,
} from "@/utils/constants";
import { ColorScaleSet, getColorName } from "@/utils/radixColors";

const initialState: ThemeState = {
    mode: "dark",
    colors: {
        selected: {
            hex: "#FFFFFF",
            isBrandSafe: true,
        },
        brandAccent: BRAND_ACCENT.dark,
        colorScale: DEFAULT_COLOR_SCALE,
        accentName: "custom",
        background: BACKGROUNDS.dark,
        text: DEFAULT_COLOR_SCALE.grayScale[11],
        textMuted: DEFAULT_COLOR_SCALE.grayScale[10],
    },
    customPalette: [],
    css: DEFAULT_THEME_CSS,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<"light" | "dark">) => {
            // Check if the new selected accent color is brand-safe
            const hex = state.colors.selected.hex;
            const background = BACKGROUNDS[action.payload];
            const isSafe = isBrandSafe(state.colors.selected.hex, background);
            state.colors.selected = {
                ...state.colors.selected,
                isBrandSafe: isSafe,
            };

            state.colors.brandAccent = isSafe
                ? hex
                : BRAND_ACCENT[action.payload];

            state.mode = action.payload;
        },
        setSelectedColor: (state, action: PayloadAction<string>) => {
            // Check if the previously selected accent color is brand-safe
            const hex = action.payload;
            const background = BACKGROUNDS[state.mode];
            const isSafe = isBrandSafe(hex, background);

            state.colors.selected = {
                hex,
                isBrandSafe: isSafe,
            };

            state.colors.brandAccent = isSafe ? hex : state.colors.brandAccent;
        },
        setThemeCss: (state, action: PayloadAction<string>) => {
            state.css = action.payload;
        },
        updateCustomPalette: (state, action: PayloadAction<string[]>) => {
            state.customPalette = action.payload;
        },
        updateColorScales: (state, action: PayloadAction<ColorScaleSet>) => {
            const accentName = getColorName(action.payload.accentScale[8]);
            state.colors.colorScale = action.payload;
            state.colors.accentName = accentName;
        },
    },
});

export const {
    setThemeMode,
    setSelectedColor,
    setThemeCss,
    updateCustomPalette,
    updateColorScales,
} = themeSlice.actions;
export default themeSlice.reducer;
