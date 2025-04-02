import PropTypes from "prop-types"

import { Grid, MenuItem, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/MenuItem"
import masksUtils from "../../../../../../utils/MasksUtils"
import stringsUtils from "../../../../../../utils/StringUtils"


function PlanMenuItem({ plan, onClickHandle }) {
  const { classes } = useStyles()

  const onClickFunc = () => {
    if (typeof onClickHandle === "function") {
      onClickHandle(plan)
    }
  }

  return (
    <MenuItem
      value={plan.name}
      onClick={onClickFunc}
      className={classes.container}>
      <Grid container>
        <Grid item>
          <Typography variant="body2" className={classes.mediumText}>
            {stringsUtils.toCapitalize(plan.name)}
          </Typography>
        </Grid>
        <Grid item sx={{ marginLeft: "auto" }}>
          <Typography variant="caption" className={classes.mediumOutlineText}>
            {masksUtils.currencyFormatToReal(plan.value_cents)}
          </Typography>
        </Grid>
      </Grid>
    </MenuItem>
  )
}

PlanMenuItem.propTypes = {
  plan: PropTypes.object,
  onClickHandle: PropTypes.func,
}

export default PlanMenuItem