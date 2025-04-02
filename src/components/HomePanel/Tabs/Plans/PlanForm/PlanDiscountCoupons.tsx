import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, Grid, Typography } from "@mui/material"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanDiscountCoupons"
import CustomLabel from "../../../../Common/CustomLabel"
import AddIcon from "../../../../../img/icons/addIcon.svg?react"


function PlanDiscountCoupons(props) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const handleModal = (status, type, item = null) => {
    if (typeof props.handleModal === "function") {
      props.handleModal(status, type, item)
    }
  }

  return (
    <Grid item container spacing={1}>
      <Grid item container>
        <Typography className={classes.subtitle}>
          {t("homePanel.plans.form.title6")}
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item container sx={{ marginTop: "8px" }}>
          {props.selectedCoupons.length > 0
            ? <Grid className={classes.wrapperLabels}>
              {props.selectedCoupons.map((coupon, index) => {
                return (
                  <CustomLabel
                    key={index}
                    mainText={coupon.name}
                    cleanFunc={() => handleModal(true, "delete", coupon)}
                  />
                )
              })}
              {/* {cleanButtonLabels(() => handleModal(true, "delete"))} */}
              {/* {cleanButtonLabels(cleanAllCoupons)} */}
            </Grid>
            : <Typography className={classes.generalText}>
              {t("homePanel.plans.form.emptyCoupon")}
            </Typography>
          }

        </Grid>
      </Grid>
      <Grid item container className={classes.containerCouponBtn}>
        <Button
          color="primary"
          className={classes.btPrimary}
          sx={{ width: "calc(50% - 4px)" }}
          onClick={() => handleModal(true, "new")}
        >
          <AddIcon />
          <Typography className={classes.textBtn}>
            {t("homePanel.plans.form.labelNewCoupon")}
          </Typography>
        </Button>
        {/* <Button
          color="primary"
          className={classes.btPrimary}
          sx={{ width: "calc(50% - 4px)" }}
          onClick={(event) => handleSelectOptions(event, "coupon")}
        >
          <Typography className={classes.textBtn}>
            {t("homePanel.plans.form.labelListCoupons")}
          </Typography>
          <ExpandMoreIcon fontSize="small" />
        </Button> */}
      </Grid>
    </Grid>
  )
}

PlanDiscountCoupons.propTypes = {
  selectedCoupons: PropTypes.array.isRequired,
  handleModal: PropTypes.func.isRequired,
}

export default PlanDiscountCoupons