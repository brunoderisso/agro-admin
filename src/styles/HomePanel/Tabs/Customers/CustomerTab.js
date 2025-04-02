import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  tabTitle: {
    fontWeight: 600,
    fontSize: "24px",
    color: theme.colors.onPrimaryContainer,
    paddingTop: 16
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
  itemLabelFilter: {
    paddingLeft: 0,
    paddingRight: 0,
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  textInsideFilter: {
    color: theme.colors.onPrimaryContainer,
    fontSize: 14,
    lineHeight: "20.02px",
    letterSpacing: 0.15
  },
  titleInsideFilter: {
    color: theme.colors.onPrimaryContainer,
    fontSize: 12,
    lineHeight: "32px",
    letterSpacing: 1,
    margin: "8px 16px 0 16px"
  },
}))

export default useStyles