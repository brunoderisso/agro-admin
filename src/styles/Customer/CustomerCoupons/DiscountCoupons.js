import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  tabTitle: {
    fontWeight: 600,
    fontSize: "24px",
    color: theme.colors.onPrimaryContainer,
    paddingTop: 16
  },
  wrapperLabelInputFilter: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: "16px 16px 8px 16px",
    "&:hover": {
      backgroundColor: theme.colors.neutral[95],
    },
  },
  titleInsideFilter: {
    color: theme.colors.onPrimaryContainer,
    fontSize: 12,
    lineHeight: "32px",
    letterSpacing: 1,
    margin: "8px 16px 0 16px",
    textTransform: "uppercase"
  },
  inputPlaceholder: {
    "& .MuiInputBase-input": {
      color: theme.colors.inactive,
    }
  },
  wrapperDateFilters: {
    flexDirection: "column"
  },
  wrapperLabelSelectFilter: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 8,
    paddingRight: 16,
    gap: 8,
    "&:hover": {
      backgroundColor: theme.colors.neutral[95],
    },
  },
  fullWidth: {
    width: "100%"
  },
  itemLabelFilter: {
    "&:hover": {
      backgroundColor: "inherit",
    },
    "&.MuiMenuItem-gutters": {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  textInsideFilter: {
    color: theme.colors.onPrimaryContainer,
    fontSize: 14,
    lineHeight: "20.02px",
    letterSpacing: 0.15
  },
  iconProp: {
    color: theme.colors.onPrimaryContainer,
    fontSize: theme.iconProp.fontSize,
  },
}))

export default useStyles