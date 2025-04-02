import { Checkbox } from "@mui/material"
import { styled } from "@mui/material/styles"


const ThemedCheckBox = styled(Checkbox)(({ theme }) => ({
    color: theme.colors.outline,
    '&.Mui-checked': {
        color: theme.colors.primary[40],
    },
}))

export default ThemedCheckBox