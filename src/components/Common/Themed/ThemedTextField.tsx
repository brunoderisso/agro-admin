import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"


const ThemedTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.colors.onPrimary,
  "& .MuiOutlinedInput-root": {
    height: 39,
    "& input": {
      fontSize: "12px",
      color: theme.colors.onPrimaryContainer,
      fontWeight: 400
    },
    "&:hover fieldset": {
      borderColor: theme.colors.primary[40],
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.colors.primary[40],
    },
    "& .MuiSelect-outlined": {
      fontSize: "12px",
      lineHeight: "20px",
      letterSpacing: "0.4px",
      color: theme.colors.onPrimaryContainer,
    }
  },
  "& label.Mui-focused": {
    color: theme.colors.primary[40],
  },
  "& .MuiInput-underline": {
    "& input": {
      padding: "12px 16px 8px 0",
      fontSize: "12px",
      lineHeight: "20px",
      letterSpacing: "0.4px",
      color: theme.colors.onPrimaryContainer,
    },
    "&:before": {
      borderBottomColor: theme.colors.inactive,
    },
    "&:hover:before": {
      borderBottomColor: theme.colors.primary[40] + "!important",
      borderBottomWidth: "1px !important"
    },
    "&:after": {
      borderBottomColor: theme.colors.primary[40],
    },
    "& .MuiInputAdornment-positionStart": {
      paddingLeft: 16
    }
  },
}))

export default ThemedTextField