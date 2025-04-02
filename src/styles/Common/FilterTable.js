import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  searchInput: {
    "&.MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: theme.colors.primary[40]
    }
  },
  inputs: {
    backgroundColor: theme.colors.onPrimary,
    width: 170,
    height: 39,
    "& .MuiOutlinedInput-root": {
      height: 39,
      "&.Mui-focused fieldset": {
        borderColor: theme.colors.primary[40],
      }
    },
    "& .MuiInputBase-input": {
      fontSize: 12,
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: 0.4,
    },
    "& label.Mui-focused": {
      color: theme.colors.primary[40],
    },
  },
  inputFocus: {
    "& .MuiInputBase-input": {
      color: theme.colors.onPrimaryContainer,
    }
  },
  inputPlaceholder: {
    "& .MuiInputBase-input": {
      color: theme.colors.inactive,
    }
  },
  filterBtn: {
    border: `1px solid ${theme.colors.inactive}`,
    "&:hover": {
      border: `1px solid ${theme.colors.inactive}`,
    },
    color: theme.colors.outline
  },
  filterTextBtn: {
    color: theme.colors.outline,
    marginRight: 8
  },
  btnClean: {
    "&:hover": {
      backgroundColor: theme.colors.primary[95],
    },
  },
  textBtnClean: {
    color: theme.colors.primary[40],
  },
  textBtnCommon: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.4,
  },
  wrapperLabelsFilter: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    marginTop: 24
  },
  labelFilter: {
    display: "flex",
    padding: "4px 16px",
    alignItems: "center",
    gap: 8,
    borderRadius: 24,
    backgroundColor: theme.colors.outline
  },
  textLabelFilter: {
    color: theme.colors.onPrimary,
    textAlign: "center",
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: 0.4
  },
  boldTextLabelFilter: {
    color: theme.colors.onPrimary,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: 0.4,
    textTransform: "uppercase"
  },
  iconButton: {
    padding: 0,
    minWidth: "auto",
  },
  iconProp: {
    color: theme.colors.onPrimary
  },
  iconFilledFilter: {
    "& svg": {
      "& path": {
        fill: theme.colors.primary[40]
      }
    }
  },
  iconEmptyFilter: {
    "& svg": {
      "& path": {
        fill: theme.colors.outline
      }
    }
  },
}))

export default useStyles