import { useRef } from "react"
import Scrollbars from "react-custom-scrollbars-2"

import PropTypes from "prop-types"

import { Grid } from "@mui/material"

import useStyles from "../../styles/Common/PredizaScrollBar"


function PredizaScrollBar(props) {
  const { classes } = useStyles()
  const scroll = useRef()
  const height = props.customHeight || `${props.height}${props.unity}`

  const thumb = () => {
    return (
      <Grid id={"thumb"} className={classes.thumb}>
      </Grid>
    )
  }

  return (
    <Scrollbars ref={scroll} style={{ width: "100%", height: height }} renderThumbVertical={thumb}>
      {props.children}
    </Scrollbars>

  )
}

PredizaScrollBar.propTypes = {
  height: PropTypes.number,
  unity: PropTypes.string,
  customHeight: PropTypes.string,
  children: PropTypes.any
}

export default PredizaScrollBar