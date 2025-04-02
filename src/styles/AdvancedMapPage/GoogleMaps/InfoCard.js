import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "inline-block",
    padding: "4px 8px",
    backgroundColor: theme.colors.backgroundTooltip,
    transform: `translate(-50%, 20%)`
  },
  text: {
    color: theme.colors.onPrimary
  }
}))

export default useStyles