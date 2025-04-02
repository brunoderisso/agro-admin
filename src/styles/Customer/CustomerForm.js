import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  cardContainer: {
    padding: "24px",
    maxWidth: "600px"
  },
  iconColor: {
    color: theme.colors.onPrimaryContainer,
    fontSize: theme.iconProp.fontSize,
  },
  editIcon: {
    color: theme.colors.primary[40],
    fontSize: theme.iconProp.fontSize,
  },
  iconButton: {
    padding: "6px 0",
    minWidth: "auto",
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  labels: {
    color: theme.colors.outline,
  },
  commonText: {
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
  contentText: {
    color: theme.colors.onPrimaryContainer,
  },
  highlightText: {
    color: theme.colors.primary[40],
  }
}))

export default useStyles