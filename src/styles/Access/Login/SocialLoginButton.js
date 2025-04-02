import { makeStyles } from 'tss-react/mui'

import sizes from "../../Utils/SizesWindow"

const useStyles = makeStyles()((theme) => ({
  containerMicrosoft: {
    margin: "1px",
    alignItems: "center",
    backgroundColor: theme.colors.microsoft,
    borderRadius: "1vw",
    padding: "1px 10px",
  },
  containerPrediza: {
    margin: "1px",
    alignItems: "center",
    backgroundColor: theme.colors.predizadark,
    borderRadius: "1vw",
    padding: "1px 10px",
  },
  containerGoogle: {
    margin: "1px",
    alignItems: "center",
    backgroundColor: theme.colors.google,
    borderRadius: "1vw",
    padding: "1px 10px",
  },
  containerYahoo: {
    margin: "1px",
    alignItems: "center",
    backgroundColor: theme.colors.yahoo,
    borderRadius: "1vw",
    padding: "1px 10px",
  },
  icon: {
    width: "70%",
  },
  googleIconContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: "1vw",
    padding: "0px 10px",
    marginLeft: "-9px",
    height: "48px"
  }
}))

export default useStyles