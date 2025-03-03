import { Middleware } from "@reduxjs/toolkit";
import { generateColorScales } from "@/utils/colorUtils";
import { RootState } from "@/store/index";
import {
    setSelectedColor,
    setThemeMode,
    updateColorScales,
} from "@/store/themeSlice";
import { ColorScaleSet } from "@/types/theme";

/**
 * Applies color scale values to CSS custom properties
 */
function applyColorScalesToCSS(currentScale: ColorScaleSet) {
    // Apply base colors
    Object.entries(currentScale.base).forEach(([step, color]) => {
        document.documentElement.style.setProperty(`--custom-${step}`, color);
    });

    // Apply alpha colors
    Object.entries(currentScale.alpha).forEach(([step, color]) => {
        document.documentElement.style.setProperty(`--custom-a${step}`, color);
    });

    // Apply utility colors
    Object.entries(currentScale.utility).forEach(([name, color]) => {
        document.documentElement.style.setProperty(`--custom-${name}`, color);
    });

    // Map custom variables to Radix accent variables
    for (let i = 1; i <= 12; i++) {
        document.documentElement.style.setProperty(
            `--accent-${i}`,
            `var(--custom-${i})`
        );
        document.documentElement.style.setProperty(
            `--accent-a${i}`,
            `var(--custom-a${i})`
        );
    }
}

export const radixColorMiddleware: Middleware = store => next => action => {
    // First, let the action go through the reducer
    const result = next(action);

    // Get the current state after the reducer has processed the action
    const state = store.getState() as RootState;
    const { colors, mode } = state.theme;

    // If the selected color changed, calculate new color scales and update state
    if (setSelectedColor.match(action)) {
        // Generate color scales based on the selected color
        const colorScales = generateColorScales(colors.selected.hex);

        // Update the Redux state with the new color scales
        store.dispatch(updateColorScales(colorScales));

        // Apply CSS variables based on the current mode
        applyColorScalesToCSS(colorScales[mode]);
    }
    // If only the theme mode changed, just update CSS variables from existing state
    else if (setThemeMode.match(action)) {
        // Use the existing color scales from state
        applyColorScalesToCSS(colors.colorScale[mode]);
    }

    return result;
};
