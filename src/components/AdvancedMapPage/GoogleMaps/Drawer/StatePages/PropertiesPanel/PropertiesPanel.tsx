import { useEffect, useState } from "react"

import CloseIcon from "@mui/icons-material/Close"
import {
  Grid,
  IconButton,
  List,
  Typography
} from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/PropertiesPanel"
import InputSeach from "../../../../../Common/InputSearch"
import theme from "../../../../../../styles/Utils/Theme"
import PropertiesMenu from "./PropertiesMenu"
import PropertiesTabPanels from "./PropertiesTabPanels"
import { MarketObjectType } from "../../../../../../interfaces/AdvancedMapPage/GoogleMaps"


const PropertiesPanel = ({ handleStateDrawer, outputMarkets }) => {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)
  const [markets, setMarkets] = useState<MarketObjectType[]>([])

  const [searchText, setSearchText] = useState("")

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
        <Typography className={classes.titleDrawer} variant="h5">Properties</Typography>
      </List>
      <InputSeach
        setSearchText={setSearchText}
        placeholder={"Busque o nome da propriedade / cultivar"}
      />
      <List>
        <Grid className={classes.muiBoxHeader}>
          <PropertiesMenu value={value} onChange={handleChange} />
          <PropertiesTabPanels
            value={value}
            searchText={searchText}
            markets={markets}
            handleStateDrawer={handleStateDrawer}
          />
        </Grid>
      </List>
    </>
  )
}

export default PropertiesPanel
