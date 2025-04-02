import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { FormControlLabel, Grid, MenuItem, Typography } from "@mui/material"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanPaymentMethods"
import CustomCheckBox from "../../../../Common/Themed/ThemedCheckBox"

function PlanPaymentMethods(props) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const handlePixCheckbox = (event) => {
    if (typeof props.handlePixCheckbox === "function") {
      props.handlePixCheckbox(event)
    }
  }

  const handleBankSlipCheckbox = (event) => {
    if (typeof props.handleBankSlipCheckbox === "function") {
      props.handleBankSlipCheckbox(event)
    }
  }

  const handleCardCreditCheckbox = (event) => {
    if (typeof props.handleCardCreditCheckbox === "function") {
      props.handleCardCreditCheckbox(event)
    }
  }

  const handlePayableCheckbox = (event) => {
    if (typeof props.handlePayableCheckbox === "function") {
      props.handlePayableCheckbox(event)
    }
  }

  return (
    <Grid item container>
      <Grid container>
        <Grid item>
          <FormControlLabel
            control={<CustomCheckBox checked={props.payable} onChange={handlePayableCheckbox} name="payable" />}
            label={<MenuItem className={classes.itemLabelFilter}>
              <Typography className={classes.textForm}>{t("homePanel.plans.filters.paymentLabel4")}</Typography>
            </MenuItem>}
            className={classes.wrapperLabelSelectFilter}
          />
        </Grid>
      </Grid>
      <Typography className={classes.subtitle}>
        {t("homePanel.plans.form.title5")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <FormControlLabel
            control={<CustomCheckBox checked={props.pix} onChange={handlePixCheckbox} name="pix" disabled={!props.payable} />}
            label={<MenuItem className={classes.itemLabelFilter}>
              <Typography className={classes.textForm}>{t("homePanel.plans.filters.paymentLabel2")}</Typography>
            </MenuItem>}
            className={classes.wrapperLabelSelectFilter}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<CustomCheckBox checked={props.bankSlip} onChange={handleBankSlipCheckbox} name="bankSlip" disabled={!props.payable} />}
            label={<MenuItem className={classes.itemLabelFilter}>
              <Typography className={classes.textForm}>{t("homePanel.plans.filters.paymentLabel3")}</Typography>
            </MenuItem>}
            className={classes.wrapperLabelSelectFilter}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<CustomCheckBox checked={props.cardCredit} onChange={handleCardCreditCheckbox} name="cardCredit" disabled={!props.payable} />}
            label={<MenuItem className={classes.itemLabelFilter}>
              <Typography className={classes.textForm}>{t("homePanel.plans.filters.paymentLabel1")}</Typography>
            </MenuItem>}
            className={classes.wrapperLabelSelectFilter}
          />
        </Grid>
        {props.flagPaymentsError &&
          <Grid container justifyContent={"center"} sx={{ marginTop: "4px" }}>
            <Typography className={classes.errorText}>{props.textPaymentsError}</Typography>
          </Grid>
        }
      </Grid>
    </Grid>
  )
}

PlanPaymentMethods.propTypes = {
  pix: PropTypes.bool.isRequired,
  bankSlip: PropTypes.bool.isRequired,
  cardCredit: PropTypes.bool.isRequired,
  payable: PropTypes.bool.isRequired,
  handlePixCheckbox: PropTypes.func.isRequired,
  handleBankSlipCheckbox: PropTypes.func.isRequired,
  handleCardCreditCheckbox: PropTypes.func.isRequired,
  handlePayableCheckbox: PropTypes.func.isRequired,
  flagPaymentsError: PropTypes.bool.isRequired,
  textPaymentsError: PropTypes.string.isRequired,
}

export default PlanPaymentMethods