import { useState } from "react"

import { Grid, IconButton, List, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/ImplementsPanel"
import PropertiesMenu from "./ImplementsMenu"
import ImplementsTabPanels from "./ImplementsTabPanels"
import theme from "../../../../../../styles/Utils/Theme"


const ImplementsPanel = ({ handleStateDrawer }) => {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

  const handleChange = (newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <List className={classes.containerFlexPages}>
        <Grid item xs={12} style={{ textAlign: "right", width: "100%" }}>
          <IconButton size="small" onClick={() => handleStateDrawer("defaultPanel")}>
            <CloseIcon style={{ color: theme.colors.onPrimaryContainer }} fontSize="small" />
          </IconButton>
        </Grid>
        <Typography className={classes.titleDrower} variant="h5">Implementos</Typography>
      </List>

      <List>
        <Grid className={classes.muiBoxHeader}>
          <PropertiesMenu value={value} onChange={handleChange} />
          <ImplementsTabPanels value={value} />
        </Grid>
      </List>
    </>
  )
}

export default ImplementsPanel
