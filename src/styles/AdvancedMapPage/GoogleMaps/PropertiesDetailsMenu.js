import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  tabsBox: {
    "& div": {
      "& div": {
        "& div": {
          " & .Mui-selected": {
            color: theme.colors.primary[40]
          },
          "& button": {
            minWidth: "116px",
          }
        }
      }
    }
  },
}))

export default useStyles