import { makeStyles } from 'tss-react/mui'

import sizes from "../../Utils/SizesWindow"

const useStyles = makeStyles()((theme) => ({
  containerNotFound: {
    backgroundColor: theme.colors.predizadark,
    height: "calc(100vh - 64px)",
    width: "100vw",
    padding: "calc(50vh - 64px)",
    [theme.breakpoints.down(sizes.xs)]: {
      height: "100vh",
    },
    textAlign: "center",
  },
  codeError: {
    fontSize: "40px",
    color: "white"
  },
  textError: {
    fontSize: "12px",
    color: "white"
  },
}))

export default useStyles