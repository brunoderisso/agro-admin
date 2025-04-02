import { useContext, useEffect, useState } from "react"

import { Box, Drawer, Grid } from "@mui/material"

import useStyles from "../../../../styles/AdvancedMapPage/GoogleMaps/InfoDrawer"
import GoogleMapStore from "../../../../stores/GoogleMapStore"
import ManagementPanel from "./StatePages/ManagementPanel"
import PredizaScrollBar from "../../../Common/PredizaScrollBar"
import GatewaysPanel from "./StatePages/GatewaysPanel/GatewaysPanel"
import PropertiesPanel from "./StatePages/PropertiesPanel/PropertiesPanel"
import ImplementsPanel from "./StatePages/ImplementsPanel/ImplementsPanel"
import Subscriptions from "./StatePages/Subscriptions/SubscriptionsPanel"
import AccountsPanel from "./StatePages/AccountsPanel/AccountsPanel"
import CollectorsPanel from "./StatePages/CollectorsPanel/CollectorsPanel"
import PropertiesDetails from "./StatePages/PropertiesPanel/PropertiesDetailsPanel"
import { ContextMarkets } from "../../ProviderAdvancedMap"


const InfoDrawer = ({
  outputMarkets
}) => {
  const { classes } = useStyles()

  const { markets, setMarkets } = useContext(ContextMarkets)

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [stateDrawer, setStateDrawer] = useState<string>("defaultPanel")
  const [environment, setEnvironment] = useState({})
  const [allSelectBox, setAllSelectBox] = useState<boolean>(true)
  const [showLocationsBox, setShowLocationsBox] = useState<boolean>(true)

  useEffect(() => {
    bind()
    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleOnMap(allSelectBox)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSelectBox])

  const bind = () => {
    GoogleMapStore.addListener("DrawerButton_click", onDrawerOpen)
    GoogleMapStore.addListener("closeDrawer", onDrawerOpen)
  }

  const clear = () => {
    GoogleMapStore.removeListener("DrawerButton_click", onDrawerOpen)
    GoogleMapStore.removeListener("closeDrawer", onDrawerOpen)
  }

  const handleStateDrawer = (state, environment) => {
    if (environment) {
      setEnvironment(environment)
    }

    if (state === "gateways" && GoogleMapStore.getTypeGroupGateways() === "status") {
      GoogleMapStore.updateMarketsObject(0)
    }

    setStateDrawer(state)
  }

  const onDrawerOpen = (event) => {
    if (event === "FullScreenDrawerClick" && !openDrawer) {
      const drawerElement = document.querySelector(".MuiDrawer-paper") as HTMLElement

      if (drawerElement) {
        drawerElement.style.top = "0"
        setOpenDrawer(!openDrawer)
      } else {
        requestAnimationFrame(onDrawerOpen)
      }

    } else if (event === "DrawerClick") {
      const drawerElement = document.querySelector(".MuiDrawer-paper") as HTMLElement
      setOpenDrawer(!openDrawer)

      if (drawerElement) {
        drawerElement.style.top = "64px"
      } else {
        requestAnimationFrame(onDrawerOpen)
      }
    }

    if (event === "closeDrawer") {
      setOpenDrawer(false)
    }
  }

  const handleOnMap = (allselectBox) => {
    if (allselectBox) {
      setShowLocationsBox(true)
    } else {
      setShowLocationsBox(false)
    }

    GoogleMapStore.showOnMap()
  }

  const administrativeDrawer = () => (
    <Box
      id="DrawerID"
      sx={{ width: 370 }}
      role="presentation"
    >
      <PredizaScrollBar customHeight={"calc(100vh - 88px)"}>
        <Grid className={classes.boxContMaxWidth}>
          {stateDrawer === "defaultPanel" &&
            <ManagementPanel
              handleStateDrawer={handleStateDrawer}
              setOpenDrawer={setOpenDrawer}
              setAllSelectBox={setAllSelectBox}
              setShowLocationsBox={setShowLocationsBox}
              allSelectBox={allSelectBox}
              showLocationsBox={showLocationsBox}
              outputMarkets={outputMarkets}
              marketSelectList={markets}
              setMarketSelectList={setMarkets}
            />
          }
          {stateDrawer === "gateways" &&
            <GatewaysPanel handleStateDrawer={handleStateDrawer} outputMarkets={outputMarkets} />
          }
          {stateDrawer === "subscriptions" &&
            <Subscriptions handleStateDrawer={handleStateDrawer} />
          }
          {stateDrawer === "properties" &&
            <PropertiesPanel handleStateDrawer={handleStateDrawer} outputMarkets={outputMarkets} />
          }
          {stateDrawer === "implements" &&
            <ImplementsPanel handleStateDrawer={handleStateDrawer} />
          }
          {stateDrawer === "propertiesDetails" &&
            <PropertiesDetails handleStateDrawer={handleStateDrawer} environment={environment} />
          }
          {stateDrawer === "accountsPanel" &&
            <AccountsPanel handleStateDrawer={handleStateDrawer} outputMarkets={outputMarkets} />
          }
          {stateDrawer === "collectors" &&
            <CollectorsPanel handleStateDrawer={handleStateDrawer} outputMarkets={outputMarkets} />
          }
        </Grid>
      </PredizaScrollBar>
    </Box>
  )

  return (
    <Grid>
      <Drawer
        id="drawerMap"
        className={classes.containerDrawer}
        open={openDrawer}
        onClose={() => { setOpenDrawer(false) }}
        variant="persistent"
      >
        {administrativeDrawer()}
      </Drawer>
    </Grid>
  )
}

export default InfoDrawer