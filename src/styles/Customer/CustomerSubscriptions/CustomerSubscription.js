import { makeStyles } from "tss-react/mui"

const menuWidth = "299px"

const useStyles = makeStyles()((theme) => ({
  tabPanel: {
    padding: "24px 24px 40px 48px",
    maxWidth: "calc(100% - " + menuWidth + ")",
    marginLeft: menuWidth
  },
  warningText: {
    color: theme.colors.onErrorContainer,
    fontSize: 14,
    lineHeight: "20.02px",
    letterSpacing: 0.15,
  },
  link: {
    fontSize: "16px",
    fontWeight: 400,
    color: theme.colors.onPrimaryContainer
  },
  title: {
    fontSize: "32px",
    color: theme.colors.onPrimaryContainer,
    fontWeight: 500
  },
  nextIcon: {
    color: theme.colors.inactive
  },
  warningMessage: {
    margin: "-24px 0 0 -48px",
    padding: "16px 32px 8px 24px",
    width: "calc(100vw - 314px)",
    backgroundColor: theme.colors.warning,
    display: "flex",
    gap: 50,
    "& .MuiSvgIcon-root": {
      fill: theme.colors.error[40],
      width: 40,
      height: 40,
    }
  },
  contentWarning: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  wrapperWarningBtn: {
    display: "flex",
    marginLeft: "auto",
  },
  propBtn: {
    height: 55,
    "&:hover": {
      backgroundColor: theme.colors.primary[95]
    }
  },
  warningTextBtn: {
    color: theme.colors.primary[40],
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.4,
  },
  wrapperBreadcrumb: {
    marginTop: "24px"
  }
}))

export default useStyles