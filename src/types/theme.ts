export interface ColorScale {
    [key: number]: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
}
export interface ColorScaleSet {
    base: ColorScale;
    alpha: ColorScale;
    utility: {
        contrast: string;
        surface: string;
        indicator: string;
        track: string;
        background: string;
    };
}

export interface ColorMetadata {
    hex: string;
    isBrandSafe: boolean; // Pre-calculated contrast/accessibility flag
}

interface ThemeColors {
    // Current user-selected color with metadata
    selected: ColorMetadata;

    // The color actually used for branding elements
    // Will either be selected.hex (if isBrandSafe) or a fallback
    brandAccent: string;

    // UI colors
    colorScale: {
        light: ColorScaleSet;
        dark: ColorScaleSet;
    };

    grayScale: ColorScaleSet;

    text: string;
    textMuted: string;
}

export interface ThemeState {
    mode: "light" | "dark";
    colors: ThemeColors;
    customPalette: string[]; // TODO: Change this to be its own type
}
