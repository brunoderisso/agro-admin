import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Avatar, Grid, IconButton, MenuItem, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/MenuItem"
import toolsUtils from "../../../../../../utils/ToolsUtils"
import polygonUtils from "../../../../../../utils/PolygonUtils"
import poligonStore from "../../../../../../stores/PoligonStore"


function PropertyMenuItem({ property, onClickHandle, selected }) {
  const { classes, cx } = useStyles()

  const [initials, setInitials] = useState<string>("AA")

  useEffect(() => {
    if (property?.name?.length > 0) {
      setInitials(toolsUtils.getInitials(property.name))
    }
  }, [property])

  const onClickFunc = () => {
    if (typeof onClickHandle === "function") {
      onClickHandle(property)
    }
  }

  return (
    <MenuItem
      value={property.name}
      onClick={onClickFunc}
      className={cx(classes.container, {
        [classes.selectedItem]: selected
      })}>
      <Avatar className={classes.avatar}>
        <Typography variant="subtitle2" className={classes.avatarText}>{initials}</Typography>
      </Avatar>
      <Grid className={classes.containerText}>
        <Typography variant="caption" className={classes.text}>
          {property.name}
        </Typography>
        {property?.polygon?.length > 0 &&
          <Typography variant="caption" className={classes.outlineText}>
            {`${polygonUtils.convertAreaToHa(
              poligonStore.computeAreaGauss(property.polygon)
            ).replace(".", ",")} ha`}
          </Typography>
        }
      </Grid>
      {selected &&
        <IconButton size="small" className={classes.iconButton}>
          <CloseIcon className={classes.icon} fontSize="small" />
        </IconButton>
      }
    </MenuItem>
  )
}

PropertyMenuItem.propTypes = {
  property: PropTypes.object,
  onClickHandle: PropTypes.func,
  selected: PropTypes.bool,
}

export default PropertyMenuItem