import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Box, Tab, Tabs } from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/CardDrawerMenu"


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function CardDrawerMenu(props) {
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
    <Box className={classes.tabsBox}>
      <Tabs
        className={classes.tabsPrimary}
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={handleChange}
      >
        <Tab label="Cultivar" {...a11yProps(0)} />
        <Tab label="Área" {...a11yProps(1)} />
      </Tabs>
    </Box>
  )
}

CardDrawerMenu.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number
}

export default CardDrawerMenu