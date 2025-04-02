import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  commonText: {
    fontSize: "12px",
    color: theme.colors.onPrimaryContainer
  },
  titleText: {
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  colorButton: {
    color: theme.colors.primary[40]
  },
  textOutline: {
    color: theme.colors.outline
  },
  iconButton: {
    padding: "6px 0",
    minWidth: "auto",
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  btnContainer: {
    display: "flex",
    gap: "16px"
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
  boldText: {
    fontWeight: 600
  }
}))

export default useStyles