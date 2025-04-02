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
    fontFamily: "Poppins",
    fontStyle: "normal",
    alignItems: "center",
    fontWeight: 400,
    textTransform: "capitalize",
    fontSize: "12px",
    height: 0,
    lineHeight: "32px",
    letterSpacing: "1px",
    flex: "1 0 0",
    color: theme.colors.outline
  },
}))

export default useStyles