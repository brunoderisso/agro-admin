import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  wrapperPaper: {
    marginTop: 64,
    padding: "24px 24px 24px 24px",
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    width: 400,
    height: "calc(100% - 64px)"
  },
  container: {
    gap: 16,
    flexDirection: "column"
  },
  title: {
    fontWeight: 600,
    fontSize: 24,
    color: theme.colors.onPrimaryContainer,
    lineHeight: "32.02px",
    letterSpacing: 0
  },
  buttonContainer: {
    display: "flex",
    gap: 16,
    marginLeft: "auto"
  },
  icon: {
    color: theme.colors.onPrimaryContainer,
  },
  subHeader: {
    display: "flex"
  },
  subtitle: {
    fontSize: 12,
    lineHeight: "32px",
    letterSpacing: 1,
    color: theme.colors.outline,
    alignSelf: "center"
  },
  primaryBt: {
    marginLeft: "auto",
    height: 40,
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  primaryText: {
    color: theme.colors.primary[40],
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.4,
  },
  wrapperBtn: {
    display: "flex",
    marginLeft: "auto",
    gap: 16
  },
  formContainer: {
    gap: 24,
    flexDirection: "column"
  },
  text: {
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: 0.4,
    color: theme.colors.onPrimaryContainer
  }
}))

export default useStyles