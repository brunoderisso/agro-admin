import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  wrapperCard: {
    padding: "24px",
    width: "400px",
    display: "flex",
    gap: "16px",
    flexDirection: "column"
  },
  commonText: {
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
  labels: {
    color: theme.colors.outline,
  },
  contentText: {
    color: theme.colors.onPrimaryContainer,
  },
  errorMessage: {
    color: theme.colors.error[50]
  },
  btnSuccess: {
    backgroundColor: theme.colors.primary[40],
    "&:hover": {
      backgroundColor: theme.colors.primary[30],
    }
  },
  textSuccess: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.4px",
  },
  loader: {
    width: "25px !important",
    height: "25px !important",
  }
}))

export default useStyles