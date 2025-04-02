import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import InputMask from "react-input-mask"

import moment from "moment"

import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Typography
} from "@mui/material"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"

import TabPanel from "../../../Common/TabPanel"
import useStyles from "../../../../styles/HomePanel/Tabs/Coupons/CouponsTab"
import TableCoupons from "./TableCoupons"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import couponStore from "../../../../stores/CouponStore"
import FilterTable from "../../../Common/FilterTable"
import CustomCheckBox from "../../../Common/Themed/ThemedCheckBox"
import UserFeedback from "../../../Common/UserFeedback"
import toolsUtils from "../../../../utils/ToolsUtils"
import useParamsPagination from "../../../../hook/useParamsPagination"
import ThemedTextField from "../../../Common/Themed/ThemedTextField"
import CancelToken from "../../../../helpers/cancelToken"
import { CouponType } from "../../../../interfaces/Coupons"


function CouponsTab() {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const pagination = useParamsPagination()

  const [loader, setLoader] = useState<boolean>(false)
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")
  const [rowsPerPage, setRowsPerPage] = useState<number>(null)
  const [page, setPage] = useState<number>(null)
  const [flagReloadPage, setFlagReloadPage] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [coupons, setCoupons] = useState<CouponType[]>([])
  const [couponsToRef, setCouponsToRef] = useState<CouponType[]>(null)
  const [totalrows, setTotalRows] = useState<number>(0)
  const [itemAddedToFilter, setItemAddedToFilter] = useState(null)
  const [mapValue, setMapValue] = useState([])
  const [maxDiscount, setMaxDiscount] = useState<string>("")
  const [minDiscount, setMinDiscount] = useState<string>("")
  const [maxValidity, setMaxValidity] = useState<string>("")
  const [minValidity, setMinValidity] = useState<string>("")
  const [validityCheckBox, setValidityCheckBox] = useState({
    today: false,
    tomorrow: false,
    week: false,
    expired: false,
  })
  const [statusCheckBox, setStatusCheckBox] = useState({
    active: false,
    inactive: false,
  })

  const { today, tomorrow, week, expired } = validityCheckBox
  const { active, inactive } = statusCheckBox

  const filtersBtn = [
    { name: "btnDiscount", label: t("homePanel.coupons.filters.button1"), value: "value" },
    { name: "btnValidity", label: t("homePanel.coupons.filters.button2"), value: "validity" },
    { name: "btnStatus", label: t("homePanel.coupons.filters.button3"), value: "status" },
  ]

  const filterInput = {
    placeholder: t("homePanel.coupons.filters.placeholderInput"),
    label: t("homePanel.coupons.filters.inputLabel")
  }

  const filtersLabel = [
    { label: t("homePanel.coupons.filters.discountLabel"), value: "value" },
    { label: t("homePanel.coupons.filters.startValidityLabel"), value: "created_at" },
    { label: t("homePanel.coupons.filters.endValidityLabel"), value: "expirer_at" },
    { label: "status", value: "status" },
    { label: t("homePanel.coupons.filters.inputLabel") }
  ]

  const mapCheckboxes = [
    { value: "today", label: t("homePanel.coupons.filters.checkbox.label1") },
    { value: "tomorrow", label: t("homePanel.coupons.filters.checkbox.label2") },
    { value: "week", label: t("homePanel.coupons.filters.checkbox.label3") },
    { value: "expired", label: t("homePanel.coupons.filters.checkbox.label4") },
    { value: "active", label: t("homePanel.coupons.filters.checkbox.label6") },
    { value: "inactive", label: t("homePanel.coupons.filters.checkbox.label7") },
  ]

  useEffect(() => {
    bind()

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
    if (page || rowsPerPage) {
      getCoupons()
    }

    if (flagReloadPage) {
      navigate("/coupon?start=" + totalItems + "&limit=" + rowsPerPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  useEffect(() => {
    if (minDiscount.length > 0 && maxDiscount.length === 0) {
      setItemAddedToFilter({
        label: t("homePanel.coupons.filters.discountLabel"),
        minNumber: minDiscount,
      })

      setMapValue([{ value: "minnumber", label: minDiscount }])
    } else if (maxDiscount.length > 0 && minDiscount.length === 0) {
      setItemAddedToFilter({
        label: t("homePanel.coupons.filters.discountLabel"),
        maxNumber: maxDiscount,
      })

      setMapValue([{ value: "maxnumber", label: maxDiscount }])
    } else if (maxDiscount.length > 0 && minDiscount.length > 0) {
      setItemAddedToFilter({
        label: t("homePanel.coupons.filters.discountLabel"),
        minMaxNumber: `${minDiscount} a ${maxDiscount}`,
        minValue: minDiscount,
        maxValue: maxDiscount,
        isRange: true
      })

      setMapValue([{ value: "minmaxnumber", label: `${minDiscount} a ${maxDiscount}` }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDiscount, maxDiscount])

  useEffect(() => {
    if (minValidity.length === 10 && toolsUtils.isValidDate(minValidity)) {
      setItemAddedToFilter({
        label: t("homePanel.coupons.filters.startValidityLabel"),
        startDate: minValidity,
        isDate: true
      })

      setMapValue([{ value: "startdate", label: minValidity }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValidity])

  useEffect(() => {
    if (maxValidity.length === 10 && toolsUtils.isValidDate(maxValidity)) {
      setItemAddedToFilter({
        label: t("homePanel.coupons.filters.endValidityLabel"),
        endDate: maxValidity,
        isDate: true
      })

      setMapValue([{ value: "enddate", label: maxValidity }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxValidity])

  const bind = () => {
    couponStore.addListener("coupons_reload", getCoupons)
    couponStore.addListener("coupons_feedback", setErrorStatusResponse)
  }

  const clear = () => {
    couponStore.removeListener("coupons_reload", getCoupons)
    couponStore.removeListener("coupons_feedback", setErrorStatusResponse)

    setErrorStatusResponse("")
  }

  const getCoupons = (params = null) => {
    const pagination = {
      start: params ? params[0] : totalItems,
      limit: params ? params[1] : (rowsPerPage || ConstantsUtils.RowsPerPage)
    }

    setLoader(true)
    couponStore.getListCoupons(CancelToken(), pagination, responseGetCoupons)
  }

  const responseGetCoupons = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setTotalRows(response.data.totalItens)

      const mapCoupons = response.data.itens.map(coupon => {
        const newCoupons = {
          objectid: coupon.objectid,
          name: coupon.name,
          value: coupon.discount ? `${coupon.discount * 100}` : "0",
          amount: coupon.amount,
          status: coupon.enable ? t("homePanel.plans.tableRowActive") : t("homePanel.plans.tableRowInactive"),
          created_at: moment(coupon.created_at).format("DD/MM/YYYY"),
          expirer_at: coupon.expirer_at ? moment(coupon.expirer_at).format("DD/MM/YYYY") : ConstantsUtils.NullFieldMask,
          recurrent: coupon.recurrent
        }

        return newCoupons
      })

      setCoupons(mapCoupons)
      setCouponsToRef(mapCoupons)
    }
  }

  const handlePage = (newPage) => {
    if (newPage > page) {
      setTotalItems(totalItems + rowsPerPage)
    } else if (newPage < page) {
      setTotalItems(totalItems - rowsPerPage)
    }

    setPage(newPage)
  }

  const handleRowsPerPage = (newValue) => {
    setRowsPerPage(newValue)
    setTotalItems(0)
  }

  const handleChangeDiscount = (event) => {
    if (event.target.name === "maxDiscountInput") {
      setMaxDiscount(event.target.value)
    } else {
      setMinDiscount(event.target.value)
    }
  }

  const handleChangeValidity = (event) => {
    if (event.target.name === "maxValidityInput") {
      setMaxValidity(event.target.value)
    } else {
      setMinValidity(event.target.value)
    }
  }

  const handleValidityCheckboxes = (event) => {
    let startDate = null
    let endDate = null

    if (event.target.name === "today") {
      startDate = moment().format("DD/MM/YYYY")
    } else if (event.target.name === "tomorrow") {
      startDate = moment().add(1, "days").format("DD/MM/YYYY")
    } else if (event.target.name === "week") {
      startDate = moment().format("DD/MM/YYYY")
      endDate = moment().weekday(7).format("DD/MM/YYYY")
    } else if (event.target.name === "expired") {
      endDate = moment().add(-1, "days").format("DD/MM/YYYY")
    }

    setValidityCheckBox({ ...validityCheckBox, [event.target.name]: event.target.checked })
    setItemAddedToFilter({
      label: t("homePanel.coupons.filters.endValidityLabel"),
      [event.target.name]: event.target.checked,
      isDate: true,
      isCheckbox: true,
      startDate,
      endDate
    })
  }

  const handleStatusCheckboxes = (event) => {
    setStatusCheckBox({ ...statusCheckBox, [event.target.name]: event.target.checked })
    setItemAddedToFilter({
      label: "status", [event.target.name]: event.target.checked, isCheckbox: true
    })
  }

  const contentChildrenFilter = (option) => {
    return (
      <Grid>
        {option === "btnDiscount" && discountFilterContent()}
        {option === "btnValidity" && validityFilterContent()}
        {option === "btnStatus" && statusFilterContent()}
      </Grid>
    )
  }

  const discountFilterContent = () => {
    return (
      <Grid>
        <Grid className={classes.wrapperLabelInputFilter}>
          <FormControl fullWidth>
            <ThemedTextField
              name="minDiscountInput"
              InputLabelProps={{
                shrink: true,
              }}
              value={minDiscount}
              onChange={handleChangeDiscount}
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
              name="maxDiscountInput"
              InputLabelProps={{
                shrink: true,
              }}
              value={maxDiscount}
              onChange={handleChangeDiscount}
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

  const validityFilterContent = () => {
    return (
      <Grid>
        <Grid className={classes.wrapperLabelInputFilter}>
          <FormControl
            fullWidth
            className={cx({
              [classes.inputPlaceholder]: minValidity.length === 0,
            })}
          >
            <InputMask
              mask={"99/99/9999"}
              name="minValidityInput"
              placeholder="DD/MM/AAAA"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <CalendarTodayIcon className={classes.iconProp} />
                </InputAdornment>,
              }}
              value={minValidity}
              onChange={handleChangeValidity}
              label={t("homePanel.coupons.filters.startInputLabel")}
              variant="outlined"
              size="small"
              disabled={today || tomorrow || week || expired}
              sx={{ width: "170px" }}
            >
              {(inputProps) =>
                <ThemedTextField
                  {...inputProps} />
              }
            </InputMask>
          </FormControl>
        </Grid>
        <Grid className={classes.wrapperLabelInputFilter}>
          <FormControl
            fullWidth
            className={cx({
              [classes.inputPlaceholder]: maxValidity.length === 0,
            })}
          >
            <InputMask
              mask={"99/99/9999"}
              name="maxValidityInput"
              placeholder="DD/MM/AAAA"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <CalendarTodayIcon className={classes.iconProp} />
                </InputAdornment>,
              }}
              value={maxValidity}
              onChange={handleChangeValidity}
              label={t("homePanel.coupons.filters.endInputLabel")}
              variant="outlined"
              size="small"
              disabled={today || tomorrow || week || expired}
              sx={{ width: "170px" }}
            >
              {(inputProps) =>
                <ThemedTextField
                  {...inputProps} />
              }
            </InputMask>
          </FormControl>
        </Grid>
        <Typography className={classes.titleInsideFilter}>{t("homePanel.coupons.filters.validityTitle")}</Typography>
        <Grid container className={classes.wrapperDateFilters}>
          <FormControlLabel
            control={
              <CustomCheckBox
                checked={today}
                onChange={handleValidityCheckboxes}
                name="today"
              />
            }
            label={
              <MenuItem className={classes.itemLabelFilter}>
                <Typography className={classes.textInsideFilter}>
                  {t("homePanel.coupons.filters.checkbox.label1")}
                </Typography>
              </MenuItem>
            }
            className={cx(
              classes.wrapperLabelSelectFilter,
              classes.fullWidth
            )}
          />
          <FormControlLabel
            control={
              <CustomCheckBox
                checked={tomorrow}
                onChange={handleValidityCheckboxes}
                name="tomorrow"
              />
            }
            label={
              <MenuItem className={classes.itemLabelFilter}>
                <Typography className={classes.textInsideFilter}>
                  {t("homePanel.coupons.filters.checkbox.label2")}
                </Typography>
              </MenuItem>
            }
            className={cx(
              classes.wrapperLabelSelectFilter,
              classes.fullWidth
            )}
          />
          <FormControlLabel
            control={
              <CustomCheckBox
                checked={week}
                onChange={handleValidityCheckboxes}
                name="week"
              />
            }
            label={
              <MenuItem className={classes.itemLabelFilter}>
                <Typography className={classes.textInsideFilter}>
                  {t("homePanel.coupons.filters.checkbox.label3")}
                </Typography>
              </MenuItem>
            }
            className={cx(
              classes.wrapperLabelSelectFilter,
              classes.fullWidth
            )}
          />
          <FormControlLabel
            control={
              <CustomCheckBox
                checked={expired}
                onChange={handleValidityCheckboxes}
                name="expired"
              />
            }
            label={
              <MenuItem className={classes.itemLabelFilter}>
                <Typography className={classes.textInsideFilter}>
                  {t("homePanel.coupons.filters.checkbox.label4")}
                </Typography>
              </MenuItem>
            }
            className={cx(
              classes.wrapperLabelSelectFilter,
              classes.fullWidth
            )}
          />
        </Grid>
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
          className={cx(
            classes.wrapperLabelSelectFilter,
            classes.fullWidth
          )}
        />
        <FormControlLabel
          control={<CustomCheckBox checked={inactive} onChange={handleStatusCheckboxes} name="inactive" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>{t("homePanel.plans.filters.statusLabel2")}</Typography>
          </MenuItem>}
          className={cx(
            classes.wrapperLabelSelectFilter,
            classes.fullWidth
          )}
        />
      </Grid>
    )
  }

  const cleanFilteredOption = (filtered) => {
    let checkBoxKey = ""

    if (filtered.isCheckbox) {
      checkBoxKey = mapCheckboxes.filter(checkbox => checkbox.label === Object.values(filtered)[0])[0].value
    }

    if (Object.keys(filtered)[0] === t("homePanel.coupons.filters.discountLabel")) {
      setMinDiscount("")
      setMaxDiscount("")
    } else if (Object.keys(filtered)[0] === t("homePanel.coupons.filters.startValidityLabel")) {
      setMinValidity("")
    } else if (Object.keys(filtered)[0] === t("homePanel.coupons.filters.endValidityLabel")) {
      if (filtered.isCheckbox) {
        setValidityCheckBox({ ...validityCheckBox, [checkBoxKey]: false })
      } else {
        setMaxValidity("")
      }
    } else if (Object.keys(filtered)[0] === "status") {
      setStatusCheckBox({ ...statusCheckBox, [checkBoxKey]: false })
    }
  }

  const cleanAllFilters = () => {
    setMinDiscount("")
    setMaxDiscount("")
    setMinValidity("")
    setMaxValidity("")

    setStatusCheckBox({
      active: false,
      inactive: false,
    })

    setValidityCheckBox({
      today: false,
      tomorrow: false,
      week: false,
      expired: false,
    })
  }

  const mapFilteredCouponsToArray = (couponsParam) => {
    const newCoupons = couponsParam.map(coupon => {
      return {
        objectid: coupon.objectid,
        name: coupon.name,
        value: coupon.value,
        amount: coupon.amount,
        status: coupon.status,
        created_at: coupon.created_at,
        expirer_at: coupon.expirer_at,
      }
    })

    setCoupons(newCoupons)
  }

  return (
    <TabPanel value={2} index={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.tabTitle}>
            {t("homePanel.coupons.tabTitle")}
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
          contentToRef={couponsToRef}
          updateFilteredItems={mapFilteredCouponsToArray}
          mapItemsFilter={[...mapCheckboxes, ...mapValue]}
        />
        {!loader &&
          <Grid item xs={12}>
            <TableCoupons
              coupons={coupons}
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

export default CouponsTab