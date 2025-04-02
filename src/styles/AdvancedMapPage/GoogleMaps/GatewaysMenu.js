import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  tabsButtons: {
    "& .MuiTab-root": {
      minWidth: "50px",
    },
    "& .MuiTab-textColorPrimary.Mui-selected": {
      color: theme.colors.onPrimaryContainer,
      fontFamily: "Poppins",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "20px",
      letterSpacing: "0.4px",
    },
    "& .MuiTab-textColorPrimary": {
      textTransform: "capitalize",
      color: theme.colors.primary[40],
      fontFamily: "Poppins",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "20px",
      letterSpacing: "0.4px",
    }
  },
}))

export default useStyles