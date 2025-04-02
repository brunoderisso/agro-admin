import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: "24px",
    width: "444px"
  },
  title: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase"
  },
  wrapperTable: {
    margin: "16px 0 32px 0"
  },
  btPrimary: {
    gap: "8px",
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
  },
  textModal: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "14px",
    lineHeight: "20.02px",
    letterSpacing: "0.15px"
  },
  highlightText: {
    fontWeight: 600
  },
  modalInput: {
    marginTop: "24px"
  },
  description: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    marginBottom: "24px"
  }
}))

export default useStyles