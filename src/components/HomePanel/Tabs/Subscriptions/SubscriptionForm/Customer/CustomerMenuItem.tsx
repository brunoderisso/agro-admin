import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Avatar, Grid, IconButton, MenuItem, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/MenuItem"
import toolsUtils from "../../../../../../utils/ToolsUtils"


function CustomerMenuItem({ customer, onClickHandle, selected }) {
  const { classes, cx } = useStyles()

  const [initials, setInitials] = useState<string>("AA")

  useEffect(() => {
    if (customer?.name?.length > 0) {
      setInitials(toolsUtils.getInitials(customer.name))
    }
  }, [customer])

  const onClickFunc = () => {
    if (typeof onClickHandle === "function") {
      onClickHandle(customer)
    }
  }

  return (
    <MenuItem
      value={customer.name}
      onClick={onClickFunc}
      className={cx(classes.container, {
        [classes.selectedItem]: selected
      })}>
      <Avatar className={classes.avatar}>
        <Typography variant="subtitle2" className={classes.avatarText}>{initials}</Typography>
      </Avatar>
      <Grid className={classes.containerText}>
        <Typography variant="caption" className={classes.text}>
          {customer.name}
        </Typography>
        <Typography variant="caption" className={classes.outlineText}>
          {customer.email}
        </Typography>
      </Grid>
      {selected &&
        <IconButton size="small" className={classes.iconButton}>
          <CloseIcon className={classes.icon} fontSize="small"/>
        </IconButton>
      }
    </MenuItem>
  )
}

CustomerMenuItem.propTypes = {
  customer: PropTypes.object,
  onClickHandle: PropTypes.func,
  selected: PropTypes.bool,
}

export default CustomerMenuItem