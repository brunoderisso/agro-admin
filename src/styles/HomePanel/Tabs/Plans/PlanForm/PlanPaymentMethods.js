import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  subtitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  itemLabelFilter: {
    paddingLeft: 0,
    paddingRight: 0,
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  textForm: {
    color: theme.colors.onPrimaryContainer,
    fontSize: 14,
    lineHeight: "20.02px",
    letterSpacing: 0.15
  },
  wrapperLabelSelectFilter: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 8,
    paddingRight: 16,
    gap: 8,
    "&:hover": {
      backgroundColor: theme.colors.neutral[95],
    },
  },
  errorText: {
    color: theme.colors.error[50],
    fontSize: "0.75rem",
    lineHeight: 1.66
  }
}))

export default useStyles