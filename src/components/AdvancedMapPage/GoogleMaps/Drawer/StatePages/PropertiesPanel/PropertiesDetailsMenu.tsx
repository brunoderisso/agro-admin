import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Box, Tab, Tabs } from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/PropertiesDetailsMenu"


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function PropertiesDetailsMenu(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (props.value) {
      setValue(props.value)
    }
  }, [props.value])

  const handleChange = (_, newValue: number) => {
    props.onChange(newValue)
    setValue(newValue)
  }

  return (
    <Box className={classes.tabsBox} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={handleChange}
      >
        <Tab label="Contatos" {...a11yProps(0)} />
        <Tab label="Anotações" {...a11yProps(1)} />
        <Tab label="Mercado" {...a11yProps(2)} />
      </Tabs>
    </Box>
  )
}

PropertiesDetailsMenu.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
}

export default PropertiesDetailsMenu