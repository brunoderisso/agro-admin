import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Grid, Typography } from "@mui/material"

import TabPanel from "../../../../../Common/TabPanel"
import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/CardDrawerTabPanels"


function CardDrawerTabPanels(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <>
      <TabPanel value={value} index={0}>
        <Grid container onClick={() => props.activeTab && props.onClick()} className={classes.gatewaysFlexState}>
          <Grid xs={4} item>
            <Typography variant="h5" className={classes.gatewaysTextActive}>{props.active}</Typography>
            <Typography className={classes.gatewaysTotal}>Ativos</Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography variant="h5" className={classes.gatewaysTextInAlert}>{props.alert}</Typography>
            <Typography className={classes.gatewaysTotal}>Em alerta</Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography variant="h5" className={classes.gatewaysTextInactive}>{props.inactive}</Typography>
            <Typography className={classes.gatewaysTotal}>Inativos</Typography>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container onClick={() => props.activeTab && props.onClick()} className={classes.gatewaysFlexState}>
          <Grid xs={4} item>
            <Typography variant="h5" className={classes.propertiesTextActive}>{props.active}</Typography>
            <Typography className={classes.gatewaysTotal}>1 - 50 ha.</Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography variant="h5" className={classes.propertiesTextActive}>{props.alert}</Typography>
            <Typography className={classes.gatewaysTotal}>51 - 100 ha.</Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography variant="h5" className={classes.propertiesTextActive}>{props.inactive}</Typography>
            <Typography className={classes.gatewaysTotal}>101 - 150 ha.</Typography>
          </Grid>
        </Grid>
      </TabPanel>
    </>
  )
}

CardDrawerTabPanels.propTypes = {
  value: PropTypes.number,
  activeTab: PropTypes.bool,
  onClick: PropTypes.func,
  active: PropTypes.number,
  inactive: PropTypes.number,
  alert: PropTypes.number,
}

export default CardDrawerTabPanels