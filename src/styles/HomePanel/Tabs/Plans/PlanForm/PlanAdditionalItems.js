import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  subtitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  labelRadio: {
    width: "calc(25% - 5px)",
    "& .MuiTypography-root.MuiTypography-body1": {
      color: theme.colors.onPrimaryContainer,
      fontSize: 14,
      lineHeight: "20.02px",
      letterSpacing: 0.15
    }
  },
  inputAdornment: {
    "& .MuiTypography-root.MuiTypography-body1": {
      color: theme.colors.onPrimaryContainer,
    },
  },
  deleteIcon: {
    color: theme.colors.error[50],
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