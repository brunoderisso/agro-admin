import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
  },
  rootMui: {
    backgroundColor: theme.colors.background,
    "& div": {
      backgroundColor: theme.colors.background,

      padding: 0
    }
  },
  panelMuiAccordion: {
    "& #additional-actions1-header": {
      padding: 0,
      minHeight: "42px"
    },
    boxShadow: "none",
    backgroundColor: theme.colors.onPrimary,
    "& .MuiIconButton-edgeEnd": {
      marginRight: 0,
      color: theme.colors.onPrimaryContainer
    },
    "&::before": {
      display: "none",
      border: "none"
    }
  },
  titleCardDrawer: {
    display: "flex",
    alignItems: "center",
    textTransform: "capitalize",
    fontSize: "12px",
    height: 0,
    lineHeight: "32px",
    letterSpacing: "1px",
    flex: "1 0 0",
    color: theme.colors.outline
  },
  envDevicesCollectors: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    color: theme.colors.onPrimaryContainer,
    "& ul": {
      "& li": {
        fontFamily: "Poppins",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        display: "flex",
        alignItems: "center",
        lineHeight: "20px",
        letterSpacing: "0.4px",
        color: theme.colors.outline
      }
    }
  },
}))

export default useStyles