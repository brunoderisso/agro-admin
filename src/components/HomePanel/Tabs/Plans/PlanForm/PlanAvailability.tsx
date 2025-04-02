import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { FormControlLabel, Grid, MenuItem, Typography } from "@mui/material"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanAvailability"
import CustomCheckBox from "../../../../Common/Themed/ThemedCheckBox"


function PlanAvailability(props) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const handleActiveCheckbox = (event) => {
    if (typeof props.handleActive === "function") {
      props.handleActive(event.target.checked)
    }
  }

  const handleShowOnlineCheckbox = (event) => {
    if (typeof props.handleShowOnline === "function") {
      props.handleShowOnline(event.target.checked)
    }
  }

  return (
    <Grid item container>
      <Typography className={classes.subtitle}>
        {t("homePanel.plans.form.title2")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <FormControlLabel
            control={<CustomCheckBox checked={props.active} onChange={handleActiveCheckbox} name="active" />}
            label={<MenuItem className={classes.itemLabelFilter}>
              <Typography className={classes.textForm}>{t("homePanel.plans.form.checkbox1")}</Typography>
            </MenuItem>}
            className={classes.wrapperLabelSelectFilter}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<CustomCheckBox checked={props.showOnline} onChange={handleShowOnlineCheckbox} name="showOnline" />}
            label={<MenuItem className={classes.itemLabelFilter}>
              <Typography className={classes.textForm}>{t("homePanel.plans.form.checkbox2")}</Typography>
            </MenuItem>}
            className={classes.wrapperLabelSelectFilter}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

PlanAvailability.propTypes = {
  active: PropTypes.bool.isRequired,
  showOnline: PropTypes.bool.isRequired,
  handleActive: PropTypes.func.isRequired,
  handleShowOnline: PropTypes.func.isRequired
}

export default PlanAvailability