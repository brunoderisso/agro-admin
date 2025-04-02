import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  cardContainer: {
    padding: "24px"
  },
  planName: {
    fontSize: "16px",
    color: theme.colors.onPrimaryContainer,
    fontWeight: 600,
    lineHeight: "32px",
    letterSpacing: "0.15px",
  },
  planValue: {
    fontSize: "16px",
    fontWeight: 400,
    color: theme.colors.onPrimaryContainer
  },
  planPeriod: {
    fontSize: "12px",
    fontWeight: 400,
    color: theme.colors.outline
  },
  text: {
    fontSize: "12px",
    fontWeight: 400,
    color: theme.colors.onPrimaryContainer
  },
  subtitle: {
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  value: {
    fontSize: "12px",
    color: theme.colors.onPrimaryContainer
  },
  iconColor: {
    color: theme.colors.onPrimaryContainer,
    fontSize: theme.iconProp.fontSize,
  },
  total: {
    fontSize: "24px",
    fontWeight: 600,
    color: theme.colors.onPrimaryContainer
  },
  suspendButton: {
    color: theme.colors.error[40],
    borderColor: theme.colors.error[40],
    height: "40px",
    width: "calc(25% - 4px)",
    "&:hover": {
      backgroundColor: theme.colors.error[95],
    }
  },
  mainButton: {
    color: theme.colors.primary[40],
    borderColor: theme.colors.primary[40],
    fontSize: "14px",
    fontWeight: 500,
    height: "40px",
    width: "calc(75% - 4px)"
  },
  changeButton: {
    color: theme.colors.primary[40],
    borderColor: theme.colors.primary[40],
    fontSize: "14px",
    fontWeight: 500,
  },
  statusT: {
    fontSize: "12px",
    color: theme.colors.secondary,
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
  statusF: {
    fontSize: "12px",
    color: theme.colors.error[40],
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
  textBold: {
    fontSize: "12px",
    fontWeight: 600,
    color: theme.colors.onPrimaryContainer
  },
  iconButton: {
    padding: "6px 0",
    minWidth: "auto",
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  couponCell: {
    minWidth: "300px",
    paddingLeft: "24px",
    paddingRight: "8px"
  },
  textButton: {
    fontSize: "12px",
    fontWeight: 500,
    color: theme.colors.primary[40],
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
}))

export default useStyles