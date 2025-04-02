import PropTypes from "prop-types"

import { Grid, MenuItem, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/MenuItem"
import stringsUtils from "../../../../../../utils/StringUtils"


function CouponMenuItem({ coupon, onClickHandle }) {
  const { classes } = useStyles()

  const onClickFunc = () => {
    if (typeof onClickHandle === "function") {
      onClickHandle(coupon)
    }
  }

  return (
    <MenuItem
      value={coupon.name}
      onClick={onClickFunc}
      className={classes.container}>
      <Grid container>
        <Grid item>
          <Typography variant="body2" className={classes.mediumText}>
            {stringsUtils.toCapitalize(coupon.name)}
          </Typography>
        </Grid>
        <Grid item sx={{ marginLeft: "auto" }}>
          <Typography variant="caption" className={classes.mediumOutlineText}>
            {stringsUtils.slugURL(coupon.name).toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
    </MenuItem>
  )
}

CouponMenuItem.propTypes = {
  coupon: PropTypes.object,
  onClickHandle: PropTypes.func,
}

export default CouponMenuItem