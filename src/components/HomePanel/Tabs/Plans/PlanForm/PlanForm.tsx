import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import InputMask from "react-input-mask"

import moment from "moment"

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  RadioGroup,
  Typography
} from "@mui/material"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanForm"
import CustomCheckBox from "../../../../Common/Themed/ThemedCheckBox"
import planStore from "../../../../../stores/PlanStore"
import CustomRadio from "../../../../Common/Themed/ThemedRadio"
import CustomModal from "../../../../Common/CustomModal"
import couponStore from "../../../../../stores/CouponStore"

import theme from "../../../../../styles/Utils/Theme"
import UserFeedback from "../../../../Common/UserFeedback"
import masksUtils from "../../../../../utils/MasksUtils"
import stringsUtils from "../../../../../utils/StringUtils"
import ThemedTextField from "../../../../Common/Themed/ThemedTextField"
import PlanMainInformation from "./PlanMainInformation"
import PlanAvailability from "./PlanAvailability"
import PlanFeatures from "./PlanFeatures"
import PlanAdditionalItems from "./PlanAdditionalItems"
import PlanBillingInterval from "./PlanBillingInterval"
import PlanPaymentMethods from "./PlanPaymentMethods"
import PlanDiscountCoupons from "./PlanDiscountCoupons"
import PlanFeaturesDrawer from "./PlanFeaturesDrawer"
import PlanResumeCard from "./PlanResumeCard"
import CancelToken from "../../../../../helpers/cancelToken"
import { PlansType, SubItemType } from "../../../../../interfaces/Plans"
import { CouponType } from "../../../../../interfaces/Coupons"


function PlanForm() {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  const [typeModal, setTypeModal] = useState<string>("")
  const [titleModal, setTitleModal] = useState<string>("")
  const [title, setTitle] = useState<string>(t("homePanel.plans.form.titleNew"))
  const [name, setName] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [description, setDescription] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [subitems, setSubitems] = useState<SubItemType[]>([])
  const [codeCoupon, setCodeCoupon] = useState<string>("")
  const [discountCoupon, setDiscountCoupon] = useState<string | number>("")
  const [amountCoupon, setAmountCoupon] = useState<string | number>("")
  const [endDateCoupon, setEndDateCoupon] = useState<string>("")
  const [active, setActive] = useState<boolean>(true)
  const [showOnline, setShowOnline] = useState<boolean>(true)
  const [pix, setPix] = useState<boolean>(false)
  const [bankSlip, setBankSlip] = useState<boolean>(false)
  const [cardCredit, setCardCredit] = useState<boolean>(false)
  const [payable, setPayable] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [coupons, setCoupons] = useState<CouponType[]>([])
  const [couponsCheckbox, setCouponsCheckbox] = useState(null)
  const [selectedCoupons, setSelectedCoupons] = useState<CouponType[]>([])
  const [couponToRemove, setCouponToRemove] = useState<CouponType>(null)
  const [intervalRadio, setIntervalRadio] = useState<string>("months")
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")
  const [flagNameError, setFlagNameError] = useState<boolean>(false)
  const [textNameError, setTextNameError] = useState<string>("")
  const [flagPriceError, setFlagPriceError] = useState<boolean>(false)
  const [textPriceError, setTextPriceError] = useState<string>("")
  const [flagDescriptionError, setFlagDescriptionError] = useState<boolean>(false)
  const [textDescriptionError, setTextDescriptionError] = useState<string>("")
  const [flagPaymentsError, setFlagPaymentsError] = useState<boolean>(false)
  const [textPaymentsError, setTextPaymentsError] = useState<string>("")
  const [flagCodeCouponError, setFlagCodeCouponError] = useState<boolean>(false)
  const [textCodeCouponError, setTextCodeCouponError] = useState<string>("")
  const [flagDiscountCouponError, setFlagDiscountCouponError] = useState<boolean>(false)
  const [textDiscountCouponError, setTextDiscountCouponError] = useState<string>("")
  const [flagAmountCouponError, setFlagAmountCouponError] = useState<boolean>(false)
  const [textAmountCouponError, setTextAmountCouponError] = useState<string>("")
  const [flagEndDateCouponError, setFlagEndDateCouponError] = useState<boolean>(false)
  const [textEndDateCouponError, setTextEndDateCouponError] = useState<string>("")
  const [recurrentRadio, setRecurrentRadio] = useState<boolean>(true)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [totalAdditional, setTotalAdditional] = useState<number>(0)
  const [totalFeatures, setTotalFeatures] = useState<number>(0)

  const couponsRef = useRef<CouponType[]>([])
  const payableWithRef = useRef<string[]>([])
  const totalRequestsUpdatePlanRef = useRef<number>(2)
  const numberRequestsUpdatePlanRef = useRef<number>(0)

  const couponModalButtons = [
    { label: t("general.modalCancelBtn"), action: (status) => setOpenModal(status) },
    { label: t("general.modalSaveBtn"), action: () => createCoupon() },
    { label: t("general.modalRemoveBtn"), action: () => removeCoupon(), color: theme.colors.error[40] },
  ]

  const optionRecurrent = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ]

  useEffect(() => {
    const controller = new AbortController()

    if (id) {
      setTitle(t("homePanel.plans.form.titleEdit"))
      getCoupons()

      planStore.storeCheckboxServicesFeatures(null)
      planStore.storeValueServicesFeatures(null)
      planStore.storeFeaturesByPlan([])
      planStore.storeServicesId(null)
    } else {
      setLoader(false)

      setSubitems([
        {
          description: "area",
          price_cents: 100,
          recurrent: true
        }
      ])
    }

    return () => controller.abort()
  }, [id])

  useEffect(() => {
    if (name.length > 0) {
      setFlagNameError(false)
      setTextNameError("")
    }
  }, [name])

  useEffect(() => {
    if (description.length > 0) {
      setFlagDescriptionError(false)
      setTextDescriptionError("")
    }
  }, [description])

  useEffect(() => {
    if (!payable || (payable && price > 0)) {
      setFlagPriceError(false)
      setTextPriceError("")
    }
  }, [price, payable])

  useEffect(() => {
    if (!payable || (payable && ((pix && bankSlip) || (pix && cardCredit) || (bankSlip && cardCredit)))) {
      setFlagPaymentsError(false)
      setTextPaymentsError("")
    }
  }, [payable, pix, bankSlip, cardCredit])

  useEffect(() => {
    if (!payable) {
      setPix(false)
      setBankSlip(false)
      setCardCredit(false)
    }
  }, [payable])

  useEffect(() => {
    if (codeCoupon.length > 0) {
      setFlagCodeCouponError(false)
      setTextCodeCouponError("")
    }
  }, [codeCoupon])

  useEffect(() => {
    if (typeof discountCoupon === "number" && discountCoupon > 0) {
      setFlagDiscountCouponError(false)
      setTextDiscountCouponError("")
    }
  }, [discountCoupon])

  useEffect(() => {
    if (typeof amountCoupon === "number" && amountCoupon > 0) {
      setFlagAmountCouponError(false)
      setTextAmountCouponError("")
    }
  }, [amountCoupon])

  useEffect(() => {
    if (endDateCoupon.length > 0) {
      setFlagEndDateCouponError(false)
      setTextEndDateCouponError("")
    }
  }, [endDateCoupon])

  useEffect(() => {
    if (typeModal === "new") {
      setTitleModal(t("homePanel.plans.form.labelNewCoupon"))
    } else if (typeModal === "delete") {
      setTitleModal(t("homePanel.plans.form.labelDeleteCoupon"))
    }
  }, [typeModal])

  useEffect(() => {
    let valueItems = 0

    subitems.forEach(items => {
      if (items.price_cents) {
        valueItems += items.price_cents
      }
    })

    setTotalAdditional(valueItems)
  }, [subitems])

  const backToPlans = () => {
    navigate("/plan?start=0&limit=10")
  }

  const getPlan = () => {
    setLoader(true)
    planStore.getPlan(CancelToken(), id, responseGetPlan)
  }

  const responseGetPlan = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      const plan = response.data

      setName(plan.name || "")
      setPrice(plan.value_cents || 0)
      setDescription(plan.description || "")
      setNotes(plan.notes || "")
      setActive(plan.enable || false)
      setShowOnline(plan.is_visible || false)
      setIntervalRadio(plan.interval_type || "")
      setSubitems(plan.subitems || [])
      setPayable(plan.payable || false)

      plan.payable_with.forEach(method => {
        switch (method) {
          case "all": {
            setPix(true)
            setBankSlip(true)
            setCardCredit(true)

            break
          }
          case "credit_card": {
            setCardCredit(true)

            break
          }
          case "bank_slip": {
            setBankSlip(true)

            break
          }
          case "pix": {
            setPix(true)

            break
          }
          default: {
            break
          }
        }
      })

      const newCoupons = []

      couponsRef.current.forEach(coupon => {
        if (coupon.plan_objectid === plan.objectid) {
          newCoupons.push(coupon)
        }
      })

      setSelectedCoupons(newCoupons)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const getCoupons = () => {
    couponStore.getListCoupons(CancelToken(), null, responseGetCoupons)
  }

  const responseGetCoupons = (response) => {
    CancelToken().remove(response.id)

    if (response.data?.itens) {
      const newCoupons = []
      const newCouponsCheckboxes = {}

      response.data.itens.forEach(coupon => {
        newCoupons.push(coupon)
        newCouponsCheckboxes[coupon.name] = false
      })

      setCouponsCheckbox(newCouponsCheckboxes)
      setCoupons(newCoupons)
      couponsRef.current = newCoupons

      getPlan()
    }
  }

  const createCoupon = () => {
    if (codeCoupon !== "" && (discountCoupon !== "" || (typeof discountCoupon === "number" && discountCoupon > 0))
      && (amountCoupon !== "" || (typeof amountCoupon === "number" && amountCoupon > 0)) && endDateCoupon !== ""
    ) {
      const newCoupon = {
        plan_objectid: id,
        name: codeCoupon,
        discount: masksUtils.percentNumber(discountCoupon),
        enable: true,
        amount: amountCoupon,
        expirer_at: moment(endDateCoupon, "DD MM YYYY").format(),
        recurrent: recurrentRadio
      }

      setLoader(true)
      couponStore.postCoupon(CancelToken(), newCoupon, responseCreateCoupon)
    } else {
      handleFieldsError()
    }
  }

  const responseCreateCoupon = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setSelectedCoupons([...selectedCoupons, { ...response.data.coupon, objectid: response.data.objectid }])
      setErrorStatusResponse("200")
      handleModal(false, "new")

      setCodeCoupon("")
      setDiscountCoupon("")
      setAmountCoupon("")
      setEndDateCoupon("")
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const removeCoupon = () => {
    setLoader(true)
    handleModal(false, "delete")
    couponStore.archiveCoupon(CancelToken(), couponToRemove.objectid, responseRemoveCoupon)
  }

  const responseRemoveCoupon = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data?.status === 200) {
      getCoupons()

      setErrorStatusResponse(response.data.status.toString())
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const confirmPlan = () => {
    const payableWith = []

    if (pix) {
      payableWith.push("pix")
    }

    if (bankSlip) {
      payableWith.push("bank_slip")
    }

    if (cardCredit) {
      payableWith.push("credit_card")
    }

    payableWithRef.current = payableWith

    if (name !== "" && description !== "" && intervalRadio !== "" &&
      (!payable || (payable && payableWith.length > 1)) && (!payable || (payable && price > 0))
    ) {
      const newPlan: PlansType = {
        name,
        identifier: stringsUtils.slugURL(name),
        description,
        value_cents: price,
        interval: 1,
        interval_type: intervalRadio,
        notes,
        enable: active,
        is_visible: showOnline,
        max_cycles: 0,
        billing_days: 7,
        environment_quantity: 1,
        payable
      }

      newPlan.payable_with = payableWith

      setLoader(true)
      planStore.postPlan(CancelToken(), newPlan, responseConfirmPlan)
    } else {
      handleFieldsError()
    }
  }

  const responseConfirmPlan = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      postSubitems(response.data.objectid)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const postSubitems = (id) => {
    subitems.forEach((item) => {
      planStore.postSubitemPlan(CancelToken(), { plan_objectid: id, ...item }, responsePostSubitem)
    })

    navigate("/plan/" + id + "/edit")
    setErrorStatusResponse("200")
  }

  const responsePostSubitem = (response) => {
    CancelToken().remove(response.id);

    numberRequestsUpdatePlanRef.current += 1

    if (numberRequestsUpdatePlanRef.current === totalRequestsUpdatePlanRef.current) {
      setLoader(false)
    }
  }

  const handleCheckFeaturesByPlan = () => {
    Object.entries(planStore.getCheckboxServicesFeatures()).forEach(([serviceName, features]) => {
      Object.keys(features).forEach(featureId => {
        const foundedFeature = planStore.getFeaturesByPlan().find(feature => feature.objectid === featureId)

        if (foundedFeature && !features[featureId]) {
          // Se encontrou a feature e o checkbox está desmarcado, então remove a feature do plano
          totalRequestsUpdatePlanRef.current += 1

          planStore.deleteFeatureByPlan(CancelToken(), id, featureId, responseHandleFeatureByPlan)
        } else if (!foundedFeature && features[featureId]) {
          // Se não encontrou a feature e o checkbox está marcado, então adiciona a feature no plano

          planStore.getFullServices().forEach(service => {
            if (service.name === serviceName) {
              const foundedFeature = service.features.find(feature => feature.objectid === featureId)

              if (foundedFeature) {
                const body = {
                  objectid: foundedFeature.objectid,
                  service_objectid: foundedFeature.service_objectid,
                  name: foundedFeature.name,
                  enable: foundedFeature.enable,
                  identifier: foundedFeature.identifier,
                  value: planStore.getValueServicesFeatures()[foundedFeature.objectid].length > 0
                    ? +planStore.getValueServicesFeatures()[foundedFeature.objectid]
                    : null
                }

                totalRequestsUpdatePlanRef.current += 1
                planStore.postFeatureByPlan(CancelToken(), id, body, responseHandleFeatureByPlan)
                return
              }
            }
          })
        } else if (foundedFeature && features[featureId]) {
          // se mudar o valor de uma feature que já esteja associada no plano, atualizar esse valor

          if (!foundedFeature.value) {
            foundedFeature.value = 0
          }

          if (+planStore.getValueServicesFeatures()[featureId] !== foundedFeature.value) {
            const body = {
              value: planStore.getValueServicesFeatures()[foundedFeature.objectid].length > 0
                ? +planStore.getValueServicesFeatures()[foundedFeature.objectid]
                : null
            }

            totalRequestsUpdatePlanRef.current += 1
            planStore.updateFeatureByPlan(CancelToken(), id, featureId, body, responseHandleFeatureByPlan)
          }
        }
      })
    })
  }

  const responseHandleFeatureByPlan = (response) => {
    CancelToken().remove(response.id)

    numberRequestsUpdatePlanRef.current += 1

    if (numberRequestsUpdatePlanRef.current === totalRequestsUpdatePlanRef.current) {
      setLoader(false)
    }
  }

  const updatePlan = () => {
    const payableWith = []

    if (pix) {
      payableWith.push("pix")
    }

    if (bankSlip) {
      payableWith.push("bank_slip")
    }

    if (cardCredit) {
      payableWith.push("credit_card")
    }

    payableWithRef.current = payableWith

    if (
      name !== "" && description !== "" && intervalRadio !== "" &&
      (!payable || (payable && payableWith.length > 1)) && (!payable || (payable && price > 0))
    ) {
      const newPlan: PlansType = {
        name,
        description,
        value_cents: price,
        interval_type: intervalRadio,
        notes,
        enable: active,
        is_visible: showOnline,
        payable
      }

      newPlan.payable_with = payableWith

      setLoader(true)
      planStore.updatePlan(CancelToken(), id, newPlan, responseUpdatePlan)
      updateSubitems()

      if (planStore.getCheckboxServicesFeatures() && planStore.getValueServicesFeatures() && planStore.getServicesId()) {
        handleCheckFeaturesByPlan()
      }
    } else {
      handleFieldsError()
    }
  }

  const responseUpdatePlan = (response) => {
    CancelToken().remove(response.id)
    numberRequestsUpdatePlanRef.current += 1

    if (numberRequestsUpdatePlanRef.current === totalRequestsUpdatePlanRef.current) {
      setLoader(false)
    }

    if (response.data?.status === 200) {
      navigate("/plan?start=0&limit=10")
      planStore.setErrorStatus(response.data.status.toString())
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const updateSubitems = () => {
    subitems.forEach((item) => {
      if (item.objectid) {
        planStore.updateSubitemPlan(CancelToken(), item, responsePostSubitem)
      } else {
        planStore.postSubitemPlan(CancelToken(), { plan_objectid: id, ...item }, responsePostSubitem)
      }
    })
  }

  const handleFieldsError = () => {
    if (name.length === 0) {
      setFlagNameError(true)
      setTextNameError(t("general.errorMessage1"))
    }

    if (description.length === 0) {
      setFlagDescriptionError(true)
      setTextDescriptionError(t("general.errorMessage1"))
    }

    if (payable && price === 0) {
      setFlagPriceError(true)
      setTextPriceError(t("general.errorMessage1"))
    }

    if (payable && payableWithRef.current.length < 2) {
      setFlagPaymentsError(true)
      setTextPaymentsError(t("general.errorMessage5"))
    }

    if (codeCoupon.length === 0) {
      setFlagCodeCouponError(true)
      setTextCodeCouponError(t("general.errorMessage1"))
    }

    if ((typeof discountCoupon === "string" && discountCoupon.length === 0) || discountCoupon === 0) {
      setFlagDiscountCouponError(true)
      setTextDiscountCouponError(t("general.errorMessage1"))
    }

    if ((typeof amountCoupon === "string" && amountCoupon.length === 0) || amountCoupon === 0) {
      setFlagAmountCouponError(true)
      setTextAmountCouponError(t("general.errorMessage1"))
    }

    if (endDateCoupon.length === 0) {
      setFlagEndDateCouponError(true)
      setTextEndDateCouponError(t("general.errorMessage1"))
    }
  }

  const handleChangeInput = (event) => {
    if (event.target.name === "codeCoupon") {
      setCodeCoupon(event.target.value)
    } else if (event.target.name === "discountCoupon") {
      setDiscountCoupon(+event.target.value)
    } else if (event.target.name === "amountCoupon") {
      setAmountCoupon(+event.target.value)
    } else if (event.target.name === "endDateCoupon") {
      setEndDateCoupon(event.target.value)
    }
  }

  const handlePixCheckbox = (event) => {
    setPix(event.target.checked)
  }

  const handleBankSlipCheckbox = (event) => {
    setBankSlip(event.target.checked)
  }

  const handleCardCreditCheckbox = (event) => {
    setCardCredit(event.target.checked)
  }

  const handlePayableCheckbox = (event) => {
    setPayable(event.target.checked)
  }

  // aqui
  // const handleSelectCoupons = (event, type) => {
  //   setAnchorEl(event.currentTarget)
  // }

  const handleIntervalRadio = (event) => {
    setIntervalRadio(event.target.value)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleCouponsCheckboxes = (event) => {
    const newCoupon = coupons.filter(coupon => coupon.name === event.target.name)[0]

    if (event.target.checked) {
      setSelectedCoupons([...selectedCoupons, newCoupon])
    } else {
      cleanLabelCoupons(event.target.name)
    }

    setCouponsCheckbox({ ...couponsCheckbox, [event.target.name]: event.target.checked })
  }

  const cleanLabelCoupons = (selectedItem) => {
    selectedCoupons.forEach((coupon, index) => {
      if (coupon.name === selectedItem) {
        const newSelectedCoupons = [...selectedCoupons]

        newSelectedCoupons.splice(index, 1)
        setSelectedCoupons(newSelectedCoupons)

        return
      }
    })
  }

  // const cleanButtonLabels = (func) => {
  //   return (
  //     <Button
  //       color="primary"
  //       className={classes.btPrimary}
  //       style={{ height: "38px" }}
  //       onClick={func}
  //     >
  //       <Typography className={classes.textBtn}>
  //         {t("general.filterClean")}
  //       </Typography>
  //     </Button>
  //   )
  // }

  // const cleanAllCoupons = () => {
  //   const newCouponCheckboxes = {}

  //   coupons.forEach(coupon => {
  //     newCouponCheckboxes[coupon.name] = false
  //   })

  //   setCouponsCheckbox(newCouponCheckboxes)
  //   setSelectedCoupons([])
  // }

  const handleModal = (status, type, item = null) => {
    setOpenModal(status)
    setTypeModal(type)

    if (item) {
      setCouponToRemove(item)
    }
  }

  const handleRecurrentRadio = (event) => {
    setRecurrentRadio(event.target.value === "true")
  }

  const bodyModal = () => {
    return (
      <Grid>
        {typeModal === "new"
          ? bodyModalNewCoupon()
          : bodyModalDeleteCoupon()
        }
      </Grid>
    )
  }

  const bodyModalNewCoupon = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <ThemedTextField
              name="codeCoupon"
              InputLabelProps={{
                shrink: true,
              }}
              value={codeCoupon}
              onChange={handleChangeInput}
              label={t("homePanel.plans.form.inputCodeCoupon")}
              placeholder={t("homePanel.plans.form.placeholderCodeCoupon")}
              variant="outlined"
              size="small"
              error={flagCodeCouponError}
              helperText={textCodeCouponError}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <ThemedTextField
              name="discountCoupon"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>
              }}
              className={classes.inputAdornment}
              value={discountCoupon}
              onChange={handleChangeInput}
              label={t("homePanel.plans.form.inputDiscountCoupon")}
              variant="outlined"
              size="small"
              type="number"
              error={flagDiscountCouponError}
              helperText={textDiscountCouponError}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <ThemedTextField
              name="amountCoupon"
              InputLabelProps={{
                shrink: true,
              }}
              value={amountCoupon}
              onChange={handleChangeInput}
              label={t("homePanel.plans.form.inputAmountCoupon")}
              placeholder={t("homePanel.plans.form.placeholderAmountCoupon")}
              variant="outlined"
              size="small"
              type="number"
              error={flagAmountCouponError}
              helperText={textAmountCouponError}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputMask
              mask={"99/99/9999"}
              name="endDateCoupon"
              InputLabelProps={{
                shrink: true,
              }}
              value={endDateCoupon}
              onChange={handleChangeInput}
              label={t("homePanel.plans.form.inputEndDateCoupon")}
              placeholder={t("homePanel.plans.form.placeholderDate")}
              variant="outlined"
              size="small"
              error={flagEndDateCouponError}
              helperText={textEndDateCouponError}
            >
              {(inputProps) =>
                <ThemedTextField
                  {...inputProps} />
              }
            </InputMask>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.subtitle}>
            Recorrente
          </Typography>
          <FormControl fullWidth>
            <RadioGroup
              row
              aria-labelledby="interval-billing-radio-label"
              name="row-interval-billing-radio-label"
              defaultValue="monthly"
              value={recurrentRadio}
              onChange={handleRecurrentRadio}
            >
              {optionRecurrent.map((option, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    className={classes.modalRadio}
                    value={option.value}
                    control={<CustomRadio />}
                    label={option.label}

                  />
                )
              })}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    )
  }

  const bodyModalDeleteCoupon = () => {
    return (
      <Grid>
        <Typography className={classes.textForm}>{t("homePanel.coupons.modal.mainText")}</Typography>
      </Grid>
    )
  }

  const onChangeSubitemRecurrent = (index) => {
    let itens = subitems
    let item = itens[index]
    item.recurrent = !item.recurrent
    itens[index] = item
    setSubitems(Array.from(itens))
  }

  const handleChangeSubitemDescription = (event, index) => {
    let itens = subitems
    let item = itens[index]
    item.description = event.target.value
    itens[index] = item
    setSubitems(Array.from(itens))
  }

  const handleChangeSubitemPriceCents = (event, index) => {
    let itens = subitems
    let item = itens[index]
    let value = event.target.value.replace(/\D/g, '')
    item.price_cents = parseInt(value);
    itens[index] = item
    setSubitems(Array.from(itens))
  }

  const handleDeleteSubitem = (index) => {
    let itens = subitems
    let item = itens.splice(index, 1)

    if (item.length > 0 && item[0].objectid) {
      planStore.deleteSubitemPlan(CancelToken(), item[0], responsePostSubitem)
    }
    setSubitems(Array.from(itens))
  }

  const addNewSubitem = () => {
    let itens = subitems
    itens.push({
      description: "",
      recurrent: false,
      price_cents: 0
    })
    setSubitems(Array.from(itens))
  }

  return (
    <Grid className={classes.container}>
      {!loader
        ? <Grid>
          <Grid className={classes.containerHeader}>
            <Typography className={classes.title}>{title}</Typography>
            <Grid className={classes.gapIcons} alignItems="center">
              <Button
                variant="contained"
                size="medium"
                className={classes.btnSuccess}
                onClick={id ? updatePlan : confirmPlan}
              >
                <Typography variant="button">{t("general.modalSaveBtn")}</Typography>
              </Button>
              <Button
                color="primary"
                size="medium"
                className={classes.btPrimary}
                onClick={backToPlans}
              >
                <Typography className={classes.textBtn}>
                  {t("general.modalCancelBtn")}
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={7}>
              <Card className={classes.containerCard}>
                <Grid container spacing={3}>
                  <PlanMainInformation
                    name={name}
                    handleName={setName}
                    price={price}
                    handlePrice={setPrice}
                    description={description}
                    handleDescription={setDescription}
                    notes={notes}
                    handleNotes={setNotes}
                    flagNameError={flagNameError}
                    textNameError={textNameError}
                    flagPriceError={flagPriceError}
                    textPriceError={textPriceError}
                    flagDescriptionError={flagDescriptionError}
                    textDescriptionError={textDescriptionError}
                  />
                  <PlanAvailability active={active} showOnline={showOnline} handleActive={setActive} handleShowOnline={setShowOnline} />
                  {id && <PlanFeatures handleDrawer={setOpenDrawer} />}
                  <PlanAdditionalItems
                    subitems={subitems}
                    addNewSubitem={addNewSubitem}
                    handleChangeSubitemDescription={handleChangeSubitemDescription}
                    handleChangeSubitemPriceCents={handleChangeSubitemPriceCents}
                    handleDeleteSubitem={handleDeleteSubitem}
                    onChangeSubitemRecurrent={onChangeSubitemRecurrent}
                  />
                  <PlanBillingInterval intervalRadio={intervalRadio} handleIntervalRadio={handleIntervalRadio} />
                  <PlanPaymentMethods
                    bankSlip={bankSlip}
                    pix={pix}
                    cardCredit={cardCredit}
                    payable={payable}
                    flagPaymentsError={flagPaymentsError}
                    textPaymentsError={textPaymentsError}
                    handleBankSlipCheckbox={handleBankSlipCheckbox}
                    handleCardCreditCheckbox={handleCardCreditCheckbox}
                    handlePixCheckbox={handlePixCheckbox}
                    handlePayableCheckbox={handlePayableCheckbox}
                  />
                  {id && <PlanDiscountCoupons selectedCoupons={selectedCoupons} handleModal={handleModal} />}

                  {/* TODO: menu para quando tiver a funcionalidade Adicionar cupom existente */}
                  <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    elevation={4}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: 350,
                        },
                      }
                    }}
                  >
                    <Grid container sx={{ flexDirection: "column" }}>
                      {coupons.map((coupon, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            control={<CustomCheckBox checked={couponsCheckbox[coupon.name]} onChange={handleCouponsCheckboxes} name={coupon.name} />}
                            label={<MenuItem className={classes.itemLabelFilter}>
                              <Typography className={classes.textForm}>{coupon.name}</Typography>
                            </MenuItem>}
                            className={classes.wrapperLabelSelectFilter}
                          />
                        )
                      })}
                    </Grid>
                  </Menu>
                </Grid>
              </Card>
            </Grid>
            {id &&
              <Grid item xs={4}>
                <PlanResumeCard priceValue={price} featuresValue={totalFeatures} additionalValue={totalAdditional} />
              </Grid>
            }
          </Grid>
        </Grid>
        : <Grid className={classes.screenCenter}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </Grid>
      }
      <Drawer
        id="featuresDrawer"
        className={classes.containerDrawer}
        open={openDrawer}
        onClose={() => { setOpenDrawer(false) }}
        variant="persistent"
      >
        <PlanFeaturesDrawer handleOpenDrawer={setOpenDrawer} openDrawer={openDrawer} totalValuesFeatures={setTotalFeatures} />
      </Drawer>
      <CustomModal
        open={openModal}
        dispense={couponModalButtons[0]}
        confirm={typeModal === "new" ? couponModalButtons[1] : couponModalButtons[2]}
        title={titleModal}
        size={typeModal === "new" ? "medium" : "small"}
      >
        {bodyModal()}
      </CustomModal>
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </Grid>
  )
}

export default PlanForm