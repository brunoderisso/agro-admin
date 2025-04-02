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
  titleTable: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "12px",
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
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
}))

export default useStyles