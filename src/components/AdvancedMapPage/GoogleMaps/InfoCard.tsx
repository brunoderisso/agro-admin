import PropTypes from "prop-types"

import { Card, Typography } from "@mui/material"

import useStyles from "../../../styles/AdvancedMapPage/GoogleMaps/InfoCard"


function InfoCard(props) {
  const { classes } = useStyles()

  return (
    <Card className={classes.container}>
      <Typography variant="caption" className={classes.text}>{props.name}</Typography>
    </Card>
  )
}

InfoCard.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  lat: PropTypes.number,
  lng: PropTypes.number,
}

export default InfoCard