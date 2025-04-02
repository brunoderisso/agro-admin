import { makeStyles } from 'tss-react/mui'

import sizes from "../../Utils/SizesWindow"

const useStyles = makeStyles()((theme) => ({
  formContainer: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    borderRadius: "3vw",
    padding: "3vw",
    border: "0.5vw solid" + theme.colors.predizadark,
    alignItems: "center",
  },
  buttonsContainer: {
    width: "55%",
    [theme.breakpoints.down(sizes.xlg)]: {
      width: "66%"
    }
  },
  formHeader: {
    fontWeight: "500",
    fontSize: "18px",
    marginBottom: "25px"
  },
  boxContainer: {
    padding: "2vw"
  },
  createPosition: {
    position: "relative",
    bottom: "0px",
    padding: "0px 10px",
    fontWeight: 600
  },
  missed: {
    color: "#b5b9b5"
  },
  backButton: {
    [theme.breakpoints.up(sizes.xs)]: {
      margin: "1px",
      position: "relative",
      left: "-50px",
      top: "90px",
    }
  },
  button: {
    backgroundColor: theme.colors.predizaregular,
    borderRadius: "0.7vw",
    padding: "15px 50px",
    fontSize: "15px"
  },
  container: {
    [theme.breakpoints.down(sizes.xs)]: {
      paddingLeft: "5vw",
      paddingRight: "5vw",
      paddingTop: "13vh",

    },
    [theme.breakpoints.up(sizes.xs)]: {
      paddingLeft: "20vw",
      paddingRight: "20vw",
      paddingTop: "13vh",

    },
    [theme.breakpoints.up(sizes.sm)]: {
      paddingLeft: "27vw",
      paddingRight: "27vw",
      paddingTop: "13vh",

    },
    [theme.breakpoints.up(sizes.md)]: {
      paddingLeft: "30vw",
      paddingRight: "30vw",
      paddingTop: "15vh",

    },
    [theme.breakpoints.up(sizes.lg)]: {
      paddingLeft: "35vw",
      paddingRight: "33vw",
      paddingTop: "26vh",

    },
    [theme.breakpoints.up(sizes.xl)]: {
      paddingLeft: "36vw",
      paddingRight: "33vw",
      paddingTop: "26vh",

    },
    [theme.breakpoints.up(sizes.xxl)]: {
    },
  },
  width: {
    [theme.breakpoints.down(sizes.xs)]: {
      width: "75vw"

    },
    [theme.breakpoints.up(sizes.xs)]: {
      width: "75vw"

    },
    [theme.breakpoints.up(sizes.sm)]: {
      width: "39vw"

    },
    [theme.breakpoints.up(sizes.md)]: {
      width: "28vw"

    },
    [theme.breakpoints.up(sizes.lg)]: {
      width: "28vw"

    },
    [theme.breakpoints.up(sizes.xl)]: {
      width: "28vw"

    },
    [theme.breakpoints.up(sizes.xxl)]: {
    },
  },
  scale: {
    width: "100%",
  },
  margin: {
    [theme.breakpoints.down(sizes.xs)]: {
      paddingBottom: "2vh"

    },
    [theme.breakpoints.up(sizes.xs)]: {
      paddingBottom: "2vh"

    },
    [theme.breakpoints.up(sizes.sm)]: {
      paddingBottom: "2vh"

    },
    [theme.breakpoints.up(sizes.md)]: {
      paddingBottom: "1vh"

    },
    [theme.breakpoints.up(sizes.lg)]: {
      paddingBottom: "0vh"

    },
    [theme.breakpoints.up(sizes.xl)]: {
      paddingBottom: "0vh"

    },
    [theme.breakpoints.up(sizes.xxl)]: {
    },
  },
  wrapperCollapseButtons: {
    "& .MuiCollapse-wrapperInner": {
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }
  }
}))

export default useStyles