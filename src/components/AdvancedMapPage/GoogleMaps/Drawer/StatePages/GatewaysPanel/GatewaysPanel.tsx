import { useEffect, useState } from "react"

import CloseIcon from "@mui/icons-material/Close"
import {
  AppBar,
  Grid,
  IconButton,
  List,
  Typography
} from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/GatewaysPanel"
import InputSearch from "../../../../../Common/InputSearch"
import GatewaysMenu from "./GatewaysMenu"
import GatewaysTabPanels from "./GatewaysTabPanels"
import theme from "../../../../../../styles/Utils/Theme"
import { MarketObjectType } from "../../../../../../interfaces/AdvancedMapPage/GoogleMaps"


const GatewaysPanel = ({ handleStateDrawer, outputMarkets }) => {
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
        <Typography className={classes.titleDrawer} variant="h5">Gateways</Typography>
      </List>
      <InputSearch
        setSearchText={setSearchText}
        placeholder={"Busque pelo nome do gateway"}
      />
      <List>
        <Grid>
          <Grid>
            <Grid>
              <Grid className={classes.muiBoxHeader}>
                <AppBar id="appBarId" position="static" color="default">
                  <Typography className={classes.category}>Agrupar por:</Typography>
                  <GatewaysMenu value={value} onChange={handleChange} />
                </AppBar>
                <GatewaysTabPanels value={value} markets={markets} searchText={searchText} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </List>
    </>
  )
}

export default GatewaysPanel
