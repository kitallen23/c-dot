import { ColorScaleSet } from "@/utils/radixColors";

export const HOMEPAGE = "/";

export const COLOR_SYNC_DEBOUNCE = 500;

export const DEFAULT_COLOR_SCALE: ColorScaleSet = {
    accentScale: [
        "#111113",
        "#19191b",
        "#222325",
        "#292a2e",
        "#303136",
        "#393a40",
        "#46484f",
        "#5f606a",
        "#fff",
        "#f5f6f8",
        "#b2b3bd",
        "#eeeef0",
    ],
    accentScaleAlpha: [
        "#1111bb03",
        "#cbcbf90b",
        "#d6e2f916",
        "#d1d9f920",
        "#d7ddfd28",
        "#d9defc33",
        "#dae2fd43",
        "#e0e3fd60",
        "#ffffff",
        "#fcfdfff8",
        "#eff0feb9",
        "#fdfdffef",
    ],
    accentScaleWideGamut: [
        "oklch(17.8% 0.0042 277.7)",
        "oklch(21.5% 0.004 277.7)",
        "oklch(25.5% 0.0055 277.7)",
        "oklch(28.4% 0.0075 277.7)",
        "oklch(31.4% 0.0089 277.7)",
        "oklch(35% 0.01 277.7)",
        "oklch(40.2% 0.0121 277.7)",
        "oklch(49.2% 0.0157 277.7)",
        "oklch(100% 0 none)",
        "oklch(97.3% 0.0026 277.7)",
        "oklch(77% 0.0138 277.7)",
        "oklch(94.9% 0.0026 277.7)",
    ],
    accentScaleAlphaWideGamut: [
        "color(display-p3 0.0667 0.0667 0.9412 / 0.009)",
        "color(display-p3 0.8 0.8 0.9804 / 0.043)",
        "color(display-p3 0.851 0.898 0.9882 / 0.085)",
        "color(display-p3 0.8392 0.8706 1 / 0.122)",
        "color(display-p3 0.8471 0.8745 1 / 0.156)",
        "color(display-p3 0.8784 0.898 1 / 0.194)",
        "color(display-p3 0.8745 0.9059 0.9961 / 0.257)",
        "color(display-p3 0.8941 0.9059 1 / 0.37)",
        "color(display-p3 1 1 1)",
        "color(display-p3 0.9882 0.9922 1 / 0.971)",
        "color(display-p3 0.9451 0.949 1 / 0.719)",
        "color(display-p3 0.9922 0.9922 1 / 0.937)",
    ],
    accentContrast: "#311921",
    grayScale: [
        "#111113",
        "#19191b",
        "#222325",
        "#292a2e",
        "#303136",
        "#393a40",
        "#46484f",
        "#5f606a",
        "#6c6e79",
        "#797b86",
        "#b2b3bd",
        "#eeeef0",
    ],
    grayScaleAlpha: [
        "#1111bb03",
        "#cbcbf90b",
        "#d6e2f916",
        "#d1d9f920",
        "#d7ddfd28",
        "#d9defc33",
        "#dae2fd43",
        "#e0e3fd60",
        "#e0e4fd70",
        "#e3e7fd7e",
        "#eff0feb9",
        "#fdfdffef",
    ],
    grayScaleWideGamut: [
        "oklch(17.8% 0.0042 277.7)",
        "oklch(21.5% 0.004 277.7)",
        "oklch(25.5% 0.0055 277.7)",
        "oklch(28.4% 0.0075 277.7)",
        "oklch(31.4% 0.0089 277.7)",
        "oklch(35% 0.01 277.7)",
        "oklch(40.2% 0.0121 277.7)",
        "oklch(49.2% 0.0157 277.7)",
        "oklch(54% 0.0167 277.7)",
        "oklch(58.6% 0.0165 277.7)",
        "oklch(77% 0.0138 277.7)",
        "oklch(94.9% 0.0026 277.7)",
    ],
    grayScaleAlphaWideGamut: [
        "color(display-p3 0.0667 0.0667 0.9412 / 0.009)",
        "color(display-p3 0.8 0.8 0.9804 / 0.043)",
        "color(display-p3 0.851 0.898 0.9882 / 0.085)",
        "color(display-p3 0.8392 0.8706 1 / 0.122)",
        "color(display-p3 0.8471 0.8745 1 / 0.156)",
        "color(display-p3 0.8784 0.898 1 / 0.194)",
        "color(display-p3 0.8745 0.9059 0.9961 / 0.257)",
        "color(display-p3 0.8941 0.9059 1 / 0.37)",
        "color(display-p3 0.8902 0.9098 1 / 0.433)",
        "color(display-p3 0.902 0.9176 1 / 0.488)",
        "color(display-p3 0.9451 0.949 1 / 0.719)",
        "color(display-p3 0.9922 0.9922 1 / 0.937)",
    ],
    graySurface: "rgba(0, 0, 0, 0.05)",
    graySurfaceWideGamut: "color(display-p3 0 0 0 / 5%)",
    accentSurface: "#21212580",
    accentSurfaceWideGamut: "color(display-p3 0.1255 0.1255 0.1412 / 0.5)",
    background: "#111",
};

export const BRAND_ACCENT = {
    dark: "#ffffff",
    light: "#111111",
};

export const BACKGROUNDS = {
    dark: "#111111",
    light: "#ffffff",
};

export const DEFAULT_THEME_CSS = `
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

.dark, .dark-theme, :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {
  --color-background: #111;
}
.dark, .dark-theme {
  --custom-1: #111113;
  --custom-2: #19191b;
  --custom-3: #222325;
  --custom-4: #292a2e;
  --custom-5: #303136;
  --custom-6: #393a40;
  --custom-7: #46484f;
  --custom-8: #5f606a;
  --custom-9: #fff;
  --custom-10: #f5f6f8;
  --custom-11: #b2b3bd;
  --custom-12: #eeeef0;

  --custom-a1: #1111bb03;
  --custom-a2: #cbcbf90b;
  --custom-a3: #d6e2f916;
  --custom-a4: #d1d9f920;
  --custom-a5: #d7ddfd28;
  --custom-a6: #d9defc33;
  --custom-a7: #dae2fd43;
  --custom-a8: #e0e3fd60;
  --custom-a9: #ffffff;
  --custom-a10: #fcfdfff8;
  --custom-a11: #eff0feb9;
  --custom-a12: #fdfdffef;

  --custom-contrast: #311921;
  --custom-surface: #21212580;
  --custom-indicator: #fff;
  --custom-track: #fff;
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    .dark, .dark-theme {
      --custom-1: oklch(17.8% 0.0042 277.7);
      --custom-2: oklch(21.5% 0.004 277.7);
      --custom-3: oklch(25.5% 0.0055 277.7);
      --custom-4: oklch(28.4% 0.0075 277.7);
      --custom-5: oklch(31.4% 0.0089 277.7);
      --custom-6: oklch(35% 0.01 277.7);
      --custom-7: oklch(40.2% 0.0121 277.7);
      --custom-8: oklch(49.2% 0.0157 277.7);
      --custom-9: oklch(100% 0 none);
      --custom-10: oklch(97.3% 0.0026 277.7);
      --custom-11: oklch(77% 0.0138 277.7);
      --custom-12: oklch(94.9% 0.0026 277.7);

      --custom-a1: color(display-p3 0.0667 0.0667 0.9412 / 0.009);
      --custom-a2: color(display-p3 0.8 0.8 0.9804 / 0.043);
      --custom-a3: color(display-p3 0.851 0.898 0.9882 / 0.085);
      --custom-a4: color(display-p3 0.8392 0.8706 1 / 0.122);
      --custom-a5: color(display-p3 0.8471 0.8745 1 / 0.156);
      --custom-a6: color(display-p3 0.8784 0.898 1 / 0.194);
      --custom-a7: color(display-p3 0.8745 0.9059 0.9961 / 0.257);
      --custom-a8: color(display-p3 0.8941 0.9059 1 / 0.37);
      --custom-a9: color(display-p3 1 1 1);
      --custom-a10: color(display-p3 0.9882 0.9922 1 / 0.971);
      --custom-a11: color(display-p3 0.9451 0.949 1 / 0.719);
      --custom-a12: color(display-p3 0.9922 0.9922 1 / 0.937);

      --custom-contrast: #311921;
      --custom-surface: color(display-p3 0.1255 0.1255 0.1412 / 0.5);
      --custom-indicator: oklch(100% 0 none);
      --custom-track: oklch(100% 0 none);
    }
  }
}
.dark, .dark-theme {
  --gray-1: #111113;
  --gray-2: #19191b;
  --gray-3: #222325;
  --gray-4: #292a2e;
  --gray-5: #303136;
  --gray-6: #393a40;
  --gray-7: #46484f;
  --gray-8: #5f606a;
  --gray-9: #6c6e79;
  --gray-10: #797b86;
  --gray-11: #b2b3bd;
  --gray-12: #eeeef0;

  --gray-a1: #1111bb03;
  --gray-a2: #cbcbf90b;
  --gray-a3: #d6e2f916;
  --gray-a4: #d1d9f920;
  --gray-a5: #d7ddfd28;
  --gray-a6: #d9defc33;
  --gray-a7: #dae2fd43;
  --gray-a8: #e0e3fd60;
  --gray-a9: #e0e4fd70;
  --gray-a10: #e3e7fd7e;
  --gray-a11: #eff0feb9;
  --gray-a12: #fdfdffef;

  --gray-contrast: #fff;
  --gray-surface: rgba(0, 0, 0, 0.05);
  --gray-indicator: #6c6e79;
  --gray-track: #6c6e79;
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    .dark, .dark-theme {
      --gray-1: oklch(17.8% 0.0042 277.7);
      --gray-2: oklch(21.5% 0.004 277.7);
      --gray-3: oklch(25.5% 0.0055 277.7);
      --gray-4: oklch(28.4% 0.0075 277.7);
      --gray-5: oklch(31.4% 0.0089 277.7);
      --gray-6: oklch(35% 0.01 277.7);
      --gray-7: oklch(40.2% 0.0121 277.7);
      --gray-8: oklch(49.2% 0.0157 277.7);
      --gray-9: oklch(54% 0.0167 277.7);
      --gray-10: oklch(58.6% 0.0165 277.7);
      --gray-11: oklch(77% 0.0138 277.7);
      --gray-12: oklch(94.9% 0.0026 277.7);

      --gray-a1: color(display-p3 0.0667 0.0667 0.9412 / 0.009);
      --gray-a2: color(display-p3 0.8 0.8 0.9804 / 0.043);
      --gray-a3: color(display-p3 0.851 0.898 0.9882 / 0.085);
      --gray-a4: color(display-p3 0.8392 0.8706 1 / 0.122);
      --gray-a5: color(display-p3 0.8471 0.8745 1 / 0.156);
      --gray-a6: color(display-p3 0.8784 0.898 1 / 0.194);
      --gray-a7: color(display-p3 0.8745 0.9059 0.9961 / 0.257);
      --gray-a8: color(display-p3 0.8941 0.9059 1 / 0.37);
      --gray-a9: color(display-p3 0.8902 0.9098 1 / 0.433);
      --gray-a10: color(display-p3 0.902 0.9176 1 / 0.488);
      --gray-a11: color(display-p3 0.9451 0.949 1 / 0.719);
      --gray-a12: color(display-p3 0.9922 0.9922 1 / 0.937);

      --gray-contrast: #fff;
      --gray-surface: color(display-p3 0 0 0 / 5%);
      --gray-indicator: oklch(54% 0.0167 277.7);
      --gray-track: oklch(54% 0.0167 277.7);
    }
  }
}`.trim();
