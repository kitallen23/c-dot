import { ColorScaleSet } from "@/types/theme";

export const HOMEPAGE = "/";

export const COLOR_SYNC_DEBOUNCE = 500;

export const GRAYSCALE = {
    dark: {
        base: {
            1: "#111113",
            2: "#19191b",
            3: "#222325",
            4: "#292a2e",
            5: "#303136",
            6: "#393a40",
            7: "#46484f",
            8: "#5f606a",
            9: "#6c6e79",
            10: "#797b86",
            11: "#b2b3bd",
            12: "#eeeef0",
        },
        alpha: {
            1: "#1111bb03",
            2: "#cbcbf90b",
            3: "#d6e2f916",
            4: "#d1d9f920",
            5: "#d7ddfd28",
            6: "#d9defc33",
            7: "#dae2fd43",
            8: "#e0e3fd60",
            9: "#e0e4fd70",
            10: "#e3e7fd7e",
            11: "#eff0feb9",
            12: "#fdfdffef",
        },
        utility: {
            contrast: "#FFFFFF",
            surface: "rgba(0, 0, 0, 0.05)",
            indicator: "#6c6e79",
            track: "#6c6e79",
            background: "#111111",
        },
    },
    light: {
        base: {
            1: "#fcfcfd",
            2: "#f9f9fb",
            3: "#eff0f3",
            4: "#e7e8ec",
            5: "#e0e1e6",
            6: "#d8d9e0",
            7: "#cdced7",
            8: "#b9bbc6",
            9: "#8b8d98",
            10: "#80828d",
            11: "#62636c",
            12: "#1e1f24",
        },
        alpha: {
            1: "#00005503",
            2: "#00005506",
            3: "#00104010",
            4: "#000b3618",
            5: "#0009321f",
            6: "#00073527",
            7: "#00063332",
            8: "#00083046",
            9: "#00051d74",
            10: "#00051b7f",
            11: "#0002119d",
            12: "#000107e1",
        },
        utility: {
            contrast: "#FFFFFF",
            surface: "rgba(0, 0, 0, 0.05)",
            indicator: "#6c6e79",
            track: "#6c6e79",
            background: "#ffffff",
        },
    },
};

export const DEFAULT_COLOR_SCALE: {
    light: ColorScaleSet;
    dark: ColorScaleSet;
} = {
    light: {
        base: {
            1: "#fcfcfc",
            2: "#f9f9f9",
            3: "#f0f0f0",
            4: "#e8e8e8",
            5: "#e1e1e1",
            6: "#d9d9d9",
            7: "#cecece",
            8: "#bbbbbb",
            9: "#111111", // Original color
            10: "#2a2a2a",
            11: "#636363",
            12: "#1f1f1f",
        },
        alpha: {
            1: "#00000003",
            2: "#00000006",
            3: "#0000000f",
            4: "#00000017",
            5: "#0000001e",
            6: "#00000026",
            7: "#00000031",
            8: "#00000044",
            9: "#000000ee",
            10: "#000000d5",
            11: "#0000009c",
            12: "#000000e0",
        },
        utility: {
            contrast: "#ffffff",
            surface: "#f8f8f8cc",
            indicator: "#111111",
            track: "#111111",
            background: "#ffffff",
        },
    },
    dark: {
        base: {
            1: "#111113",
            2: "#19191b",
            3: "#222325",
            4: "#292a2e",
            5: "#303136",
            6: "#393a40",
            7: "#46484f",
            8: "#5f606a",
            9: "#ffffff", // Original color
            10: "#f5f6f8",
            11: "#b2b3bd",
            12: "#eeeef0",
        },
        alpha: {
            1: "#1111bb03",
            2: "#cbcbf90b",
            3: "#d6e2f916",
            4: "#d1d9f920",
            5: "#d7ddfd28",
            6: "#d9defc33",
            7: "#dae2fd43",
            8: "#e0e3fd60",
            9: "#ffffff",
            10: "#fcfdfff8",
            11: "#eff0feb9",
            12: "#fdfdffef",
        },
        utility: {
            contrast: "#311921",
            surface: "#21212580",
            indicator: "#ffffff",
            track: "#ffffff",
            background: "#111111",
        },
    },
};

export const BRAND_ACCENT = {
    dark: DEFAULT_COLOR_SCALE.dark.base[9],
    light: DEFAULT_COLOR_SCALE.light.base[9],
};
