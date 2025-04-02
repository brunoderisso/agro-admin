import { useEffect, useState } from "react"

import { Grid, IconButton, List, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

// import AdministrativeStore from "../../../../../../stores/AdministrativeStore"
import InputSeach from "../../../../../Common/InputSearch"
import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/CollectorsPanel"
import theme from "../../../../../../styles/Utils/Theme"
import CollectorsMenu from "./CollectorsMenu"
import CollectorsTabPanels from "./CollectorsTabPanels"
import { MarketObjectType } from "../../../../../../interfaces/AdvancedMapPage/GoogleMaps"


const CollectorsPanel = ({ handleStateDrawer, outputMarkets }) => {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)
  const [markets, setMarkets] = useState<MarketObjectType[]>([])
  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    setMarkets(outputMarkets)
  }, [outputMarkets])

  const handleChange = (newValue) => {
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
        <Typography className={classes.titleDrawer} variant="h5">Coletores</Typography>
      </List>
      <InputSeach
        setSearchText={setSearchText}
        placeholder={"Busque pelo nome do dispositivo"}
      />
      <List>
        <Grid className={classes.muiBoxHeader}>
          <CollectorsMenu value={value} onChange={handleChange} />
          <CollectorsTabPanels value={value} markets={markets} searchText={searchText} />
        </Grid>
      </List>
    </>
  )
}

export default CollectorsPanel
