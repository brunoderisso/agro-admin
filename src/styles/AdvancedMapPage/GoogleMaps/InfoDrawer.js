import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  containerDrawer: {
    "& .MuiDrawer-paper": {
      backgroundColor: theme.colors.background,
      top: "64px",
      borderTopRightRadius: "8px",
      borderTopLeftRadius: "8px",
      display: "inline-flex",
      width: "400px",
      padding: "24px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "16px"
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "transparent"
    }
  },
  boxContMaxWidth: {
    maxWidth: "352px"
  },
}))

export default useStyles