import { Tooltip } from "@mui/material"
import { styled } from "@mui/material/styles"


const ThemedTooltip = styled(Tooltip)(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: theme.colors.backgroundTooltip,
    color: theme.colors.onPrimary,
    borderRadius: "8px",
    display: "inline-flex",
    padding: "4px 8px",
    alignItems: "center",
  },
}))

export default ThemedTooltip