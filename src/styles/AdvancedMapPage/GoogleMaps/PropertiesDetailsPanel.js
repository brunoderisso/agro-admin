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
  subTitleManag: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px",
    "& div": {
      display: "flex",
      alignItems: "center",
      padding: "4px",
      "& span": {
        display: "flex",
        alignItems: "center",
        padding: "3px",
        marginTop: "4px"
      }
    }
  },
  subTitleManagDev: {
    padding: "6px",
    "& p": {
      fontFamily: "Poppins",
      fontSize: "12px",
      fontWeight: 400,
      lineGeight: "20px",
      letterSpacing: " 0.4px",
      textAlign: "left",
      color: theme.colors.outline,
      lineHeight: 2.5
    }
  },
  subTitleManagAnnot: {
    display: "flex",
    alignItems: "center",
  },
}))

export default useStyles