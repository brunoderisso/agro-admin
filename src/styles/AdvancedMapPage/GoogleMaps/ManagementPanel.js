import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  titleDrawer: {
    fontFamily: "Poppins",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "32.016px",
    color: theme.colors.onPrimaryContainer
  },
  autocomplete: {
    "& .MuiInput-underline:after": {
      display: "none"

    },
    "& .MuiAutocomplete-clearIndicator::after": {
      content: "none",
      display: "none"
    },
    marginBottom: "21px",
  },
  areaButton: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    color: theme.colors.primary[40],
  },
  tabPanel: {
    paddingBottom: "100px"
  },
  containerFlexPages: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between"
  },
  iconButton: {
    padding: 0,
    minWidth: "auto",
  },
  iconProp: {
    color: theme.colors.onPrimary
  },
  boldTextLabelFilter: {
    color: theme.colors.onPrimary,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.4,
    textTransform: "uppercase"
  },
  itemLabelFilter: {
    "&:hover": {
      backgroundColor: "inherit",
    },
    "&.MuiListItem-gutters": {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  textLabelFilter: {
    color: theme.colors.onPrimary,
    textAlign: "center",
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: 0.4
  },
  labelFilter: {
    display: "flex",
    padding: "4px 16px",
    alignItems: "center",
    margin: "2px",
    gap: 8,
    borderRadius: 24,
    backgroundColor: theme.colors.outline
  },
  containerFilter: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px"
  },
  titleMarket: {
    color: theme.colors.onPrimaryContainer,
    paddingLeft: "6px",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },
  containerFilterMarket: {
    display: "flex",
    padding: "6px"
  },
  containerFilterCheckBoxFlex: {
    display: "flex",
    padding: "6px",
    justifyContent: "space-between"
  },
  titleBoxAllLocations: {
    display: "flex",
    alignItems: "center"
  },
  containerFilterCheckBox: {
    "& span": {
      fontFamily: "Poppins",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "0.4px",
      textAlign: "left",
      color: theme.colors.onPrimaryContainer
    },
    "& .css-dcuyt8-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-dcuyt8-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate": {
      color: theme.colors.onPrimaryContainer
    }
  },
  thumb: {
    background: "#AEAEAE",
    borderRadius: "2em",
  },
  scrollList: {
    "& > div": {
      display: "flex"
    }
  },
  root: {
    "& .MuiAccordion-root:before": {
      opacity: 0
    },
    "& div": {
      padding: 0
    },
    width: "100%"
  },
  selectInputForm: {
    "& fieldset": {
      border: "none"
    }
  },
  selectInputListSubheader: {
    height: "32px",
    background: theme.colors.background,
    "& div": {
      "& div": {
        "& fieldset": {
          border: "none"
        }
      }
    }
  },
  hrStyle: {
    borderTop: "1px solid #C5C6D0"
  },
  selectInput: {
    color: theme.colors.primary[40],
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0.4px",
    textAlign: "center",
    "& .MuiSelect-icon": {
      display: "none"
    },
    "&::before": {
      display: "none"
    },
    "&::after": {
      display: "none"
    }
  },
  textFieldSearch: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "20px",
    letterSpacing: "0.4px",
    textAlign: "left",
    width: "240px",
    "& div": {
      paddingRight: 0,
      "& input": {
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: "0.4px",
        textAlign: "left",
      },
      "& MuiInputAdornment-root": {
        marginLeft: "24px"
      }
    }
  },
  containerForm: {
    marginTop: "12px"
  }
}))

export default useStyles