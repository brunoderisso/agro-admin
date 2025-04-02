import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  rowTable: {
    height: '64px'
  },
  textTable: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
    color: theme.colors.onPrimaryContainer,
  },
}))

export default useStyles