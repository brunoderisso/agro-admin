import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  thumb: {
    background: theme.colors.inactive,
    borderRadius: "2em",
  },
}))

export default useStyles