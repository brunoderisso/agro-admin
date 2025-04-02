import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme, props) => ({
  container: {
    gap: 8
  },
  title: {
    fontSize: 12,
    lineHeight: "32px",
    letterSpacing: 1,
    color: theme.colors.onPrimaryContainer
  },
  header: {
    gap: 8,
    alignItems: "center"
  },
  primaryBtn: {
    marginLeft: "auto",
    height: 40,
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  addTextBtn: {
    color: props.disableAddBt ? theme.colors.outline : theme.colors.primary[40],
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    marginLeft: "8px"
  },
  disabledButton: {
    "& g > path": {
      fill: theme.colors.outline
    }
  }
}))

export default useStyles