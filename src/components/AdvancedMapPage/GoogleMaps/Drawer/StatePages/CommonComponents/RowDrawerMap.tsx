import { Box, Grid } from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/RowDrawerMap"
import theme from "../../../../../../styles/Utils/Theme"


const RowDrawerMap = ({
  classStyle = null,
  key,
  checkBox,
  svg = null,
  title,
  click = null
}) => {
  const { classes } = useStyles()

  return (
    <Box
      component="span"
      alignItems="center"
      display="flex"
      key={key}
      sx={{ c: theme.colors.onPrimaryContainer }}>
      <Box
        component="span"
        style={click && { cursor: "pointer" }}
        className={classes.linesStyle}>
        {checkBox &&
          <Box component="span">
            {checkBox}
          </Box>
        }
        <Grid className={classStyle ? classStyle : classes.linesStyle} onClick={click}>
          {svg &&
            <Box component="span" style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2px",
              marginRight: "8px"
            }}>
              {svg}
            </Box>
          }
          {title &&
            <Box component="span" style={{ minWidth: "140px" }}>
              {title}
            </Box>
          }
        </Grid>
      </Box>
    </Box>
  )
}

export default RowDrawerMap