import { Middleware } from "@reduxjs/toolkit";
import { generateColorScales } from "@/utils/colorUtils";
import { RootState } from "@/store/index";
import { setSelectedColor, setThemeMode } from "@/store/themeSlice";

export const radixColorMiddleware: Middleware = store => next => action => {
    // First, let the action go through the reducer
    const result = next(action);

    // Check if the action is one that should trigger color updates
    if (setSelectedColor.match(action) || setThemeMode.match(action)) {
        // Get the current state after the reducer has processed the action
        const state = store.getState() as RootState;
        const { colors, mode } = state.theme;

        // Generate color scales based on the selected color
        const colorScales = generateColorScales(colors.brandAccent);

        // Apply the appropriate scale based on the current theme mode
        const currentScale =
            mode === "dark" ? colorScales.dark : colorScales.light;

        // Apply base colors
        Object.entries(currentScale.base).forEach(([step, color]) => {
            document.documentElement.style.setProperty(
                `--custom-${step}`,
                color
            );
        });

        // Apply alpha colors
        Object.entries(currentScale.alpha).forEach(([step, color]) => {
            document.documentElement.style.setProperty(
                `--custom-a${step}`,
                color
            );
        });

        // Apply utility colors
        Object.entries(currentScale.utility).forEach(([name, color]) => {
            document.documentElement.style.setProperty(
                `--custom-${name}`,
                color
            );
        });

        // Map custom variables to Radix accent variables
        document.documentElement.style.setProperty(
            "--accent-1",
            `var(--custom-1)`
        );
        document.documentElement.style.setProperty(
            "--accent-2",
            `var(--custom-2)`
        );
        document.documentElement.style.setProperty(
            "--accent-3",
            `var(--custom-3)`
        );
        document.documentElement.style.setProperty(
            "--accent-4",
            `var(--custom-4)`
        );
        document.documentElement.style.setProperty(
            "--accent-5",
            `var(--custom-5)`
        );
        document.documentElement.style.setProperty(
            "--accent-6",
            `var(--custom-6)`
        );
        document.documentElement.style.setProperty(
            "--accent-7",
            `var(--custom-7)`
        );
        document.documentElement.style.setProperty(
            "--accent-8",
            `var(--custom-8)`
        );
        document.documentElement.style.setProperty(
            "--accent-9",
            `var(--custom-9)`
        );
        document.documentElement.style.setProperty(
            "--accent-10",
            `var(--custom-10)`
        );
        document.documentElement.style.setProperty(
            "--accent-11",
            `var(--custom-11)`
        );
        document.documentElement.style.setProperty(
            "--accent-12",
            `var(--custom-12)`
        );

        // Map alpha variables
        document.documentElement.style.setProperty(
            "--accent-a1",
            `var(--custom-a1)`
        );
        document.documentElement.style.setProperty(
            "--accent-a2",
            `var(--custom-a2)`
        );
        document.documentElement.style.setProperty(
            "--accent-a3",
            `var(--custom-a3)`
        );
        document.documentElement.style.setProperty(
            "--accent-a4",
            `var(--custom-a4)`
        );
        document.documentElement.style.setProperty(
            "--accent-a5",
            `var(--custom-a5)`
        );
        document.documentElement.style.setProperty(
            "--accent-a6",
            `var(--custom-a6)`
        );
        document.documentElement.style.setProperty(
            "--accent-a7",
            `var(--custom-a7)`
        );
        document.documentElement.style.setProperty(
            "--accent-a8",
            `var(--custom-a8)`
        );
        document.documentElement.style.setProperty(
            "--accent-a9",
            `var(--custom-a9)`
        );
        document.documentElement.style.setProperty(
            "--accent-a10",
            `var(--custom-a10)`
        );
        document.documentElement.style.setProperty(
            "--accent-a11",
            `var(--custom-a11)`
        );
        document.documentElement.style.setProperty(
            "--accent-a12",
            `var(--custom-a12)`
        );
    }

    return result;
};
