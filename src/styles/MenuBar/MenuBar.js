import { makeStyles } from 'tss-react/mui'

import sizes from "../Utils/SizesWindow"

const useStyles = makeStyles()((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.colors.onPrimaryContainer,
  },
  wrapperContent: {
    padding: "0 40px 0 48px",
    gap: 40,
    height: 64,
    width: '100%',
    '@media (max-width: 527px)': {
      gap: 0,
      "& div": {
        "& p": {
          marginLeft: "12px"
        }
      }
    },
    '@media (max-width: 437px)': {
      padding: "0 10px 0 18px"
    },
    '@media (max-width: 359px)': {
      padding: "0 2px 0 5px"
    }
  },
  logo: {
    height: "3vh",
    width: "11vw",
    [theme.breakpoints.down(sizes.xxl)]: {
      height: "2.5vh",
      width: "6vw"
    },
    [theme.breakpoints.down(sizes.xlg)]: {
      height: "3vh",
      width: "9vw"
    },
    [theme.breakpoints.down(sizes.xmd)]: {
      height: "3vh",
      width: "11vw"
    },
    [theme.breakpoints.down(sizes.sm)]: {
      height: "3vh",
      width: "14vw"
    },
    [theme.breakpoints.down(sizes.xs)]: {
      height: "2.5vh",
      width: "24vw"
    },
  },
  menuText: {
    color: theme.colors.onPrimaryContainer,
    fontFamily: "Poppins",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20.02px",
    letterSpacing: "0.15px",
    minWidth: "100px"
  },
  subtitle: {
    color: theme.colors.onPrimary,
    fontSize: 12,
    lineHeight: "32px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  iconProfile: {
    marginLeft: "auto"
  }
}))

export default useStyles