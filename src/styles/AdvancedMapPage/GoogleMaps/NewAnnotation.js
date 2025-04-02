import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  boxSubTitleNewAnnotation: {
    display: "flex",
    justifyContent: "space-between"
  },
  subTitleNewAnnotation: {
    fontSize: "16px",
    color: theme.colors.onPrimaryContainer,
    display: "flex",
    alignItems: "center"
  },
  formControlAnnotation: {
    minWidth: 120,
    "& label": {
      display: "flex",
      marginTop: "-16px"
    },
    "& div": {
      margin: 0,
      "&::before": {
        colorColor: theme.colors.inactive,
        borderRadius: "2px"
      },
      "& div": {
        display: "flex"
      }
    },
  },
  menuList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "4px"
  },
  boxDetailAnnotation: {
    width: "100%",
    marginTop: "22px",
    '& .MuiTextField-root': {
      width: "100%",
    },
  },
  annotationInputValue: {
    "& div": {
      "& textarea": {
        flex: "1 0 0",
        fontFamily: "Poppins",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: "0.4px",
        color: theme.colors.onPrimaryContainer
      }
    }
  },
  newAnnotationImg: {
    width: "100%",
    height: "132px",
    padding: "16px, 24px, 16px, 24px",
    borderRadius: "4px",
    gap: "24px",
    border: "2px dashed #C5C6D0",
    marginTop: "24px"
  },
  boxDetailButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
    "& .MuiButton-text": {
      padding: "6px 14px",
      color: theme.colors.primary[40]
    }
  },
}))

export default useStyles