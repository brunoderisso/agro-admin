import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputMask from "react-input-mask"

import moment from "moment"
import PropTypes from "prop-types"

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

import useStyles from "../../../../styles/Customer/CustomerCoupons/DiscountCoupons"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import FilterTable from "../../../Common/FilterTable"
import CustomCheckBox from "../../../Common/Themed/ThemedCheckBox"
import UserFeedback from "../../../Common/UserFeedback"
import customerStore from "../../../../stores/CustomerStore"
import TableCoupons from "./TableCoupons"
import toolsUtils from "../../../../utils/ToolsUtils"
import useParamsPagination from "../../../../hook/useParamsPagination"
import ThemedTextField from "../../../Common/Themed/ThemedTextField"
import CancelToken from "../../../../helpers/cancelToken"
import { CouponType } from "../../../../interfaces/Coupons"


function DiscountCoupons(props) {
  const { classes, cx } = useStyles()
  const navigate = useNavigate()
  const pagination = useParamsPagination()

  const [loader, setLoader] = useState<boolean>(false)
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")
  const [rowsPerPage, setRowsPerPage] = useState<number>(null)
  const [page, setPage] = useState<number>(null)
  const [flagReloadPage, setFlagReloadPage] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [coupons, setCoupons] = useState<CouponType[]>([])
  const [couponsToRef, setCouponsToRef] = useState(null)
  const [totalrows, setTotalRows] = useState<number>(0)
  const [itemAddedToFilter, setItemAddedToFilter] = useState(null)
  const [mapValue, setMapValue] = useState([])
  const [maxDiscount, setMaxDiscount] = useState<string>("")
  const [minDiscount, setMinDiscount] = useState<string>("")
  const [maxDate, setMaxDate] = useState<string>("")
  const [minDate, setMinDate] = useState<string>("")
  const [dateCheckBox, setDateCheckBox] = useState({
    currentMonth: false,
    lastMonth: false,
    currentYear: false,
    lastYears: false,
  })
  const [statusCheckBox, setStatusCheckBox] = useState({
    active: false,
    inactive: false,
  })

  const { currentMonth, lastMonth, currentYear, lastYears } = dateCheckBox
  const { active, inactive } = statusCheckBox

  const filtersBtn = [
    { name: "btnDiscount", label: "Desconto", value: "value" },
    { name: "btnDate", label: "Data de aplicação", value: "validity" },
    { name: "btnStatus", label: "Status", value: "status" },
  ]

  const filterInput = {
    placeholder: "Pesquise o código do cupom",
    label: "cupom"
  }

  const filtersLabel = [
    { label: "desconto", value: "value" },
    { label: "início", value: "created_at" },
    { label: "status", value: "status" },
    { label: "cupom" }
  ]

  const mapCheckboxes = [
    { value: "currentMonth", label: "Mês atual" },
    { value: "lastMonth", label: "Mês passado" },
    { value: "currentYear", label: "Ano atual" },
    { value: "lastYears", label: "Anos passados" },
    { value: "applied", label: "Aplicado" },
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
  ]

  useEffect(() => {
    const controller = new AbortController()

    if (props.customer.objectid) {
      getCoupons()
    }

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.customer.objectid])

  useEffect(() => {
    setRowsPerPage(pagination.rowsPerPage)
    setTotalItems(pagination.totalItems)
    setPage(pagination.totalItems / pagination.rowsPerPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    const controller = new AbortController()

    if (props.customer.objectid && flagReloadPage) {
      getCoupons()
      navigate("/customer/" + props.customer.objectid + "/coupon?start=" + totalItems + "&limit=" + rowsPerPage)
    }

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  useEffect(() => {
    if (minDiscount.length > 0 && maxDiscount.length === 0) {
      setItemAddedToFilter({
        label: "desconto",
        minNumber: minDiscount,
      })

      setMapValue([{ value: "minnumber", label: minDiscount }])
    } else if (maxDiscount.length > 0 && minDiscount.length === 0) {
      setItemAddedToFilter({
        label: "desconto",
        maxNumber: maxDiscount,
      })

      setMapValue([{ value: "maxnumber", label: maxDiscount }])
    } else if (maxDiscount.length > 0 && minDiscount.length > 0) {
      setItemAddedToFilter({
        label: "desconto",
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
    if ((minDate.length === 10 && toolsUtils.isValidDate(minDate)) && maxDate.length < 10) {
      setItemAddedToFilter({
        label: "início",
        startDate: minDate,
        isDate: true
      })

      setMapValue([{ value: "startdate", label: minDate }])
    } else if ((maxDate.length === 10 && toolsUtils.isValidDate(maxDate)) && minDate.length < 10) {
      setItemAddedToFilter({
        label: "início",
        endDate: maxDate,
        isDate: true
      })

      setMapValue([{ value: "enddate", label: maxDate }])
    } else if (
      (minDate.length === 10 && toolsUtils.isValidDate(minDate)) &&
      (maxDate.length === 10 && toolsUtils.isValidDate(maxDate))
    ) {
      setItemAddedToFilter({
        label: "início",
        startDate: minDate,
        endDate: maxDate,
        isDate: true
      })

      setMapValue([{ value: "startdate", label: `${minDate} a ${maxDate}` }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDate, maxDate])

  const getCoupons = () => {
    const pagination = {
      start: totalItems,
      limit: rowsPerPage || ConstantsUtils.RowsPerPage
    }

    setLoader(true)
    customerStore.getListCouponsByCustomer(CancelToken(), props.customer.objectid, pagination, responseGetCoupons)
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
          status: coupon.enable ? "Ativo" : "Inativo",
          created_at: moment(coupon.created_at).format("DD/MM/YYYY"),
          recurrent: coupon.recurrent
        }

        return newCoupons
      })

      setCoupons(mapCoupons)
      setCouponsToRef(mapCoupons)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
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
    if (event.target.name === "maxDateInput") {
      setMaxDate(event.target.value)
    } else {
      setMinDate(event.target.value)
    }
  }

  const handleValidityCheckboxes = (event) => {
    let startDate = null
    let endDate = null

    if (event.target.name === "currentMonth") {
      startDate = moment().startOf('month').format("DD/MM/YYYY")
      endDate = moment().endOf('month').format("DD/MM/YYYY")
    } else if (event.target.name === "lastMonth") {
      startDate = moment().subtract(1, "months").startOf('month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, "months").endOf('month').format("DD/MM/YYYY")
    } else if (event.target.name === "currentYear") {
      startDate = "01/01" + moment().format("/YYYY")
      endDate = "31/12" + moment().format("/YYYY")
    } else if (event.target.name === "lastYears") {
      endDate = "31/12" + moment().subtract(1, "years").format("/YYYY")
    }

    setDateCheckBox({ ...dateCheckBox, [event.target.name]: event.target.checked })
    setItemAddedToFilter({
      label: "início",
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
        {option === "btnDate" && validityFilterContent()}
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
              label="Valor Mínimo"
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
              label="Valor Máximo"
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
              [classes.inputPlaceholder]: minDate.length === 0,
            })}
          >
            <InputMask
              mask={"99/99/9999"}
              name="minDateInput"
              placeholder="DD/MM/AAAA"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <CalendarTodayIcon className={classes.iconProp} />
                </InputAdornment>,
              }}
              value={minDate}
              onChange={handleChangeValidity}
              label="Início"
              variant="outlined"
              size="small"
              sx={{ width: "170px" }}
              disabled={currentMonth || lastMonth || currentYear || lastYears}
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
              [classes.inputPlaceholder]: maxDate.length === 0,
            })}
          >
            <InputMask
              mask={"99/99/9999"}
              name="maxDateInput"
              placeholder="DD/MM/AAAA"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <CalendarTodayIcon className={classes.iconProp} />
                </InputAdornment>,
              }}
              value={maxDate}
              onChange={handleChangeValidity}
              label="Término"
              variant="outlined"
              size="small"
              sx={{ width: "170px" }}
              disabled={currentMonth || lastMonth || currentYear || lastYears}
            >
              {(inputProps) =>
                <ThemedTextField
                  {...inputProps} />
              }
            </InputMask>
          </FormControl>
        </Grid>
        <Typography className={classes.titleInsideFilter}>aplicação</Typography>
        <Grid container className={classes.wrapperDateFilters}>
          <FormControlLabel
            control={
              <CustomCheckBox
                checked={currentMonth}
                onChange={handleValidityCheckboxes}
                name="currentMonth"
              />
            }
            label={
              <MenuItem className={classes.itemLabelFilter}>
                <Typography className={classes.textInsideFilter}>
                  Mês atual
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
                checked={lastMonth}
                onChange={handleValidityCheckboxes}
                name="lastMonth"
              />
            }
            label={
              <MenuItem className={classes.itemLabelFilter}>
                <Typography className={classes.textInsideFilter}>
                  Mês passado
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
                checked={currentYear}
                onChange={handleValidityCheckboxes}
                name="currentYear"
              />
            }
            label={
              <MenuItem className={classes.itemLabelFilter}>
                <Typography className={classes.textInsideFilter}>
                  Ano atual
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
                checked={lastYears}
                onChange={handleValidityCheckboxes}
                name="lastYears"
              />
            }
            label={
              <MenuItem className={classes.itemLabelFilter}>
                <Typography className={classes.textInsideFilter}>
                  Anos passados
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
            <Typography className={classes.textInsideFilter}>Ativo</Typography>
          </MenuItem>}
          className={cx(
            classes.wrapperLabelSelectFilter,
            classes.fullWidth
          )}
        />
        <FormControlLabel
          control={<CustomCheckBox checked={inactive} onChange={handleStatusCheckboxes} name="inactive" />}
          label={<MenuItem className={classes.itemLabelFilter}>
            <Typography className={classes.textInsideFilter}>Inativo</Typography>
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

    if (Object.keys(filtered)[0] === "desconto") {
      setMinDiscount("")
      setMaxDiscount("")
    } else if (Object.keys(filtered)[0] === "início") {
      if (filtered.isCheckbox) {
        setDateCheckBox({ ...dateCheckBox, [checkBoxKey]: false })
      } else {
        setMinDate("")
        setMaxDate("")
      }
    } else if (Object.keys(filtered)[0] === "status") {
      setStatusCheckBox({ ...statusCheckBox, [checkBoxKey]: false })
    }
  }

  const cleanAllFilters = () => {
    setMinDiscount("")
    setMaxDiscount("")
    setMinDate("")
    setMaxDate("")

    setStatusCheckBox({
      active: false,
      inactive: false,
    })

    setDateCheckBox({
      currentMonth: false,
      lastMonth: false,
      currentYear: false,
      lastYears: false,
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
        recurrent: coupon.recurrent,
      }
    })

    setCoupons(newCoupons)
  }

  return (
    <Grid>
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
      }
      {loader &&
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 350px)" }}>
          <CircularProgress />
        </Grid>
      }
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </Grid>
  )
}

DiscountCoupons.propTypes = {
  customer: PropTypes.any,
}

export default DiscountCoupons