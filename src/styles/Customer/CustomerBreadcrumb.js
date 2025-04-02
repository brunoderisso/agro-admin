import { makeStyles } from 'tss-react/mui'


const useStyles = makeStyles()((theme) => ({
  nextIcon: {
    color: theme.colors.inactive
  },
  link: {
    fontSize: "16px",
    fontWeight: 400,
    color: theme.colors.onPrimaryContainer
  },
  selectInput: {
    "& fieldset": {
      border: 0
    },
    "& svg": {
      color: "white"
    },
    backgroundColor: theme.colors.outline,
    borderRadius: "24px",
    color: "white"
  }
}))

export default useStyles