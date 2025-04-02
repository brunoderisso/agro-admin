import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  wrapperCard: {
    width: "100%",
    padding: "24px",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "40px",
    marginBottom: 24
  },
  wrapperPagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  commonText: {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
  textTable: {
    color: theme.colors.onPrimaryContainer,
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
  titleTable: {
    fontSize: "14px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  }
}))

export default useStyles