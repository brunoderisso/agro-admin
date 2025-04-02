import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, Grid, Typography } from "@mui/material"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanFeatures"


function PlanFeatures(props) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const handleDrawer = () => {
    if (typeof props.handleDrawer === "function") {
      props.handleDrawer(true)
    }
  }

  return (
    <Grid item container>
      <Typography className={classes.subtitle}>
        {t("homePanel.plans.form.title3")}
      </Typography>
      <Button
        fullWidth
        variant="contained"
        size="medium"
        name="selectFeature"
        className={classes.btnSuccess}
        onClick={handleDrawer}
        aria-controls="filter-menu"
        aria-haspopup="true"
      >
        <Typography variant="button">{t("homePanel.plans.form.selectFeatures")}</Typography>
      </Button>
    </Grid>
  )
}

PlanFeatures.propTypes = {
  handleDrawer: PropTypes.func.isRequired,
}

export default PlanFeatures