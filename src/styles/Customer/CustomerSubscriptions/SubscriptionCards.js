import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
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