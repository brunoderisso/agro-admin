import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  containerFlexPages: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "flex-end"
  },
  titleDrawer: {
    fontFamily: "Poppins",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "32.016px",
    color: theme.colors.onPrimaryContainer
  },
  muiBoxHeader: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.colors.background,
    "& #appBarId": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      boxShadow: "none",
      backgroundColor: theme.colors.background + " !important",
      "& .MuiTabs-root": {
        backgroundColor: theme.colors.background,
        minHeight: "20px",
        height: "36px",
        alignItems: "center"
      }
    }
  },
  category: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px"
  },
}))

export default useStyles