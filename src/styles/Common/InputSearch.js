import { makeStyles } from "tss-react/mui"


const useStyles = makeStyles()((theme) => ({
    selectInputForm: {
        '& fieldset': {
            border: "none"
        }
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
    textFieldSearch: {
        fontFamily: "Poppins",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "20px",
        letterSpacing: "0.4px",
        textAlign: "left",
        "& div": {
            paddingRight: 0,
            "& input": {
                fontFamily: "Poppins",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0.4px",
                textAlign: "left",
                paddingLeft: 0
            },
            "& MuiInputAdornment-root": {
                marginLeft: "24px"
            }
        }
    },
    hrStyle: {
        borderTop: "1px solid #C5C6D0"
      },
}))

export default useStyles