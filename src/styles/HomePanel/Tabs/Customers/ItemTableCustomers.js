import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  textItemMenu: {
    fontSize: '14px',
    lineHeight: '20.02px',
    letterSpacing: '0.15px',
    color: theme.colors.onPrimaryContainer
  },
  commonText: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
  },
  textTable: {
    color: theme.colors.onPrimaryContainer,
  },
  btOptions: {
    color: theme.colors.onPrimaryContainer,
    '&:hover': {
      backgroundColor: theme.colors.primary[95],
      color: theme.colors.onPrimaryContainer,
    },
  },
  truncateText: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
}))

export default useStyles