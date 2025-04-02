import { FormControl } from "@mui/material"
import { styled } from "@mui/material/styles"


const ThemedSelectFormControl = styled(FormControl)(({ theme }) => ({
  "& label.MuiFormLabel-root": {
    fontSize: "12px"
  },
  "& label.MuiFormLabel-root.MuiInputLabel-shrink": {
    top: 0,
    fontSize: "16px",
    backgroundColor: theme.colors.onPrimary,
  },
  "& label.Mui-focused": {
    color: theme.colors.primary[40],
    top: 0,
    fontSize: "16px"
  },
  "& label.MuiFormLabel-filled": {
    fontSize: "1rem"
  },
  "& .MuiInputBase-root": {
    height: 39,
    backgroundColor: theme.colors.onPrimary,
    "& .MuiInputBase-input": {
      color: theme.colors.onPrimaryContainer
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.colors.primary[40],
    },
    "& .MuiSelect-icon": {
      right: 12,
      top: "calc(50% - 8px)",
      width: 18,
      height: 18
    }
  },
  "& div.MuiSelect-select": {
    fontSize: "12px"
  },
}))

export default ThemedSelectFormControl