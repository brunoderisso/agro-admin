import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
    background: "#FEFBFF"
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
  containerUserSubsImg: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2px 40px !important",
    marginLeft: "-12px"
  },
  subTitleManagAnnot: {
    display: "flex",
    alignItems: "center",
  },
  userPicture: {
    width: "18px",
    height: "18px",
    marginTop: "8px",
    marginRight: "6px"
  },
  defaultAvatar: {
    backgroundColor: "#bdbdbd !important",
    fontSize: "9px"
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
}))

export default useStyles