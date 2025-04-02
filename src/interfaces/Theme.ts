import "@mui/material/styles";

// Tipagem exata do objeto `colors`
interface Colors {
  predizadark: string;
  predizaregular: string;
  google: string;
  microsoft: string;
  yahoo: string;
  primary: {
    20: string;
    30: string;
    40: string;
    95: string;
  };
  secondary: string;
  outline: string;
  tertiary: string;
  error: {
    40: string;
    50: string;
    95: string;
  };
  inactive: string;
  onPrimary: string;
  onPrimaryContainer: string;
  onPrimaryContainerTransparent: {
    60: string;
    90: string;
  };
  primaryContainer: string;
  onSurfaceVariant: string;
  background: string;
  onSurface: string;
  disabledBackground: string;
  backgroundTooltip: string;
  warning: string;
  onErrorContainer: string;
  opaqueBlue: string;
  neutral: {
    90: string;
    95: string;
  };
}

declare module "@mui/material/styles" {
  interface Theme {
    colors: Colors;
    widgetCard: {
      width: string;
      maxWidth: string;
    };
    widgetTitle: {
      fontSize: number;
    };
    widgetPos: {
      marginBottom: string;
    };
    iconProp: {
      fontSize: number;
    };
    stepper: {
      iconColor: string;
    };
  }

  interface ThemeOptions {
    colors?: Partial<Colors>; // Partial permite todos os campos opcionais
    widgetCard?: {
      width: string;
      maxWidth: string;
    };
    widgetTitle?: {
      fontSize: number;
    };
    widgetPos?: {
      marginBottom: string;
    };
    iconProp?: {
      fontSize: number;
    };
    stepper?: {
      iconColor: string;
    };
  }
}
