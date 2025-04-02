import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  subtitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  wrapperLabels: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap"
  },
  generalText: {
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
    color: theme.colors.onPrimaryContainer,
  },
  containerCouponBtn: {
    gap: "8px",
    paddingBottom: "16px",
    marginTop: "16px"
  },
  btPrimary: {
    gap: "8px",
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
    "& svg": {
      fontSize: theme.iconProp.fontSize,
      "& path": {
        fill: theme.colors.primary[40]
      }
    }
  },
  textBtn: {
    color: theme.colors.primary[40],
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },
}))

export default useStyles