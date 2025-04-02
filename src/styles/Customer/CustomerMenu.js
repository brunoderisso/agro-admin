import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  leftMenu: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.colors.inactive}`,
    padding: '40px 0 0 48px',
    width: '299px',
    backgroundColor: theme.colors.onPrimary,
    height: "100%"
  },
  label: {
    color: theme.colors.onPrimaryContainer,
    fontSize: '12px',
    lineHeight: '32px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    paddingBottom: '32px'
  },
  indicatorSelectedTab: {
    backgroundColor: theme.colors.primary[40],
  },
  tabMenu: {
    display: 'flex',
    alignItems: "start",

    '&:hover': {
      backgroundColor: theme.colors.primary[95],
    },
    "&.Mui-selected": {
      color: theme.colors.primary[40],
      backgroundColor: theme.colors.primaryContainer,
    }
  },
  menuContainer: {
    position: "fixed",
    height: "100vh",
  },
}))

export default useStyles