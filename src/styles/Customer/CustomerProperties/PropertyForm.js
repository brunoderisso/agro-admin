import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  margin: {
    marginBottom: "24px"
  },
  iconButton: {
    padding: "6px 0",
    minWidth: "auto",
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  subTitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px"
  },
  iconProp: {
    color: theme.colors.onPrimaryContainer,
    fontSize: theme.iconProp.fontSize,
  },
  contentConfirmIcon: {
    display: "flex",
    gap: "16px",
    flexDirection: "row-reverse",
  }
}))

export default useStyles