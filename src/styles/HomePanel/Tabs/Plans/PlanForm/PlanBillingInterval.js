import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  subtitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  containerRadios: {
    width: "100%",
    marginTop: "8px",
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
}))

export default useStyles