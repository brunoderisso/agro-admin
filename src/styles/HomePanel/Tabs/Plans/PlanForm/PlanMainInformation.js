import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  subtitle: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  inputAdornment: {
    "& .MuiTypography-root.MuiTypography-body1": {
      color: theme.colors.onPrimaryContainer,
    },
  },
  inputs: {
    backgroundColor: theme.colors.onPrimary,
    height: 39,
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.colors.primary[40],
      },
      "&:hover fieldset": {
        borderColor: theme.colors.primary[40],
      },
    },
    "& .MuiInputBase-input": {
      fontSize: 12,
      lineHeight: "20px",
      letterSpacing: 0.4,
      color: theme.colors.onPrimaryContainer,
    },
    "& label.Mui-focused": {
      color: theme.colors.primary[40],
    },
  },
}))

export default useStyles