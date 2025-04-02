import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  tabLabel: {
    fontSize: "20px",
    fontWeight: 500,
    "&.Mui-selected": {
      color: theme.colors.primary[40]
    }
  },
  selectedTab: {
    color: theme.colors.primary[40],
    backgroundColor: theme.colors.primaryContainer,
  },
  indicatorSelectedTab: {
    backgroundColor: theme.colors.primary[40],
  }
}))

export default useStyles