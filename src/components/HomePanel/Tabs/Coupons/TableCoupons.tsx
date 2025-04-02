import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import InputMask from "react-input-mask"

import PropTypes from "prop-types"
import moment from "moment"

import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"

import useStyles from "../../../../styles/HomePanel/Tabs/Coupons/TableCoupons"
import AddIcon from "../../../../img/icons/addIcon.svg?react"
import ArrowDownIcon from "../../../../img/icons/arrowDown.svg?react"
import EmptyTable from "../../../Common/EmptyTable"
import ItemTableCoupons from "./ItemTableCoupons"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import CustomModal from "../../../Common/CustomModal"
import theme from "../../../../styles/Utils/Theme"
import couponStore from "../../../../stores/CouponStore"
import planStore from "../../../../stores/PlanStore"
import masksUtils from "../../../../utils/MasksUtils"
import CustomRadio from "../../../Common/Themed/ThemedRadio"
import toolsUtils from "../../../../utils/ToolsUtils"
import ThemedTextField from "../../../Common/Themed/ThemedTextField"
import ThemedSelectFormControl from "../../../Common/Themed/ThemedSelectFormControl"
import CancelToken from "../../../../helpers/cancelToken"
import { CouponType } from "../../../../interfaces/Coupons"
import { PlansType } from "../../../../interfaces/Plans"


function TableCoupons(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [isEmptyState, setIsEmptyState] = useState<boolean>(false)
  const [totalrows, setTotalRows] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loaderBackdrop, setLoaderBackdrop] = useState<boolean>(false)
  const [typeModal, setTypeModal] = useState<string>("")
  const [titleModal, setTitleModal] = useState<string>("")
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType>(null)
  const [codeCoupon, setCodeCoupon] = useState<string>("")
  const [discountCoupon, setDiscountCoupon] = useState<string | number>("")
  const [amountCoupon, setAmountCoupon] = useState<string | number>("")
  const [endDateCoupon, setEndDateCoupon] = useState<string>("")
  const [plans, setPlans] = useState<PlansType[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [flagCodeCouponError, setFlagCodeCouponError] = useState<boolean>(false)
  const [textCodeCouponError, setTextCodeCouponError] = useState<string>("")
  const [flagDiscountCouponError, setFlagDiscountCouponError] = useState<boolean>(false)
  const [textDiscountCouponError, setTextDiscountCouponError] = useState<string>("")
  const [flagAmountCouponError, setFlagAmountCouponError] = useState<boolean>(false)
  const [textAmountCouponError, setTextAmountCouponError] = useState<string>("")
  const [flagEndDateCouponError, setFlagEndDateCouponError] = useState<boolean>(false)
  const [textEndDateCouponError, setTextEndDateCouponError] = useState<string>("")
  const [flagPlansCouponError, setFlagPlansCouponError] = useState<boolean>(false)
  const [textPlansCouponError, setTextPlansCouponError] = useState<string>("")
  const [recurrentRadio, setRecurrentRadio] = useState<boolean>(true)

  const modalButtons = [
    { label: t("general.modalCancelBtn"), action: (status) => setOpenModal(status) },
    { label: t("general.modalSaveBtn"), action: () => newOrEditCoupon() },
    { label: t("general.modalRemoveBtn"), action: () => removeCoupon(), color: theme.colors.error[40] },
  ]

  const optionRecurrent = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ]

  useEffect(() => {
    if (typeModal === "remove") {
      setTitleModal("Remover cupom")
    } else if (typeModal === "edit") {
      setTitleModal("Editar cupom")
      setCodeCoupon(selectedCoupon.name)
      setDiscountCoupon(selectedCoupon.value)
      setAmountCoupon(selectedCoupon.amount)
      setEndDateCoupon(selectedCoupon.expirer_at)
      if (selectedCoupon.recurrent !== null) {
        setRecurrentRadio(selectedCoupon.recurrent)
      }
    } else {
      setTitleModal("Criar cupom")
      setCodeCoupon("")
      setDiscountCoupon("")
      setAmountCoupon("")
      setEndDateCoupon("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeModal])

  useEffect(() => {
    if (codeCoupon.length > 0) {
      setFlagCodeCouponError(false)
      setTextCodeCouponError("")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeCoupon])

  useEffect(() => {
    if (typeof discountCoupon === "number" && discountCoupon > 0) {
      setFlagDiscountCouponError(false)
      setTextDiscountCouponError("")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountCoupon])

  useEffect(() => {
    if (typeof amountCoupon === "number" && amountCoupon > 0) {
      setFlagAmountCouponError(false)
      setTextAmountCouponError("")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountCoupon])

  useEffect(() => {
    if (endDateCoupon.length > 0) {
      setFlagEndDateCouponError(false)
      setTextEndDateCouponError("")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDateCoupon])

  useEffect(() => {
    if (selectedPlan.length > 0) {
      setFlagPlansCouponError(false)
      setTextPlansCouponError("")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlan])

  useEffect(() => {
    if (props.coupons.length > 0) {
      setIsEmptyState(false)
    } else {
      setIsEmptyState(true)
    }
  }, [props.coupons])

  useEffect(() => {
    if (props.totalRows) {
      setTotalRows(props.totalRows)
    }
  }, [props.totalRows])

  useEffect(() => {
    if (props.page) {
      setPage(props.page)
    }
  }, [props.page])

  const getPlans = () => {
    setLoaderBackdrop(true)
    planStore.getListPlans(CancelToken(), null, responseGetPlans)
  }

  const responseGetPlans = (response) => {
    CancelToken().remove(response.id)
    setLoaderBackdrop(false)

    if (response.data) {
      setPlans(response.data.items || [])
      handleModal(true, "new")
    }

    if (response.status) {
      couponStore.emit("coupons_feedback", response.status.toString())
    }
  }

  const newOrEditCoupon = () => {
    if ((typeModal === "edit" || selectedPlan !== "") && codeCoupon !== "" && discountCoupon !== "" &&
      (typeof discountCoupon === "number" && discountCoupon > 0) && amountCoupon !== "" &&
      (typeof amountCoupon === "number" && amountCoupon > 0) && endDateCoupon !== ""
    ) {
      const newCoupon: CouponType = {
        name: codeCoupon,
        discount: masksUtils.percentNumber(+discountCoupon),
        amount: +amountCoupon,
        expirer_at: moment(endDateCoupon, "DD MM YYYY").format(),
        recurrent: recurrentRadio
      }

      props.handleLoader(true)

      if (typeModal === "new") {
        newCoupon.plan_objectid = selectedPlan
        newCoupon.enable = true

        couponStore.postCoupon(CancelToken(), newCoupon, responseNewOrEditCoupon)
      } else {
        couponStore.updateCoupon(CancelToken(), selectedCoupon.objectid, newCoupon, responseNewOrEditCoupon)
      }
    } else {
      handleFieldsError()
    }
  }

  const responseNewOrEditCoupon = (response) => {
    CancelToken().remove(response.id)
    props.handleLoader(false)

    if (response.data) {
      couponStore.emit("coupons_feedback", "200")
      couponStore.emit("coupons_reload")
      handleModal(false, typeModal)

      setCodeCoupon("")
      setDiscountCoupon("")
      setAmountCoupon("")
      setEndDateCoupon("")

      if (typeModal === "new") {
        setSelectedPlan("")
      }
    }

    if (response.status) {
      couponStore.emit("coupons_feedback", response.status.toString())
    }
  }

  const removeCoupon = () => {
    props.handleLoader(true)
    handleModal(false, "delete")
    couponStore.archiveCoupon(CancelToken(), selectedCoupon.objectid, responseRemoveCoupon)
  }

  const responseRemoveCoupon = (response) => {
    CancelToken().remove(response.id)
    props.handleLoader(false)

    if (response.data?.status === 200) {
      couponStore.emit("coupons_reload")
      couponStore.emit("coupons_feedback", response.data.status.toString())
    }

    if (response.status) {
      couponStore.emit("coupons_feedback", response.status.toString())
    }
  }

  const handleFieldsError = () => {
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

    if (!toolsUtils.isValidDate(endDateCoupon)) {
      setFlagEndDateCouponError(true)
      setTextEndDateCouponError(t("general.errorMessage4"))
    }

    if (selectedPlan.length === 0) {
      setFlagPlansCouponError(true)
      setTextPlansCouponError(t("general.errorMessage3"))
    }
  }

  const handleChangePage = (_, newPage: number) => {
    setPage(newPage)

    props.handlePage(newPage)
    props.handleFlagReloadPage(true)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)

    props.handlePage(0)
    props.handleFlagReloadPage(true)
    props.handleRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleModal = (status, type, coupon = null) => {
    setOpenModal(status)
    setTypeModal(type)

    if (coupon) {
      setSelectedCoupon(coupon)
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

  const handleChangePlan = (event) => {
    setSelectedPlan(event.target.value)
  }

  const handleCloseBackdrop = () => {
    setLoaderBackdrop(false)
  }

  const handleRecurrentRadio = (event) => {
    setRecurrentRadio(event.target.value === "true")
  }

  const bodyModal = () => {
    return (
      <Grid>
        {typeModal === "remove" ? contentDeleteModal() : contentNewOrEditModal()}
      </Grid>
    )
  }

  const contentDeleteModal = () => {
    return (
      <Grid>
        <Typography className={classes.textModal}>{t("homePanel.coupons.modal.mainText")}</Typography>
      </Grid>
    )
  }

  const contentNewOrEditModal = () => {
    return (
      <Grid container spacing={2}>
        {typeModal === "new" &&
          <Grid item xs={12}>
            <ThemedSelectFormControl fullWidth size="small">
              <InputLabel id="select-label-plan">{t("homePanel.coupons.modal.labelSelect")}</InputLabel>
              <Select
                labelId="select-label-plan"
                id="select-plan"
                value={selectedPlan}
                defaultValue={plans[0].objectid}
                label={t("homePanel.coupons.modal.labelSelect")}
                IconComponent={ArrowDownIcon}
                onChange={handleChangePlan}
                error={flagPlansCouponError}
              >
                {plans.map((plan, index) => {
                  return <MenuItem key={index} value={plan.objectid}>{plan.name}</MenuItem>
                })}
              </Select>
              {flagPlansCouponError &&
                <FormHelperText className={classes.errorMessage}>{textPlansCouponError}</FormHelperText>
              }
            </ThemedSelectFormControl>
          </Grid>
        }
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
          <Typography className={classes.titleTable}>
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
                    className={classes.labelRadio}
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

  return (
    <Grid>
      <Card component={Paper} className={classes.wrapperCard}>
        <Button
          color="primary"
          className={classes.btPrimary}
          onClick={plans.length === 0 ? getPlans : () => handleModal(true, "new")}
        >
          <AddIcon />
          <Typography className={classes.txtBtAdd}>
            {t("homePanel.coupons.addLabel")}
          </Typography>
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ maxWidth: "144px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.coupons.tableHeader1")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "88px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.coupons.tableHeader2")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "96px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.coupons.tableHeader3")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "96px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.coupons.tableHeader4")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "96px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.coupons.tableHeader5")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "56px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.coupons.map((coupon, index) => (
                <ItemTableCoupons
                  key={index}
                  coupon={coupon}
                  handleModal={handleModal}
                />
              ))}
              {isEmptyState && <EmptyTable colspan={6} />}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid className={classes.wrapperPagination}>
          <TablePagination
            component="div"
            className={classes.textTable}
            count={totalrows}
            page={!totalrows || totalrows <= 0 ? 0 : page}
            rowsPerPage={props.rowsPerPage || ConstantsUtils.RowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("tablePagination.mainLabel")}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${t("tablePagination.secondaryLabel")}
              ${count !== -1 ? count : `${t("tablePagination.tertiaryLabel")} ${to}}`}`
            }
          />
        </Grid>
      </Card>
      <CustomModal
        open={openModal}
        dispense={modalButtons[0]}
        confirm={typeModal === "remove" ? modalButtons[2] : modalButtons[1]}
        title={titleModal}
        size={typeModal === "remove" ? "small" : "medium"}
      >
        {bodyModal()}
      </CustomModal>
      <Backdrop
        sx={{ color: '#fff', zIndex: 100 }}
        open={loaderBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </Grid>
  )
}

TableCoupons.propTypes = {
  coupons: PropTypes.arrayOf(
    PropTypes.shape({
      objectid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      expirer_at: PropTypes.string.isRequired,
      recurrent: PropTypes.bool,
    })
  ).isRequired,
  totalRows: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handlePage: PropTypes.func.isRequired,
  handleRowsPerPage: PropTypes.func.isRequired,
  handleFlagReloadPage: PropTypes.func.isRequired,
  handleLoader: PropTypes.func.isRequired,
}

export default TableCoupons