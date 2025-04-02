import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  labelFilter: {
    display: "flex",
    padding: "4px 16px",
    alignItems: "center",
    gap: 8,
    borderRadius: 24,
    backgroundColor: theme.colors.outline
  },
  textLabelFilter: {
    color: theme.colors.onPrimary,
    textAlign: "center",
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: 0.4
  },
  boldTextLabelFilter: {
    color: theme.colors.onPrimary,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.4,
    textTransform: "uppercase"
  },
  iconButton: {
    padding: 0,
    minWidth: "auto",
  },
  iconProp: {
    color: theme.colors.onPrimary
  },
}))

export default useStyles