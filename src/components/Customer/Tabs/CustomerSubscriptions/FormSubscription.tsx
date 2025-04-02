import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, Card, CircularProgress, FormHelperText, Grid, InputLabel, ListSubheader, MenuItem, Select, Typography } from "@mui/material"

import useStyles from "../../../../styles/Customer/CustomerSubscriptions/FormSubscription"
import planStore from "../../../../stores/PlanStore"
import UserFeedback from "../../../Common/UserFeedback"
import ThemedSelectFormControl from "../../../Common/Themed/ThemedSelectFormControl"
import ArrowDownIcon from "../../../../img/icons/arrowDown.svg?react"
import CancelToken from "../../../../helpers/cancelToken"
import { SubscriptionType } from "../../../../interfaces/Customer/Subscription"
import { PlansType } from "../../../../interfaces/Plans"
import { CouponType } from "../../../../interfaces/Coupons"


function FormSubscription(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()

  const [plans, setPlans] = useState<PlansType[]>([])
  const [selectedPlanId, setSelectedPlanId] = useState<string>("")
  const [selectedPlanName, setSelectedPlanName] = useState<string>("")
  const [coupons, setCoupons] = useState<CouponType[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState<string>("")
  const [flagPlansError, setFlagPlansError] = useState<boolean>(false)
  const [textPlansError, setTextPlansError] = useState<string>("")
  const [flagCouponsError, setFlagCouponsError] = useState<boolean>(false)
  const [textCouponsError, setTextCouponsError] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false)
  const [loaderBt, setLoaderBt] = useState<boolean>(false)
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()

    getPlans()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (props.coupons) {
      setCoupons(props.coupons)
    }
  }, [props.coupons])

  useEffect(() => {
    if (props.subscription?.identifier) {
      setSelectedPlanName(props.subscription.identifier)
    }
  }, [props.subscription])

  useEffect(() => {
    if (selectedPlanId.length > 0) {
      setFlagPlansError(false)
      setTextPlansError("")
    }
  }, [selectedPlanId])

  useEffect(() => {
    if (plans.length > 0 && selectedPlanName.length > 0) {
      const newPlan = plans.find(plan => plan.identifier === selectedPlanName)

      if (newPlan) {
        setSelectedPlanId(newPlan.objectid)
      }
    }
  }, [plans, selectedPlanName])

  useEffect(() => {
    if (selectedCoupon.length > 0) {
      setFlagCouponsError(false)
      setTextCouponsError("")
    }
  }, [selectedCoupon])

  const getPlans = () => {
    setLoader(true)
    planStore.getListPlans(CancelToken(), null, responseGetPlans)
  }

  const responseGetPlans = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setPlans(response.data.items || [])
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const handleChangePlan = (event) => {
    setSelectedPlanId(event.target.value)

    if (props.subscription) {
      const newPlan = plans.find(plan => plan.objectid === event.target.value)

      setSelectedPlanName(newPlan.identifier)
    }
  }

  const handleChangeCoupon = (event) => {
    setSelectedCoupon(event.target.value)
  }

  const filterCouponsByPlan = () => {
    const newCoupons = coupons.filter(coupon => coupon.plan_objectid === selectedPlanId)

    return (
      newCoupons.length > 0
        ? newCoupons.map((coupon, index) => {
          return <MenuItem key={index} value={coupon.objectid}>{coupon.name}</MenuItem>
        })
        : <ListSubheader>
          <Grid>O plano não possui cupons</Grid>
        </ListSubheader>
    )
  }

  const newSubscription = () => {
    if (selectedPlanId.length > 0) {
      setLoaderBt(true)

      if (props.subscription) {
        const body: SubscriptionType = {
          plan_identifier: selectedPlanName
        }

        planStore.putSubscription(CancelToken(), props.subscription.objectid, body, responseNewOrUpdateSubscription)
      } else {
        const body: SubscriptionType = {
          plan_objectid: selectedPlanId,
          customer_objectid: props.customer.objectid,
        }

        if (selectedCoupon.length > 0) {
          body.coupon_objectid = selectedCoupon
        }

        planStore.postSubscription(CancelToken(), body, responseNewOrUpdateSubscription)
      }
    } else {
      setFlagPlansError(true)
      setTextPlansError(t("general.errorMessage3"))
    }
  }

  const responseNewOrUpdateSubscription = (response) => {
    CancelToken().remove(response.id)
    setLoaderBt(false)

    if (response.data) {
      setErrorStatusResponse("200")

      if (typeof props.callGetSubscriptions === "function") {
        props.callGetSubscriptions()
      }
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  return (
    <Grid>
      {!loader &&
        <Card className={classes.wrapperCard}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
                Nome
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {props.customer?.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
                E-mail
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {props.customer?.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "15px" }}>
            <ThemedSelectFormControl fullWidth size="small">
              <InputLabel id="select-label-plan">{t("homePanel.coupons.modal.labelSelect")}</InputLabel>
              <Select
                labelId="select-label-plan"
                id="select-plan"
                value={selectedPlanId}
                label={t("homePanel.coupons.modal.labelSelect")}
                IconComponent={ArrowDownIcon}
                onChange={handleChangePlan}
                error={flagPlansError}
              >
                {plans.map((plan, index) => {
                  return <MenuItem key={index} value={plan.objectid}>{plan.name}</MenuItem>
                })}
              </Select>
              {flagPlansError &&
                <FormHelperText className={classes.errorMessage}>{textPlansError}</FormHelperText>
              }
            </ThemedSelectFormControl>
          </Grid>
          {!props.subscription &&
            <Grid container sx={{ marginTop: "15px" }}>
              <ThemedSelectFormControl fullWidth size="small">
                <InputLabel id="select-label-coupon">Cupom</InputLabel>
                <Select
                  labelId="select-label-coupon"
                  id="select-coupon"
                  value={selectedCoupon}
                  label="Cupom"
                  onChange={handleChangeCoupon}
                  IconComponent={ArrowDownIcon}
                  error={flagCouponsError}
                  disabled={selectedPlanId.length === 0}
                >
                  {filterCouponsByPlan()}
                </Select>
                {flagCouponsError &&
                  <FormHelperText className={classes.errorMessage}>{textCouponsError}</FormHelperText>
                }
              </ThemedSelectFormControl>
            </Grid>
          }
          <Grid container sx={{ marginTop: "15px" }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              className={classes.btnSuccess}
              onClick={newSubscription}
              disabled={loaderBt}
            >
              {!loaderBt &&
                <Typography className={classes.textSuccess}>
                  {props.subscription ? "Alterar assinatura" : "Criar assinatura"}
                </Typography>
              }
              {loaderBt && <CircularProgress className={classes.loader} />}
            </Button>
          </Grid>
        </Card>
      }
      {loader &&
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 64px)" }}>
          <CircularProgress />
        </Grid>
      }
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </Grid>
  )
}

FormSubscription.propTypes = {
  customer: PropTypes.any,
  coupons: PropTypes.arrayOf(
    PropTypes.shape({
      objectid: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  callGetSubscriptions: PropTypes.func.isRequired,
  subscription: PropTypes.shape({
    objectid: PropTypes.string,
    identifier: PropTypes.string,
  })
}

export default FormSubscription