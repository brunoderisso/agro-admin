import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.colors.onPrimary,
    borderRadius: "8px",
    width: "444px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  container: {
    padding: "40px 40px 24px 40px"
  },
  actionButton: {
    color: theme.colors.primary[40],
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    }
  },
  title: {
    fontWeight: 500,
    color: theme.colors.onPrimaryContainer,
    fontSize: "32px",
    lineHeight: "40px",
    letterSpacing: "-0.283px",
  },
  wrapperHeader: {
    flexDirection: "column",
    gap: 8,
  },
  wrapperContent: {
    flexDirection: "column",
    gap: 16,
  },
  subtitle: {
    color: theme.colors.outline,
    fontSize: "14px",
    lineHeight: "20.02px",
    letterSpacing: "0.15px",
  },
  avatar: {
    "& .MuiAvatar-root": {
      color: theme.colors.onPrimaryContainer,
      fontSize: "32px",
      fontWeight: 500,
      lineHeight: "64px",
      letterSpacing: "1.25px",
      backgroundColor: theme.colors.primaryContainer,
      height: 80,
      width: 80
    }
  },
  textLabel: {
    color: theme.colors.outline,
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
  },
  textData: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
  },
  btOptions: {
    color: theme.colors.onPrimaryContainer,
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
      color: theme.colors.onPrimaryContainer,
    },
  },
  icons: {
    width: 18,
    height: 18
  }
}))

export default useStyles