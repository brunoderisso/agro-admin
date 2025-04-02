import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  subtitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  btnSuccess: {
    marginTop: "8px",
    backgroundColor: theme.colors.primary[40],
    "&:hover": {
      backgroundColor: theme.colors.primary[30],
    }
  },
  errorText: {
    color: theme.colors.error[50],
    fontSize: "0.75rem",
    lineHeight: 1.66
  },
}))

export default useStyles