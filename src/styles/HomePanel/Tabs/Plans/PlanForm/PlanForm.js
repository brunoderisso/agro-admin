import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: "40px 48px"
  },
  title: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "32px",
    fontWeight: 500,
    lineHeight: "40px",
    letterSpacing: "-0.283px",
  },
  containerCard: {
    padding: "16px 24px 24px 24px",
    marginTop: 16,
  },
  gapIcons: {
    gap: "16px",
    display: "flex",
    flexDirection: "row-reverse",
  },
  btnSuccess: {
    backgroundColor: theme.colors.primary[40],
    "&:hover": {
      backgroundColor: theme.colors.primary[30],
    }
  },
  iconProp: {
    color: theme.colors.onPrimaryContainer,
    fontSize: theme.iconProp.fontSize,
  },
  subtitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  inputAdornment: {
    "& .MuiTypography-root.MuiTypography-body1": {
      color: theme.colors.onPrimaryContainer,
    },
  },
  itemLabelFilter: {
    paddingLeft: 0,
    paddingRight: 0,
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  textForm: {
    color: theme.colors.onPrimaryContainer,
    fontSize: 14,
    lineHeight: "20.02px",
    letterSpacing: 0.15
  },
  wrapperLabelSelectFilter: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 8,
    paddingRight: 16,
    gap: 8,
    "&:hover": {
      backgroundColor: theme.colors.neutral[95],
    },
  },
  generalText: {
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
    color: theme.colors.onPrimaryContainer,
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
  wrapperLabels: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap"
  },
  screenCenter: {
    position: "fixed",
    top: "50vh",
    left: "50vw"
  },
  modalRadio: {
    justifyContent: "center",
    width: "calc(50% - 5px)",
    "& .MuiTypography-root.MuiTypography-body1": {
      color: theme.colors.onPrimaryContainer,
      fontSize: 14,
      lineHeight: "20.02px",
      letterSpacing: 0.15
    }
  },
  containerDrawer: {
    "& .MuiDrawer-paper": {
      backgroundColor: theme.colors.background,
      top: "64px",
      borderTopRightRadius: "8px",
      borderTopLeftRadius: "8px",
      display: "inline-flex",
      width: "400px",
      padding: "24px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "16px"
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "transparent"
    }
  },
  containerHeader: {
    width: "57%",
    display: "flex",
    justifyContent: "space-between"
  }
}))

export default useStyles