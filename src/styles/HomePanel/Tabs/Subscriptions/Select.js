import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  text: {
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: 0.4,
    color: theme.colors.onPrimaryContainer
  },
  subheader: {
    padding: 0
  },
}))

export default useStyles