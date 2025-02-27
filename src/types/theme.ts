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
    background: string;
    navBackground: string;

    text: string;
    textMuted: string;
}

export interface ThemeState {
    mode: "light" | "dark";
    colors: ThemeColors;
    customPalette: string[]; // TODO: Change this to be its own type
}
