import { ListSubheader, TextField, InputAdornment, Grid, Box } from "@mui/material"

import PredizaSearchIcon from "../../img/AdvancedMapIcons/PredizaSearchIcon.svg?react"
import useStyles from "../../styles/Common/InputSearch"


const InputSearch = ({ setSearchText, placeholder }) => {
  const { classes } = useStyles()

  return (
    <>
      <ListSubheader className={classes.selectInputListSubheader}>
        <Grid className={classes.selectInput}>

          <TextField
            className={classes.textFieldSearch}
            size="small"
            autoFocus
            placeholder={placeholder}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PredizaSearchIcon />
                </InputAdornment>
              )
            }}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {

                e.stopPropagation()
              }
            }}
          />
        </Grid>
      </ListSubheader>
      <Box component="hr" className={classes.hrStyle} />
    </>
  )
}

export default InputSearch