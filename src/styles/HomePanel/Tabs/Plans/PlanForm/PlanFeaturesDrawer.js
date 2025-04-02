import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  boxContMaxWidth: {
    maxWidth: "352px"
  },
  containerFlexPages: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between"
  },
  mainColor: {
    color: theme.colors.onPrimaryContainer
  },
  title: {
    fontWeight: 600
  },
  loaderConfig: {
    marginTop: "50px"
  },
  muiAccordion: {
    "& #additional-actions1-header": {
      padding: 0,
      minHeight: "42px"
    },
    boxShadow: "none",
    backgroundColor: theme.colors.background,
    "& .MuiIconButton-edgeEnd": {
      marginRight: 0,
      color: theme.colors.onPrimaryContainer
    },
    "& .MuiAccordionDetails-root": {
      padding: "0 16px 8px 16px"
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
  listFeatures: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  inputAdornment: {
    backgroundColor: theme.colors.background,
    "& .MuiInputAdornment-root": {
      paddingLeft: "0px !important",
      "& .MuiTypography-root.MuiTypography-body1": {
        fontSize: "12px",
        lineHeight: "20px",
        letterSpacing: "0.4px",
        color: theme.colors.onPrimaryContainer,
      }
    },
    "& input.MuiInputBase-input": {
      padding: "4px 0 5px"
    }
  },
}))

export default useStyles