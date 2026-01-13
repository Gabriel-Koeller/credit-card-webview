/**
 * @fileoverview Tipagens do tema da aplicação
 */

export interface ThemeColors {
  readonly primary: string;
  readonly primaryLight: string;
  readonly primaryDark: string;
  readonly secondary: string;
  readonly secondaryLight: string;
  readonly secondaryDark: string;
  readonly success: string;
  readonly successLight: string;
  readonly warning: string;
  readonly warningLight: string;
  readonly error: string;
  readonly errorLight: string;
  readonly background: string;
  readonly backgroundSecondary: string;
  readonly surface: string;
  readonly surfaceElevated: string;
  readonly text: string;
  readonly textSecondary: string;
  readonly textMuted: string;
  readonly border: string;
  readonly borderLight: string;
  readonly overlay: string;
}

export interface ThemeSpacing {
  readonly xxs: string;
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
  readonly xxl: string;
  readonly xxxl: string;
}

export interface ThemeTypography {
  readonly fontFamily: string;
  readonly fontFamilyMono: string;
  readonly fontSize: {
    readonly xs: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
    readonly xxl: string;
    readonly xxxl: string;
  };
  readonly fontWeight: {
    readonly regular: number;
    readonly medium: number;
    readonly semibold: number;
    readonly bold: number;
  };
  readonly lineHeight: {
    readonly tight: number;
    readonly normal: number;
    readonly relaxed: number;
  };
}

export interface ThemeBorderRadius {
  readonly none: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
  readonly full: string;
}

export interface ThemeShadows {
  readonly none: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
  readonly card: string;
}

export interface ThemeBreakpoints {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
}

export interface ThemeTransitions {
  readonly fast: string;
  readonly normal: string;
  readonly slow: string;
}

export interface ThemeZIndex {
  readonly base: number;
  readonly dropdown: number;
  readonly sticky: number;
  readonly fixed: number;
  readonly modalBackdrop: number;
  readonly modal: number;
  readonly popover: number;
  readonly tooltip: number;
}

export interface Theme {
  readonly colors: ThemeColors;
  readonly spacing: ThemeSpacing;
  readonly typography: ThemeTypography;
  readonly borderRadius: ThemeBorderRadius;
  readonly shadows: ThemeShadows;
  readonly breakpoints: ThemeBreakpoints;
  readonly transitions: ThemeTransitions;
  readonly zIndex: ThemeZIndex;
}
