import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  linesStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "150px"
  },
}))

export default useStyles