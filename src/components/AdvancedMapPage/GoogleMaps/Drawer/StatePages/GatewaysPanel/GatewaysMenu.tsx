import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Tab, Tabs } from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/GatewaysMenu"
import theme from "../../../../../../styles/Utils/Theme"
import GMapStore from "../../../../../../stores/GoogleMapStore"


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  }
}

function GatewaysMenu(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (props.value) {
      setValue(props.value)
    }
  }, [props.value])

  // Atualiza o objeto dos gateways para ser salvo na store e refletir a mudança nos checkboxes
  const handleChange = (_, newValue: number) => {
    props.onChange(newValue)
    setValue(newValue)

    GMapStore.updateMarketsObject(newValue)
  }

  return (
    <Tabs
      className={classes.tabsButtons}
      value={value}
      onChange={handleChange}
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      <Tab style={{ borderRight: "solid 1px" + theme.colors.inactive }} label="Mercado" {...a11yProps(0)} />
      <Tab label="Status" {...a11yProps(1)} />
    </Tabs>
  )
}

GatewaysMenu.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
}

export default GatewaysMenu