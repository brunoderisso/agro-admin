import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
  },
  rootMui: {
    backgroundColor: theme.colors.background,
    "& div": {
      backgroundColor: theme.colors.background,
      padding: 0
    }
  },
  panelMuiAccordion: {
    "& #additional-actions1-header": {
      padding: 0,
      minHeight: "42px"
    },
    boxShadow: "none",
    backgroundColor: theme.colors.onPrimary,
    "& .MuiIconButton-edgeEnd": {
      marginRight: 0,
      color: theme.colors.onPrimaryContainer
    },
    "&::before": {
      display: "none",
      border: "none"
    }
  },
  titleStatusSubSumary: {
    "& .Mui-expanded": {
      margin: "6px 0"
    }
  },
  titleCardDrawerSubs: {
    display: "flex",
    marginBottom: "10px",
    alignItems: "center",
    margin: "8px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    height: 0,
    marginTop: "22px",
    flex: "1 0 0",
    "& svg": {
      marginRight: "4px"
    },
    listByStatusSubsInner: {
      marginTop: "200px"
    },
    listByStatusSubs: {
      padding: "0 22px"
    },
    "& span": {
      fontSize: "10px",
      lineHeight: "32px",
      letterSpacing: "1px",
      color: theme.colors.outline,
    }
  },
  containerUserSubscription: {
    marginBottom: "6px",
    "& button": {
      padding: 0,
      paddingBottom: "16px",
      paddingRight: "12px",

    },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "4px",
    width: "100%",
    paddingLeft: 0
  },
  avatarSubscription: {
    maxWidth: "18px",
    maxHeight: "18px",
    fontSize: "small",
    color: theme.colors.onPrimaryContainer,
    backgroundColor: theme.colors.primary[95],
    fontWeight: 500
  },
  userNameSubs: {
    height: "20px",
    alignSelf: "stretch",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "20px",
    textTransform: "capitalize",
    letterSpacing: "0.4px",
    textAlign: "left",
    marginTop: "8px",
    fontStyle: "normal",
    color: theme.colors.onPrimaryContainer
  },
  userRole: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    lineHeight: "2",
    letterSpacing: "0.4px",
    color: theme.colors.outline
  },
  loadRoot: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  titleStatusSub: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Poppins",
    fontStyle: "normal",
    marginBottom: "8px",
    fontWeight: 400,
    fontSize: "12px",
    color: theme.colors.outline,
    textTransform: "capitalize",
    height: 0,
    lineHeight: "32px",
    letterSpacing: "1px",
    flex: "1 0 0",
    "& svg": {
      marginRight: "4px"
    },
    margin: "8px",
    marginTop: "22px",
    listByStatusSubsInner: {
      marginTop: "200px"
    },
    listByStatusSubs: {
      padding: "0 22px"
    },
    "& span": {
      fontSize: "12px",
      lineHeight: "32px",
      letterSpacing: "1px",
      color: theme.colors.outline,
    }
  },
  textCardDrawerSubs: {
    display: "flex",
    fontFamily: "Poppins",
    fontStyle: "normal",
    alignItems: "center",
    fontWeight: 500,
    marginLeft: "6px",
    textTransform: "capitalize",
    fontSize: "12px",
    color: theme.colors.onPrimaryContainer
  },
  boxUserSubscriptionStatus: {
    marginBottom: "6px",
    marginLeft: "-12px",
    marginTop: "6px",
    "& button": {
      padding: 0,
      marginRight: "4px"
    },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: " 4px !important",
    width: "100%",
    paddingLeft: 0
  },
  userNameSubsListStatus: {
    height: "20px",
    alignSelf: "stretch",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "20px",
    textTransform: "capitalize",
    letterSpacing: "0.4px",
    textAlign: "left",
    fontStyle: "normal",
    color: theme.colors.outline
  },
}))

export default useStyles