import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  textField: {
    marginTop: "28px",
    marginBottom: "-16px",
    "& div": {
      "& button": {
        color: theme.colors.onPrimaryContainer
      },
      "& fieldset": {
        border: "none"
      }
    }
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
  containerBoxUser: {
    padding: "4px"
  },
  propertyDescriptionEdit: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    color: theme.colors.outline,
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "16px"
  },
  propertyDetail: {
    marginTop: "12px",
    marginBottom: "16px",
    paddingLeft: "4px"
  },
  propertyTitle: {
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
  boxDetailPreference: {
    paddingLeft: "8px",
    width: "100%",
    marginTop: "22px",
    '& .MuiTextField-root': {
      width: "100%",
    },
  },
  propertyInputValue: {
    "& div": {
      "& textarea": {
        flex: "1 0 0",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: "0.4px",
        color: theme.colors.onPrimaryContainer
      }
    }
  },
  boxDetailButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
    "& .MuiButton-text": {
      padding: "6px 14px",
      color: theme.colors.primary[40]
    }
  },
}))

export default useStyles