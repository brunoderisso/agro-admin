import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  tabsPrimary: {
    borderBottom: "1px solid" + theme.colors.inactive,
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-around",
      marginTop: "14px",
      "& button": {
        color: theme.colors.primary[40],
        textTransform: "capitalize",
        width: "45%"
      }
    }
  },
  tabsBox: {
    borderBottom: 1,
    borderColor: 'divider'
  }
}))

export default useStyles