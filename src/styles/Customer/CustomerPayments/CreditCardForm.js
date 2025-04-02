import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  paddingInput: {
    marginBottom: "24px"
  },
  cardContainer: {
    padding: "40px 24px 24px 24px",
    borderRadius: "8px",
    width: "min-content"
  },
  iconSize: {
    transform: "scale(0.7)"
  },
  nextButton: {
    borderRadius: "4px",
    padding: "8px 16px",
    color: theme.colors.onPrimary,
    backgroundColor: theme.colors.primary[40],
    "&:hover": {
      backgroundColor: theme.colors.primary[30],
    }
  },
  prevButton: {
    borderRadius: "4px",
    padding: "8px 16px",
    color: theme.colors.primary[40],
    borderColor: theme.colors.primary[40],
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    }
  },
  cleanButton: {
    color: theme.colors.primary[40],
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    }
  },
  iconColor: {
    color: theme.colors.onPrimaryContainer
  },
  alignCenter: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  loader: {
    width: "25px !important",
    height: "25px !important",
  },
}))

export default useStyles