import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  cardContainer: {
    padding: "24px",
    width: "444px",
  },
  btPrimary: {
    "& span": {
      gap: "8px"
    },
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  txtBtAdd: {
    color: theme.colors.primary[40],
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    marginLeft: "8px"
  },
}))

export default useStyles