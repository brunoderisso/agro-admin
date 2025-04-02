import { createTheme } from "@mui/material/styles"
import { blue } from "@mui/material/colors"


const theme = createTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontFamily: [
      "Poppins",
      "sans-serif",
    ].join(","),
  },
  widgetCard: {
    width: "100%",
    maxWidth: "100%",
  },
  widgetTitle: {
    fontSize: 14,
  },
  widgetPos: {
    marginBottom: "3vh",
  },
  iconProp: {
    fontSize: 18,
  },
  colors: {
    predizadark: "#1455BE",
    predizaregular: "#4285F4",
    google: "#1a8bf6",
    microsoft: "#2f2f2f",
    yahoo: "#720d9e",
    primary: {
      20: "#002A78",
      30: "#003EA8",
      40: "#0053DB",
      95: "#EEF0FF"
    },
    secondary: "#3C6A00",
    outline: "#757680",
    tertiary: "#AA00A4",
    error: {
      40: "#BA1A1A",
      50: "#D32F2F",
      95: "#FFF0EE",
    },
    inactive: "#C5C6D0",
    onPrimary: "#FFFFFF",
    onPrimaryContainer: "#00174B",
    onPrimaryContainerTransparent: {
      60: "#00174B99",
      90: "#00174BE5"
    },
    primaryContainer: "#DBE1FF",
    onSurfaceVariant: "#45464F",
    background: "#FEFBFF",
    onSurface: "#1B1B1F",
    disabledBackground: "#E2E2EC",
    backgroundTooltip: "#00174B80",
    warning: "#FFDAD6",
    onErrorContainer: "#410002",
    opaqueBlue: "#2B87F9",
    neutral: {
      90: "#E4E2E6",
      95: "#F2F0F4"
    }
  },
  stepper: {
    iconColor: "red"
  }
})

export default theme
