import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  titleTable: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "14px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  wrapperCard: {
    width: "100%",
    padding: "24px",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "24px",
    marginBottom: 24
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
  textTable: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
  wrapperPagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  textItemMenu: {
    fontSize: "14px",
    lineHeight: "20.02px",
    letterSpacing: "0.15px",
    color: theme.colors.onPrimaryContainer
  },
  contentWarningText: {
    marginTop: "16px",
  },
  iconWarning: {
    color: theme.colors.error[40]
  },
  warningText: {
    color: theme.colors.outline,
    fontSize: "12px",
    lineHeight: "24px",
    letterSpacing: "0.4px"
  },
}))

export default useStyles