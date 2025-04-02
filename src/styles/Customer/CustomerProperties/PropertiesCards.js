import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  cardContainer: {
    padding: "24px"
  },
  textCard: {
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
    color: theme.colors.onPrimaryContainer,
  },
  loaderContainer: {
    height: "221px",
    width: "352px",
    display: "flex"
  },
  wrapperPagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
}))

export default useStyles