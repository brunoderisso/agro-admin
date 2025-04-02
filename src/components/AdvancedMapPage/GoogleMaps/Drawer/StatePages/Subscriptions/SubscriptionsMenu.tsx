import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Tab, Tabs } from "@mui/material"

import useStyles from '../../../../../../styles/AdvancedMapPage/GoogleMaps/SubscriptionsMenu'
import theme from "../../../../../../styles/Utils/Theme"


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  }
}

function SubscriptionsMenu(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState(0)

  useEffect(() => {
    if (props.value) {
      setValue(props.value)
    }
  }, [props.value])

  const handleChange = (_, newValue) => {
    props.onChange(newValue)
    setValue(newValue)
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
      <Tab style={{ borderRight: "solid 1px" + theme.colors.inactive }} label="Status" {...a11yProps(0)} />
      <Tab style={{ borderRight: "solid 1px" + theme.colors.inactive }} label="Plano" {...a11yProps(1)} />
      <Tab label="Cliente" {...a11yProps(2)} />
    </Tabs>
  )
}

SubscriptionsMenu.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
}

export default SubscriptionsMenu