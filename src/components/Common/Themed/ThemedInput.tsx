import { InputBase } from "@mui/material"
import { styled } from "@mui/material/styles"


const ThemedInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  borderRadius: "1vw",
  backgroundColor: "#f7f8fb",
  padding: "7px 15px",

  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: "#f7f8fb",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}))

export default ThemedInput