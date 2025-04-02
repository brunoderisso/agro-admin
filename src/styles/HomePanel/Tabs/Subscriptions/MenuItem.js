import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: "8px 16px",
    display: "flex",
    gap: 16
  },
  avatar: {
    width: "36px",
    height: "36px",
    backgroundColor: theme.colors.primary[95]
  },
  avatarText: {
    color: theme.colors.onPrimaryContainer,
  },
  text: {
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: 0.4,
    color: theme.colors.onPrimaryContainer,
  },
  outlineText: {
    fontSize: 10,
    lineHeight: "16px",
    letterSpacing: 0.4,
    color: theme.colors.outline,
  },
  containerText: {
    display: "flex",
    flexDirection: "column"
  },
  selectedItem: {
    "&.MuiMenuItem-root": {
      backgroundColor: theme.colors.primaryContainer
    }
  },
  icon: {
    color: theme.colors.primary[40]
  },
  iconButton: {
    marginLeft: "auto"
  },
  mediumText: {
    fontSize: 14,
    lineHeight: "20.02px",
    letterSpacing: 0.15,
    color: theme.colors.onPrimaryContainer,
  },
  mediumOutlineText: {
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: 0.4,
    color: theme.colors.outline,
  },
}))

export default useStyles