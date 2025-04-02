import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography
} from "@mui/material"

import TabPanel from "../../../Common/TabPanel"
import useStyles from "../../../../styles/HomePanel/Tabs/Plans/PlansTab"
import planStore from "../../../../stores/PlanStore"
import TablePlans from "./TablePlans"
import FilterTable from "../../../Common/FilterTable"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import CustomCheckBox from "../../../Common/Themed/ThemedCheckBox"
import UserFeedback from "../../../Common/UserFeedback"
import useParamsPagination from "../../../../hook/useParamsPagination"
import ThemedTextField from "../../../Common/Themed/ThemedTextField"
import CancelToken from "../../../../helpers/cancelToken"
import { PlansTableType } from "../../../../interfaces/Plans"


function PlansTab() {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const pagination = useParamsPagination()

  const [loader, setLoader] = useState<boolean>(false)
  const [plans, setPlans] = useState<PlansTableType[]>([])
  const [plansToRef, setPlansToRef] = useState<PlansTableType[]>(null)
  const [totalrows, setTotalRows] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [page, setPage] = useState<number>(null)
  const [rowsPerPage, setRowsPerPage] = useState<number>(null)
  const [flagReloadPage, setFlagReloadPage] = useState<boolean>(false)
  const [itemAddedToFilter, setItemAddedToFilter] = useState(null)
  const [maxValue, setMaxValue] = useState<string>("")
  const [minValue, setMinValue] = useState<string>("")
  const [mapValue, setMapValue] = useState([])
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")

  const [intervalCheckBox, setIntervalCheckBox] = useState({
    monthly: false,
    weekly: false,
  })
  const [paymentCheckBox, setPaymentCheckBox] = useState({
    cardCredit: false,
    pix: false,
    bankSlip: false,
  })
  const [statusCheckBox, setStatusCheckBox] = useState({
    active: false,
    inactive: false,
  })

  const { monthly, weekly } = intervalCheckBox
  const { cardCredit, pix, bankSlip } = paymentCheckBox
  const { active, inactive } = statusCheckBox

  const filtersBtn = [
    { name: "btnValue", label: t("homePanel.plans.tableHeader2"), value: "value" },
    { name: "btnInterval", label: t("homePanel.plans.tableHeader3"), value: "interval" },
    { name: "btnPayment", label: t("homePanel.plans.tableHeader4"), value: "payments" },
    { name: "btnStatus", label: t("homePanel.plans.tableHeader5"), value: "status" },
  ]

  const filterInput = {
    placeholder: t("homePanel.plans.filters.placeholderInput"),
    label: t("homePanel.plans.filters.inputLabel")
  }

  const filtersLabel = [
    { label: t("homePanel.plans.filters.valueLabel"), value: "value" },
    { label: t("homePanel.plans.filters.intervalLabel"), value: "interval" },
    { label: t("homePanel.plans.filters.paymentLabel"), value: "payments" },
    { label: "status", value: "status" },
    { label: t("homePanel.plans.filters.inputLabel") }
  ]

  const mapCheckboxes = [
    { value: "monthly", label: t("homePanel.plans.filters.checkbox.label1") },
    { value: "weekly", label: t("homePanel.plans.filters.checkbox.label2") },
    { value: "cardCredit", label: t("homePanel.plans.filters.checkbox.label4") },
    { value: "pix", label: t("homePanel.plans.filters.checkbox.label5") },
    { value: "bankSlip", label: t("homePanel.plans.filters.checkbox.label6") },
    { value: "active", label: t("homePanel.plans.filters.checkbox.label7") },
    { value: "inactive", label: t("homePanel.plans.filters.checkbox.label8") },
  ]

  useEffect(() => {
    bind()

    if (planStore.getErrorStatus().length > 0) {
      setErrorStatusResponse(planStore.getErrorStatus())
    }

    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setRowsPerPage(pagination.rowsPerPage)
    setTotalItems(pagination.totalItems)
    setPage(pagination.totalItems / pagination.rowsPerPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    planStore.setErrorStatus(errorStatusResponse)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorStatusResponse])

  useEffect(() => {
    if (page || rowsPerPage) {
      getPlans()
    }

    if (flagReloadPage) {
      navigate("/plan?start=" + totalItems + "&limit=" + rowsPerPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  useEffect(() => {
    if (minValue.length > 0 && maxValue.length === 0) {
      setItemAddedToFilter({
        label: t("homePanel.plans.filters.valueLabel"),
        minNumber: minValue,
      })

      setMapValue([{ value: "minnumber", label: minValue }])
    } else if (maxValue.length > 0 && minValue.length === 0) {
      setItemAddedToFilter({
        label: t("homePanel.plans.filters.valueLabel"),
        maxNumber: maxValue,
      })

      setMapValue([{ value: "maxnumber", label: maxValue }])
    } else if (maxValue.length > 0 && minValue.length > 0) {
      setItemAddedToFilter({
        label: t("homePanel.plans.filters.valueLabel"),
        minMaxNumber: `${minValue} a ${maxValue}`,
        minValue,
        maxValue,
        isRange: true
      })

      setMapValue([{ value: "minmaxnumber", label: `${minValue} a ${maxValue}` }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValue, maxValue])

  const bind = () => {
    planStore.addListener("plans_reload", getPlans)
    planStore.addListener("plans_feedback", setErrorStatusResponse)
  }

  const clear = () => {
    planStore.removeListener("plans_reload", getPlans)
    planStore.removeListener("plans_feedback", setErrorStatusResponse)

    setErrorStatusResponse("")
  }

  const getPlans = () => {
    const pagination = {
      start: totalItems,
      limit: rowsPerPage || ConstantsUtils.RowsPerPage
    }

    setLoader(true)
    planStore.getListPlans(CancelToken(), pagination, responseGetPlans)
  }

  const responseGetPlans = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setTotalRows(response.data.totalItems)

      const mapPlans = response.data.items.map(plan => {
        const payments = plan.payable_with
          ? plan.payable_with.map(payable => {
            return ConstantsUtils.MapPlanPayment.filter(
              payment => payment.value === payable
            )[0].label
          })
          : []

        const newPlans = {
          objectid: plan.objectid,
          name: plan.name,
          value: plan.value_cents ? (plan.value_cents / 100).toString() : null,
          interval: mapInterval(plan.interval_type),
          payments: payments,
          status: plan.enable ? t("homePanel.plans.tableRowActive") : t("homePanel.plans.tableRowInactive"),
          features: plan.features || [],
          subitems: plan.subitems || []
        }

        return newPlans
      })

      const mapPlansToRef = response.data.items.map(plan => {
        let payments = plan.payable_with
          ? plan.payable_with.map(payable => {
            return ConstantsUtils.MapPlanPayment.filter(
              payment => payment.value === payable
            )[0].label
          })
          : []

        payments = payments.join()

        return {
          objectid: plan.objectid,
          name: plan.name,
          value: (plan.value_cents / 100).toString(),
          interval: mapInterval(plan.interval_type),
          payments: payments,
          status: plan.enable ? t("homePanel.plans.tableRowActive") : t("homePanel.plans.tableRowInactive"),
        }
      })

      setPlans(mapPlans)
      setPlansToRef(mapPlansToRef)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const mapInterval = (interval) => {
    if (interval === "months") {
      return t("homePanel.plans.filters.checkbox.label1")
    } else if (interval === "weeks") {
      return t("homePanel.plans.filters.checkbox.label2")
    }
  }

  const handleIntervalCheckboxes = (event) => {
    setIntervalCheckBox({ ...intervalCheckBox, [event.target.name]: event.target.checked })
    setItemAddedToFilter({
      label: t("homePanel.plans.filters.intervalLabel"), [event.target.name]: event.target.checked, isCheckbox: true
    })
  }

  const handlePaymentCheckboxes = (event) => {
    setPaymentCheckBox({ ...paymentCheckBox, [event.target.name]: event.target.checked })
    setItemAddedToFilter({
      label: t("homePanel.plans.filters.paymentLabel"),
      [event.target.name]: event.target.checked,
      isCheckbox: true,
      isSet: true
    })
  }

  const handleStatusCheckboxes = (event) => {
    setStatusCheckBox({ ...statusCheckBox, [event.target.name]: event.target.checked })
    setItemAddedToFilter({
      label: "status", [event.target.name]: event.target.checked, isCheckbox: true
    })
  }

  const handleChangeValue = (event) => {
    if (event.target.name === 'maxValueInput') {
      setMaxValue(event.target.value)
    } else {
      setMinValue(event.target.value)
    }
  }

  const contentChildrenFilter = (option) => {
    return (
      <Grid>
        {option === "btnValue" && valueFilterContent()}
        {option === "btnInterval" && intervalFilterContent()}
        {option === "btnPayment" && paymentFilterContent()}
        {option === "btnStatus" && statusFilterContent()}
      </Grid>
    )
  }

  const valueFilterContent = () => {
    return (
      <Grid>
        <Grid className={classes.wrapperLabelInputFilter}>
          <FormControl fullWidth>
            <ThemedTextField
              name="minValueInput"
              InputLabelProps={{
                shrink: true,
              }}
              value={minValue}
              onChange={handleChangeValue}
              label={t("homePanel.plans.filters.valueInputLabel1")}
              variant="outlined"
              size="small"
              type="number"
              sx={{ width: "170px" }}
            />
          </FormControl>
        </Grid>
        <Grid className={classes.wrapperLabelInputFilter}>
          <FormControl fullWidth>
            <ThemedTextField
              name="maxValueInput"
              InputLabelProps={{
                shrink: true,
              }}
              value={maxValue}
              onChange={handleChangeValue}
              label={t("homePanel.plans.filters.valueInputLabel2")}
              variant="outlined"
              size="small"
              type="number"
              sx={{ width: "170px" }}
            />
          </FormControl>
        </Grid>
      </Grid>
    )
  }

  const intervalFilterContent = () => {
    return (
      <Grid container sx={{ flexDirection: "column" }}>
        <FormControlLabel
          control={<CustomCheckBox checked={monthly} onChange={handleIntervalCheckboxes} name="monthly" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>{t("homePanel.plans.filters.intervalLabel1")}</Typography>
          </MenuItem>}
          className={classes.wrapperLabelSelectFilter}
        />
        <FormControlLabel
          control={<CustomCheckBox checked={weekly} onChange={handleIntervalCheckboxes} name="weekly" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>{t("homePanel.plans.filters.intervalLabel2")}</Typography>
          </MenuItem>}
          className={classes.wrapperLabelSelectFilter}
        />
      </Grid>
    )
  }

  const paymentFilterContent = () => {
    return (
      <Grid container sx={{ flexDirection: "column" }}>
        <FormControlLabel
          control={<CustomCheckBox checked={cardCredit} onChange={handlePaymentCheckboxes} name="cardCredit" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>{t("homePanel.plans.filters.paymentLabel1")}</Typography>
          </MenuItem>}
          className={classes.wrapperLabelSelectFilter}
        />
        <FormControlLabel
          control={<CustomCheckBox checked={pix} onChange={handlePaymentCheckboxes} name="pix" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>{t("homePanel.plans.filters.paymentLabel2")}</Typography>
          </MenuItem>}
          className={classes.wrapperLabelSelectFilter}
        />
        <FormControlLabel
          control={<CustomCheckBox checked={bankSlip} onChange={handlePaymentCheckboxes} name="bankSlip" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>{t("homePanel.plans.filters.paymentLabel3")}</Typography>
          </MenuItem>}
          className={classes.wrapperLabelSelectFilter}
        />
      </Grid>
    )
  }

  const statusFilterContent = () => {
    return (
      <Grid container sx={{ flexDirection: "column" }}>
        <FormControlLabel
          control={<CustomCheckBox checked={active} onChange={handleStatusCheckboxes} name="active" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>{t("homePanel.plans.filters.statusLabel1")}</Typography>
          </MenuItem>}
          className={classes.wrapperLabelSelectFilter}
        />
        <FormControlLabel
          control={<CustomCheckBox checked={inactive} onChange={handleStatusCheckboxes} name="inactive" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>{t("homePanel.plans.filters.statusLabel2")}</Typography>
          </MenuItem>}
          className={classes.wrapperLabelSelectFilter}
        />
      </Grid>
    )
  }

  const cleanFilteredOption = (filtered) => {
    if (Object.keys(filtered)[0] === t("homePanel.plans.filters.valueLabel")) {
      setMinValue("")
      setMaxValue("")

      return
    }

    const checkBoxKey = mapCheckboxes.filter(checkbox =>
      typeof Object.values(filtered)[0] === "string" &&
      checkbox.label === (Object.values(filtered)[0] as string).toLowerCase()
    )[0]?.value

    if (Object.keys(filtered)[0] === t("homePanel.plans.filters.intervalLabel")) {
      setIntervalCheckBox({ ...intervalCheckBox, [checkBoxKey]: false })
    } else if (Object.keys(filtered)[0] === t("homePanel.plans.filters.paymentLabel")) {
      setPaymentCheckBox({ ...paymentCheckBox, [checkBoxKey]: false })
    } else if (Object.keys(filtered)[0] === "status") {
      setStatusCheckBox({ ...statusCheckBox, [checkBoxKey]: false })
    }
  }

  const cleanAllFilters = () => {
    setIntervalCheckBox({
      monthly: false,
      weekly: false,
    })
    setPaymentCheckBox({
      cardCredit: false,
      pix: false,
      bankSlip: false,
    })
    setStatusCheckBox({
      active: false,
      inactive: false,
    })

    setMinValue("")
    setMaxValue("")
  }

  const mapFilteredPlansToArray = (plansParam) => {
    const newPlans: PlansTableType[] = plansParam.map(plan => {
      return {
        objectid: plan.objectid,
        interval: plan.interval,
        name: plan.name,
        payments: (plan.payments && plan.payments !== "") ? plan.payments.split(",") : [],
        status: plan.status,
        value: plan.value
      }
    })

    setPlans(newPlans)
  }

  const handlePage = (newPage: number) => {
    if (newPage > page) {
      setTotalItems(totalItems + rowsPerPage)
    } else if (newPage < page) {
      setTotalItems(totalItems - rowsPerPage)
    }

    setPage(newPage)
  }

  const handleRowsPerPage = (newValue: number) => {
    setRowsPerPage(newValue)
    setTotalItems(0)
  }

  return (
    <TabPanel value={1} index={1}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.tabTitle}>
            {t("homePanel.plans.tabTitle")}
          </Typography>
        </Grid>
        <FilterTable
          filtersBtn={filtersBtn}
          filterInput={filterInput}
          contentChildrenFilter={contentChildrenFilter}
          labels={filtersLabel}
          itemAdded={itemAddedToFilter}
          cleanItem={cleanFilteredOption}
          cleanAllItems={cleanAllFilters}
          contentToRef={plansToRef}
          updateFilteredItems={mapFilteredPlansToArray}
          mapItemsFilter={[...mapCheckboxes, ...mapValue]}
        />
        {!loader &&
          <Grid item xs={12}>
            <TablePlans
              plans={plans}
              totalRows={totalrows}
              page={page}
              rowsPerPage={rowsPerPage}
              handleRowsPerPage={handleRowsPerPage}
              handleFlagReloadPage={setFlagReloadPage}
              handlePage={handlePage}
              handleLoader={setLoader}
            />
          </Grid>
        }
        {loader &&
          <Grid container item justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        }
      </Grid>
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </TabPanel>
  )
}

export default PlansTab