import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  content: {
    color: theme.colors.onPrimaryContainer
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
  textEditActive: {
    "& div": {
      marginLeft: "6px",
      width: "100%",
      "& div": {
        "& fieldset": {
          border: "none",
          borderBottom: "solid 1px #C5C6D0"
        },
        "& input": {
          padding: "14.5px 14px"
        }
      }
    }
  },
  containerBoxUser: {
    padding: "4px"
  },
  propertyTitleActivateDetail: {
    flex: "1 0 0",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    color: theme.colors.onPrimaryContainer,
    display: "flex",
    alignItems: "center",
    paddingLeft: "12px",
    marginTop: "12px"
  },
  propertyDetail: {
    marginTop: "12px",
    marginBottom: "16px",
    paddingLeft: "4px"
  },
  boxDetailPreferenceEdit: {
    "& div": {
      marginTop: "12px",
      width: "100%",
      "& label": {
        marginTop: "12px",
      },
      "& div": {
        "& input": {
          padding: "14.5px 14px",
          fontFamily: "Poppins",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "20px",
          letterSpacing: "0.4px",
          color: theme.colors.onPrimaryContainer
        }
      }
    }
  },
  boxDetailButtonLeft: {
    display: "flex",
    marginTop: "16px",
    "& .MuiButton-text": {
      padding: "6px 14px",
      color: theme.colors.primary[40]
    }
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