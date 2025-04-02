import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { AppBar, Tab, Tabs, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/AccountsMenu"
import theme from "../../../../../../styles/Utils/Theme"


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  }
}

function AccountsMenu(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

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
    <AppBar id="appBarId" position="static" color="default">
      <Typography className={classes.category}>Agrupar por:</Typography>
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
        <Tab label="Propriedade" {...a11yProps(1)} />
      </Tabs>
    </AppBar>
  )
}

AccountsMenu.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
}

export default AccountsMenu