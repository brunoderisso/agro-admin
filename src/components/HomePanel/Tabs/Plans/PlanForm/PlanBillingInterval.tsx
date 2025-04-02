import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { FormControlLabel, Grid, RadioGroup, Typography } from "@mui/material"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanBillingInterval"
import CustomRadio from "../../../../Common/Themed/ThemedRadio"


function PlanBillingInterval(props) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const optionBillingInterval = [
    { value: "weeks", label: t("homePanel.plans.form.billingInterval1") },
    { value: "months", label: t("homePanel.plans.form.billingInterval2") },
  ]

  const handleIntervalRadio = (event) => {
    if (typeof props.handleIntervalRadio === "function") {
      props.handleIntervalRadio(event)
    }
  }

  return (
    <Grid item container>
      <Typography className={classes.subtitle}>
        {t("homePanel.plans.form.title4")}
      </Typography>
      <RadioGroup
        row
        aria-labelledby="interval-billing-radio-label"
        name="row-interval-billing-radio-label"
        defaultValue="monthly"
        className={classes.containerRadios}
        value={props.intervalRadio}
        onChange={handleIntervalRadio}
      >
        {optionBillingInterval.map((option, index) => {
          return (
            <FormControlLabel
              key={index}
              className={classes.labelRadio}
              value={option.value}
              control={<CustomRadio />}
              label={option.label}
            />
          )
        })}
      </RadioGroup>
    </Grid>
  )
}

PlanBillingInterval.propTypes = {
  intervalRadio: PropTypes.string.isRequired,
  handleIntervalRadio: PropTypes.func.isRequired,
}

export default PlanBillingInterval