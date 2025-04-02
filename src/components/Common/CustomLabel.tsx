import PropTypes from "prop-types"

import { Button, Grid, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from "../../styles/Common/CustomLabel"


function CustomLabel(props) {
  const { classes } = useStyles()

  return (
    <Grid className={classes.labelFilter}>
      {props.tagText &&
        <Typography className={classes.textLabelFilter}>
          {props.tagText}
        </Typography>
      }
      <Typography className={classes.boldTextLabelFilter}>
        {props.mainText}
      </Typography>
      {props.cleanFunc &&
        <Button className={classes.iconButton} onClick={props.cleanFunc}>
          <CloseIcon fontSize="small" className={classes.iconProp} />
        </Button>
      }
    </Grid>
  )
}

CustomLabel.propTypes = {
  tagText: PropTypes.string,
  mainText: PropTypes.string.isRequired,
  cleanFunc: PropTypes.func,
}

export default CustomLabel