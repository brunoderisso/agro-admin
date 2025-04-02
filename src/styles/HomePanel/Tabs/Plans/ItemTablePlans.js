import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  commonText: {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.4px",
  },
  textTable: {
    color: theme.colors.onPrimaryContainer,
  },
  inactiveText: {
    color: theme.colors.outline,
  },
  btOptions: {
    color: theme.colors.onPrimaryContainer,
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
      color: theme.colors.onPrimaryContainer,
    },
  },
  textItemMenu: {
    fontSize: "14px",
    lineHeight: "20.02px",
    letterSpacing: "0.15px",
    color: theme.colors.onPrimaryContainer
  },
  pixIcon: {
    width: 19,
    height: 19
  },
  cardIcon: {
    width: 20,
    height: 20
  },
  barCodeOutline: {
    "& g": {
      "& g": {
        "& path": {
          fill: theme.colors.outline
        }
      }
    }
  }
}))

export default useStyles