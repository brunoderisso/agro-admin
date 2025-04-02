import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"
import moment from "moment"

import { CircularProgress, Grid, Typography } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"

import useStyles from "../../../../styles/Customer/CustomerSubscriptions/SubscriptionCards"
import customerStore from "../../../../stores/CustomerStore"
import CustomModal from "../../../Common/CustomModal"
import theme from "../../../../styles/Utils/Theme"
import ItemSubscriptionCards from "./ItemSubscriptionCards"
import UserFeedback from "../../../Common/UserFeedback"
import couponStore from "../../../../stores/CouponStore"
import FormSubscription from "./FormSubscription"
import planStore from "../../../../stores/PlanStore"
import CancelToken from "../../../../helpers/cancelToken"
import { BannerStatusType } from "../../../../interfaces/Customer/Subscription"


function SubscriptionCards(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [openModal, setOpenModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [flagEditPlan, setFlagEditPlan] = useState(false)
  const [subscriptions, setSubscriptions] = useState(null)
  const [subscriptionToEdit, setSubscriptionToEdit] = useState(null)
  const [subscriptionIdToSuspend, setSubscriptionIdToSuspend] = useState(null)
  const [errorStatusResponse, setErrorStatusResponse] = useState("")

  const couponRef = useRef([])
  const subscriptionRef = useRef([])

  const suspendModalButtons = [
    { label: t("general.modalCancelBtn"), action: (status) => handleModal(status) },
    { label: "Suspender assinatura", action: () => suspendPlan(), color: theme.colors.error[40] }
  ]

  useEffect(() => {
    const controller = new AbortController()

    if (props.customer.objectid) {
      getCoupons()
    }

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.customer.objectid])

  const getCoupons = () => {
    setLoader(true)
    couponStore.getListCoupons(CancelToken(), null, responseGetCoupons)
  }

  const responseGetCoupons = (response) => {
    CancelToken().remove(response.id)

    if (response.data?.itens) {
      couponRef.current = response.data.itens

      getSubscriptions()
    }

    if (response.status && response.status !== 404) {
      setLoader(false)
      setErrorStatusResponse(response.status.toString())
    }
  }

  const getSubscriptions = () => {
    setLoader(true)
    customerStore.getSubscriptionsByCustomer(CancelToken(), props.customer.objectid, responseGetSubscriptions)
  }

  const responseGetSubscriptions = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      const data = response.data.items
      const newSubscriptions = data.map((subscription, index) => {
        const objectBanner: BannerStatusType = { status: false, content: "", buttons: null }
        let statusSubscription = "Ativo"
        let isStatusActive = true
        let additionalPrice = 0
        let hectare = 0
        let additionalItems = []
        // MOCK
        if (index === 0 || index === 2) {
          subscription.coupon = {
            coupon_objectid: "cma27pec3uks73coka00",
            name: "agora",
            discount: 0.22
          }
          subscription.subitems = [
            {
              "objectid": "ckts6c6c3uks73f0f4v0",
              "description": "area",
              "price_cents": 100,
              "quantity": 16,
            },
            {
              "objectid": "ckts6c6c3uks73f0f4v0",
              "description": "activation",
              "price_cents": 9990,
              "quantity": 1,
            }
          ]
        }

        if (subscription.suspended) {
          objectBanner.status = true
          objectBanner.content = "A conta está suspensa devido à falta de pagamento. É preciso regularizar a situação para reativar a conta."
          objectBanner.buttons = [{ label: "Gerar pagamento", href: subscription.last_invoice?.secure_url || null }]
          statusSubscription = "Conta suspensa"
          isStatusActive = false

          props.handleBanner(objectBanner)
        } else if (subscription.last_invoice?.status !== "paid") {
          objectBanner.status = true
          objectBanner.content = "Há pagamentos pendentes. É preciso regularizar a situação antes que a conta seja suspensa."
          objectBanner.buttons = [{ label: "Gerar pagamento", href: subscription.last_invoice?.secure_url || null }]
          statusSubscription = "Pagamento pendente"
          isStatusActive = false

          props.handleBanner(objectBanner)
        }

        if (subscription?.subitems) {
          let area = subscription.subitems.find((item) => { return item.description === "area" })
          if (area) {
            additionalPrice = area?.price_cents * area?.quantity
            hectare = area?.quantity
          }
          subscription.subitems.forEach(subitem => {
            if (subitem?.description !== "area") {
              let item = {
                description: subitem.description,
                value: subitem.price_cents
              }
              additionalItems.push(item)
            }
          })
        }

        return {
          id: subscription.id,
          identifier: subscription.plan_identifier,
          price: subscription.price_cents,
          additionalPrice: additionalPrice,
          hectare: hectare,
          additionalItems,
          expiresAt: subscription.last_invoice?.due_date ? moment(subscription.last_invoice.due_date).format("DD/MM/YYYY") : null,
          totalPortion: subscription.cycles_count && subscription.max_cycles
            ? `${subscription.cycles_count}/${subscription.max_cycles}`
            : null,
          objectid: subscription.objectid,
          flagStatus: isStatusActive,
          textStatus: statusSubscription,
          coupon: couponRef.current.find(coupon => coupon.objectid === subscription.coupon?.coupon_objectid),
          pixQrCode: subscription.last_invoice?.pix?.qrcode || null,
          paymentMethod: subscription.last_invoice?.payment_method,
          ccBrand: subscription.last_invoice?.credit_card_brand,
          ccFinalNumber: subscription.last_invoice?.credit_card_last_4,
        }
      })

      subscriptionRef.current = newSubscriptions
      setSubscriptions(newSubscriptions)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const handleModal = (status, subscriptionId = null) => {
    setOpenModal(status)

    if (subscriptionId) {
      setSubscriptionIdToSuspend(subscriptionId)
    }
  }

  const suspendPlan = () => {
    setLoader(true)
    planStore.postSuspendSubscription(CancelToken(), subscriptionIdToSuspend, responseSuspendPlan)
  }

  const responseSuspendPlan = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setOpenModal(false)
      setErrorStatusResponse("200")
      getSubscriptions()
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const changePlan = (subscription) => {
    setFlagEditPlan(true)
    setSubscriptionToEdit(subscription)
    props.handleBanner({ status: false })
  }

  const bodyModal = () => {
    return (
      <Grid>
        <Typography className={classes.textItemMenu}>
          Tem certeza que deseja continuar? O usuário ficará sem assinatura.
        </Typography>
        <Grid container className={classes.contentWarningText}>
          <Grid item xs={1}>
            <InfoIcon className={classes.iconWarning} />
          </Grid>
          <Grid item xs={11}>
            <Typography className={classes.warningText}>
              {t("homePanel.customers.modal.secondaryTextSuspend")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid>
      {!loader && !flagEditPlan && subscriptions && subscriptions.map((subscription, index) => {
        return (
          <ItemSubscriptionCards
            key={index}
            handleModal={handleModal}
            subscription={subscription}
            customerId={props.customer.objectid}
            handleSubscriptions={changePlan}
          />
        )
      })}
      {!loader && (subscriptions?.length === 0 || flagEditPlan) &&
        <FormSubscription
          customer={props.customer}
          coupons={couponRef.current}
          callGetSubscriptions={getSubscriptions}
          subscription={subscriptionToEdit}
        />
      }
      {loader &&
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 64px)" }}>
          <CircularProgress />
        </Grid>
      }
      <CustomModal
        open={openModal}
        dispense={suspendModalButtons[0]}
        confirm={suspendModalButtons[1]}
        title={"Suspender assinatura"}
        size={"medium"}
        loader={loader}
      >
        {bodyModal()}
      </CustomModal>
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </Grid>
  )
}

SubscriptionCards.propTypes = {
  customer: PropTypes.any,
  handleBanner: PropTypes.func.isRequired,
}

export default SubscriptionCards