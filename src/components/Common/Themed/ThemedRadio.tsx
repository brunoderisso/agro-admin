import { styled } from "@mui/material/styles"
import Radio from "@mui/material/Radio"


const ThemedRadio = styled(Radio)(({ theme }) => ({
    color: theme.colors.primary[40],
    "&.Mui-checked": {
        color: theme.colors.primary[40],
    },
}))

export default ThemedRadio