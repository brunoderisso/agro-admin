import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  containerCard: {
    padding: "16px 24px 24px 24px",
    marginTop: 16,
  },
  subtitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  tableCellProp: {
    padding: "16px 16px 16px 0"
  },
  valueText: {
    color: theme.colors.onPrimaryContainer
  },
  nameText: {
    color: theme.colors.outline
  },
  highlightText: {
    fontWeight: 500,
    color: theme.colors.onPrimaryContainer
  },
  highlightValue: {
    fontWeight: 500,
    color: theme.colors.primary[40]
  },
  paddingCell: {
    "&.MuiTableCell-root": {
      padding: "8px 16px"
    }
  },
  lastRow: {
    backgroundColor: theme.colors.primary[95],
    "& td, & th": { borderBottom: "none" }
  }
}))

export default useStyles