import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  prospectStyle: {
    marginTop: "24px",
    "& div": {
      "& p": {
        display: "flex",
        flexWrap: "wrap"
      }
    }
  },
  prospectBox: {
    display: "flex",
    width: " 50%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px",
    fontSize: "12px",
  },
  prospectValue: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "0.1px",
    color: theme.colors.onPrimaryContainer
  },
  totalValue: {
    display: "flex",
    width: "90px",
    justifyContent: "space-between",
    padding: "10px",
    "& #totalReduce": {
      fontFamily: "Poppins",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: "0.1px",
      display: "flex",
      justifyContent: "space-between",
      color: theme.colors.onPrimaryContainer
    }
  },
}))

export default useStyles