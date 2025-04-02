import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  wrapperCard: {
    width: "100%",
    padding: "24px",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "24px",
    marginBottom: 24
  },
  btPrimary: {
    gap: "8px",
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  txtBtAdd: {
    color: theme.colors.primary[40],
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },
  titleTable: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "14px",
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  wrapperPagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  textTable: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
  textModal: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "14px",
    lineHeight: "20.02px",
    letterSpacing: "0.15px",
  },
  inputAdornment: {
    "& .MuiTypography-root.MuiTypography-body1": {
      color: theme.colors.onPrimaryContainer,
    },
  },
  errorMessage: {
    color: theme.colors.error[50]
  },
  labelRadio: {
    justifyContent: "center",
    width: "calc(50% - 5px)",
    "& .MuiTypography-root.MuiTypography-body1": {
      color: theme.colors.onPrimaryContainer,
      fontSize: 14,
      lineHeight: "20.02px",
      letterSpacing: 0.15
    }
  },
}))

export default useStyles