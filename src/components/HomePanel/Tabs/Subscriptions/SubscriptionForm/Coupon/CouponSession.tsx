import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Grid, Skeleton, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/CouponSession"
import CouponSelect from "./CouponSelect"
import couponStore from "../../../../../../stores/CouponStore"
import CancelToken from "../../../../../../helpers/cancelToken"
import { useCouponStore, usePlanStore } from "../../../../../../stores/SubscriptionStore"


function CouponSession({ handleErrorStatus }) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [coupons, setCoupons] = useState([])
  const [couponsByPlan, setCouponsByPlan] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const planStore = usePlanStore()
  const couponStateStore = useCouponStore()

  const flagGetPropertiesRef = useRef<boolean>(false)

  useEffect(() => {
    if (planStore.selected && !flagGetPropertiesRef.current) {
      getCoupons()
    } else if (planStore.selected && flagGetPropertiesRef.current) {
      couponStateStore.setSelected(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planStore.selected])

  useEffect(() => {
    if (planStore.selected) {
      const newCouponsByPlan = coupons.filter(coupon => coupon.plan_objectid === planStore.selected.objectid)

      if (newCouponsByPlan) {
        setCouponsByPlan(newCouponsByPlan)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planStore.selected, coupons])

  const getCoupons = () => {
    setLoading(true)
    flagGetPropertiesRef.current = true
    couponStore.getListCoupons(CancelToken(), null, responseGetCoupon)
  }

  const responseGetCoupon = (response) => {
    CancelToken().remove(response.id)
    setLoading(false)

    if (response.data?.itens?.length > 0) {
      setCoupons(response.data.itens)
    }

    if (response.status) {
      flagGetPropertiesRef.current = false
      handleErrorStatus(response.status.toString())
    }
  }

  return (
    <Grid container className={classes.container}>
      <Grid item container className={classes.header}>
        <Typography variant="overline" className={classes.title}>
          {t("homePanel.subscriptions.coupon")}
        </Typography>
        <Typography variant="caption" className={classes.text}>
          {t("general.optional")}
        </Typography>
      </Grid>
      <Grid item container>
        {loading
          ? <Skeleton variant="rounded" width={"100%"} height={39} />
          : <CouponSelect coupons={couponsByPlan} />
        }
      </Grid>
    </Grid>
  )
}

CouponSession.propTypes = {
  handleErrorStatus: PropTypes.func.isRequired
}

export default CouponSession