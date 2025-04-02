import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  prospectStyle: {
    marginTop: "24px",
    padding: "4px"
  },
  root: {
    "& .MuiAccordion-root:before": {
      opacity: 0
    },
    "& div": {
      padding: 0
    },
    width: '100%'
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
  titleCardDrawer: {
    display: "flex",
    fontFamily: "Poppins",
    fontStyle: "normal",
    alignItems: "center",
    fontWeight: 400,
    textTransform: "capitalize",
    fontSize: "12px",
    height: 0,
    lineHeight: "32px",
    letterSpacing: "1px",
    flex: "1 0 0",
    color: theme.colors.outline
  },
  listEnvironment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  usersList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    cursor: "pointer"
  },
  containerUser: {
    "& button": {
      padding: 0,
      paddingBottom: "16px",
      paddingRight: "12px",
      paddingTop: "9px",
    },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "4px",
    width: "100%",
    paddingLeft: 0
  },
  avatar: {
    color: theme.colors.onPrimaryContainer,
    backgroundColor: theme.colors.primary[95],
    fontWeight: 500
  },
  userName: {
    height: "20px",
    alignSelf: "stretch",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20.02px",
    letterSpacing: "0.15px",
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
  areaButton: {
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    color: theme.colors.primary[40],
    padding: 0,
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingRight: "8px"
  },
  propertyPreference: {
    display: "flex",
    flexWrap: "wrap",
  },
  boxPreference: {
    width: "49.5%",
    marginTop: "16px"
  },
  propertyTitle1: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    color: theme.colors.outline,
  },
  propertyTitle2: {
    flex: "1 0 0",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    color: theme.colors.onPrimaryContainer,
    display: "flex",
    alignItems: "center"
  },
  annotationContainer: {
    marginTop: "16px"
  },
  annotationDate: {
    color: theme.colors.primary[30]
  },
  subAnnotationDate: {
    color: theme.colors.outline,
    fontSize: "10px"
  },
  annotation: {
    fontSize: "12px",
    color: theme.colors.onPrimaryContainer
  },
  prospectStyleMarket: {
    marginTop: "18px",
    padding: "4px"
  },
  boxPreferenceFirst: {
    width: "100%",
    marginTop: "16px"
  },
  listEnvironmentBox: {
    padding: 0
  },
}))

export default useStyles