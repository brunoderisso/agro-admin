import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Box, Tab, Tabs } from "@mui/material"

import useStyles from "../../../../../styles/AdvancedMapPage/GoogleMaps/ManagementMenu"


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function ManagementMenu(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (props.value) {
      setValue(props.value)
    }
  }, [props.value])

  // TODO: descomentar quando desmockar Prospecção
  // const handleChange = (_, newValue) => {
  //   props.onChange(newValue)
  //   setValue(newValue)
  // }

  return (
    <Box className={classes.tabsBox}>
      <Tabs
        className={classes.tabsPrimary}
        indicatorColor="primary"
        textColor="primary"
        value={value}
        // onChange={handleChange}
      >
        <Tab label="Clientes" {...a11yProps(0)} />
        <Tab label="Prospecção" {...a11yProps(1)} />
      </Tabs>
    </Box>
  )
}

ManagementMenu.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
}

export default ManagementMenu