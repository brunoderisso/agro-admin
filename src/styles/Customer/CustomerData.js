import { makeStyles } from 'tss-react/mui'

const menuWidth = "299px"

const useStyles = makeStyles()((theme) => ({
  link: {
    fontSize: "16px",
    fontWeight: 400,
    color: theme.colors.onPrimaryContainer
  },
  tabPanel:{
    padding: "24px 24px 40px 48px",
    maxWidth: "calc(100% - " + menuWidth + ")",
    marginLeft: menuWidth
  },
  title: {
    fontSize: "32px",
    color: theme.colors.onPrimaryContainer,
    fontWeight: 500
  },
  nextIcon: {
    color: theme.colors.inactive
  }
}))

export default useStyles