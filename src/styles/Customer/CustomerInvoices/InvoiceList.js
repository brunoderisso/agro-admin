import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: "16px"
  },
  textCard: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
    color: theme.colors.onPrimaryContainer,
  },
  tableContainer: {
    padding: theme.spacing(3)
  },
  wrapperPagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  btOptions: {
    color: theme.colors.onPrimaryContainer,
    '&:hover': {
      backgroundColor: theme.colors.primary[95],
      color: theme.colors.onPrimaryContainer,
    },
  },
  textItemMenu: {
    fontSize: '14px',
    lineHeight: '20.02px',
    letterSpacing: '0.15px',
    color: theme.colors.onPrimaryContainer
  },
}))

export default useStyles