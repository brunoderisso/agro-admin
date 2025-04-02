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
}))

export default useStyles