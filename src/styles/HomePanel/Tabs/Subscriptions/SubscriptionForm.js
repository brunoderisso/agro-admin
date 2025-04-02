import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  container: {
    margin: 40,
    width: 600,
    gap: 24,
    display: "flex",
    flexDirection: "column"
  },
  header: {
    gap: 24
  },
  title: {
    fontSize: 32,
    lineHeight: "40px",
    letterSpacing: -0.28,
    color: theme.colors.onPrimaryContainer
  },
  buttonContainer: {
    display: "flex",
    marginLeft: "auto",
    gap: 16
  },
  primaryBt: {
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  primaryText: {
    color: theme.colors.primary[40],
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.4,
  },
  successBtn: {
    backgroundColor: theme.colors.primary[40],
    "&:hover": {
      backgroundColor: theme.colors.primary[30],
    }
  },
  wrapperCard: {
    width: "100%",
    padding: "16px 24px 24px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 40
  },
  successTextBtn: {
    color: props => props.disabledCreate ? theme.colors.onSurfaceVariant : theme.colors.onPrimary
  }
}))

export default useStyles