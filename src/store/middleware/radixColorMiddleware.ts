import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/store/index";
import {
    setSelectedColor,
    setThemeMode,
    setThemeCss,
    updateColorScales,
} from "@/store/themeSlice";
import {
    ColorScaleSet,
    generateRadixColors,
    getColorName,
} from "@/utils/radixColors";
import { BACKGROUNDS } from "@/utils/constants";

interface GetColorScaleCssParams {
    isDarkMode: boolean;
    name: string;
    scale: ColorScaleSet["accentScale"];
    scaleWideGamut: ColorScaleSet["accentScaleWideGamut"];
    scaleAlpha: ColorScaleSet["accentScaleAlpha"];
    scaleAlphaWideGamut: ColorScaleSet["accentScaleAlphaWideGamut"];
    contrast: ColorScaleSet["accentContrast"];
    surface: ColorScaleSet["accentSurface"];
    surfaceWideGamut: ColorScaleSet["accentSurfaceWideGamut"];
}

const getColorScaleCss = ({
    isDarkMode,
    name,
    scale,
    scaleWideGamut,
    scaleAlpha,
    scaleAlphaWideGamut,
    contrast,
    surface,
    surfaceWideGamut,
}: GetColorScaleCssParams) => {
    const selector = isDarkMode
        ? ".dark, .dark-theme"
        : ":root, .light, .light-theme";

    return `
${selector} {
  ${scale.map((value, index) => `--${name}-${index + 1}: ${value};`).join("\n  ")}

  ${scaleAlpha.map((value, index) => `--${name}-a${index + 1}: ${value};`).join("\n  ")}

  --${name}-contrast: ${contrast};
  --${name}-surface: ${surface};
  --${name}-indicator: ${scale[8]};
  --${name}-track: ${scale[8]};
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    ${selector} {
      ${scaleWideGamut.map((value, index) => `--${name}-${index + 1}: ${value};`).join("\n      ")}

      ${scaleAlphaWideGamut
          .map((value, index) => `--${name}-a${index + 1}: ${value};`)
          .join("\n      ")}

      --${name}-contrast: ${contrast};
      --${name}-surface: ${surfaceWideGamut};
      --${name}-indicator: ${scaleWideGamut[8]};
      --${name}-track: ${scaleWideGamut[8]};
    }
  }
}
  `.trim();
};

const getBackgroundColorCss = ({
    isDarkMode,
    background,
}: {
    isDarkMode: boolean;
    background: string;
}) => {
    if (isDarkMode) {
        return `
.dark, .dark-theme, :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {
  --color-background: ${background};
}
    `.trim();
    }

    return `
:root, .light, .light-theme, .radix-themes {
  --color-background: ${background};
}
  `.trim();
};

interface GetNewPreviewStylesParams {
    selector?: string;
    colors: ColorScaleSet;
    isDarkMode: boolean;
}

const getThemeStyles = ({ colors, isDarkMode }: GetNewPreviewStylesParams) => {
    const accentColorsCss = getColorScaleCss({
        isDarkMode,
        name: getColorName(colors.accentScale[8]),
        contrast: colors.accentContrast,
        scale: colors.accentScale,
        scaleWideGamut: colors.accentScaleWideGamut,
        scaleAlpha: colors.accentScaleAlpha,
        scaleAlphaWideGamut: colors.accentScaleAlphaWideGamut,
        surface: colors.accentSurface,
        surfaceWideGamut: colors.accentSurfaceWideGamut,
    });

    const grayColorsCss = getColorScaleCss({
        isDarkMode,
        name: "gray",
        contrast: "#fff",
        scale: colors.grayScale,
        scaleWideGamut: colors.grayScaleWideGamut,
        scaleAlpha: colors.grayScaleAlpha,
        scaleAlphaWideGamut: colors.grayScaleAlphaWideGamut,
        surface: colors.graySurface,
        surfaceWideGamut: colors.graySurfaceWideGamut,
    });

    const backgroundCss = getBackgroundColorCss({
        isDarkMode,
        background: colors.background,
    });

    return `
[data-accent-color='custom'] {
  --accent-1: var(--custom-1);
  --accent-2: var(--custom-2);
  --accent-3: var(--custom-3);
  --accent-4: var(--custom-4);
  --accent-5: var(--custom-5);
  --accent-6: var(--custom-6);
  --accent-7: var(--custom-7);
  --accent-8: var(--custom-8);
  --accent-9: var(--custom-9);
  --accent-10: var(--custom-10);
  --accent-11: var(--custom-11);
  --accent-12: var(--custom-12);

  --accent-a1: var(--custom-a1);
  --accent-a2: var(--custom-a2);
  --accent-a3: var(--custom-a3);
  --accent-a4: var(--custom-a4);
  --accent-a5: var(--custom-a5);
  --accent-a6: var(--custom-a6);
  --accent-a7: var(--custom-a7);
  --accent-a8: var(--custom-a8);
  --accent-a9: var(--custom-a9);
  --accent-a10: var(--custom-a10);
  --accent-a11: var(--custom-a11);
  --accent-a12: var(--custom-a12);

  --accent-contrast: var(--custom-contrast);
  --accent-surface: var(--custom-surface);
  --accent-indicator: var(--custom-indicator);
  --accent-track: var(--custom-track);
}

${backgroundCss}
${accentColorsCss}
${grayColorsCss}
  `.trim();
};

export const radixColorMiddleware: Middleware = store => next => action => {
    // First, let the action go through the reducer
    const result = next(action);

    // Get the current state after the reducer has processed the action
    const state = store.getState() as RootState;
    const { colors, mode } = state.theme;

    // If the selected color or the mode changed, calculate new color scales and
    // update state
    if (setSelectedColor.match(action) || setThemeMode.match(action)) {
        // Generate color scales based on the selected color, background, and
        // gray color
        const colorScales = generateRadixColors({
            appearance: mode,
            accent: colors.selected.hex,
            gray: "#8B8D98",
            background: BACKGROUNDS[mode],
        });

        // Update the Redux state with the new color scales
        store.dispatch(updateColorScales(colorScales));

        // Apply CSS variables based on the current mode
        store.dispatch(
            setThemeCss(
                getThemeStyles({
                    colors: colorScales,
                    isDarkMode: mode === "dark",
                })
            )
        );
    }

    return result;
};
