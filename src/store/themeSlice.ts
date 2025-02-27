import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "../types/theme";

const initialState: ThemeState = {
    mode: "dark",
    colors: {
        selected: {
            hex: "#FFFFFF",
            isBrandSafe: true,
        },
        brandAccent: "#FFFFFF",
        background: "#111111",
        navBackground: "#111111",
        text: "#FFFFFF",
        textMuted: "#46484F",
    },
    customPalette: [],
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<"light" | "dark">) => {
            state.mode = action.payload;
            // You might want to update colors based on mode here
        },
        setSelectedColor: (state, action: PayloadAction<string>) => {
            // TODO: Calculate if hex is brand safe
            state.colors.selected = {
                hex: action.payload,
                isBrandSafe: true,
            };

            // Update brandAccent based on isBrandSafe
            state.colors.brandAccent = action.payload;
        },
        updateCustomPalette: (state, action: PayloadAction<string[]>) => {
            state.customPalette = action.payload;
        },
    },
});

export const { setThemeMode, setSelectedColor, updateCustomPalette } =
    themeSlice.actions;
export default themeSlice.reducer;
