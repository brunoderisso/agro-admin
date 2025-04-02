import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import PropTypes from "prop-types"

import {
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"

import useStyles from "../../../../styles/HomePanel/Tabs/Plans/TablePlans"
import ItemTablePlans from "./ItemTablePlans"
import AddIcon from "../../../../img/icons/addIcon.svg?react"
import EmptyTable from "../../../Common/EmptyTable"
import CustomModal from "../../../Common/CustomModal"
import theme from "../../../../styles/Utils/Theme"
import planStore from "../../../../stores/PlanStore"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import CancelToken from "../../../../helpers/cancelToken"
import { PlansTableType } from "../../../../interfaces/Plans"


function TablePlans(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [totalrows, setTotalRows] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [isEmptyState, setIsEmptyState] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState<PlansTableType>(null)

  const suspendModalButtons = [
    { label: t("general.modalCancelBtn"), action: (status) => handleModal(status) },
    { label: t("homePanel.plans.modal.labelRemove"), action: () => deletePlan(), color: theme.colors.error[40] }
  ]

  useEffect(() => {
    if (props.plans.length > 0) {
      setIsEmptyState(false)
    } else {
      setIsEmptyState(true)
    }
  }, [props.plans])

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

  const newPlan = () => {
    navigate("/plan/new")
  }

  const deletePlan = () => {
    handleModal(false)
    props.handleLoader(true)

    planStore.archivePlan(CancelToken(), selectedPlan.objectid, responseDeletePlan)
  }

  const responseDeletePlan = (response) => {
    CancelToken().remove(response.id)
    props.handleLoader(false)

    if (response.data?.status === 200) {
      planStore.emit("plans_reload")
      planStore.emit("plans_feedback", response.data.status.toString())
    }

    if (response.status) {
      planStore.emit("plans_feedback", response.status.toString())
    }
  }

  const handleModal = (status, plan = null) => {
    setOpenModal(status)

    if (plan) {
      setSelectedPlan(plan)
    }
  }

  const handleChangePage = (_, newPage) => {
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

  const bodyModal = () => {
    return (
      <Grid>
        <Typography className={classes.textItemMenu}>
          {t("homePanel.plans.modal.mainTextSuspend")}
        </Typography>
        <Grid container className={classes.contentWarningText}>
          <Grid item xs={1}>
            <InfoIcon className={classes.iconWarning} />
          </Grid>
          <Grid item xs={11}>
            <Typography className={classes.warningText}>
              {t("homePanel.plans.modal.secondaryTextSuspend")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid>
      <Card component={Paper} className={classes.wrapperCard}>
        <Button color="primary" className={classes.btPrimary} onClick={newPlan}>
          <AddIcon />
          <Typography className={classes.txtBtAdd}>
            {t("homePanel.plans.addLabel")}
          </Typography>
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ maxWidth: "280px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.plans.tableHeader1")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "96px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.plans.tableHeader2")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "176px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.plans.tableHeader3")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "104px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.plans.tableHeader4")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "96px" }}>
                  <Typography className={classes.titleTable}>
                    {t("homePanel.plans.tableHeader5")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "56px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.plans.map((plan, index) => (
                <ItemTablePlans
                  key={index}
                  plan={plan}
                  handleModal={(status, plan) => { handleModal(status, plan) }}
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
        dispense={suspendModalButtons[0]}
        confirm={suspendModalButtons[1]}
        title={t("homePanel.plans.modal.labelRemove")}
        size={"medium"}
      >
        {bodyModal()}
      </CustomModal>
    </Grid>
  )
}

TablePlans.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      objectid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
      interval: PropTypes.string,
      status: PropTypes.string.isRequired,
      payments: PropTypes.arrayOf(PropTypes.string).isRequired,
      features: PropTypes.arrayOf(PropTypes.any),
      subitems: PropTypes.arrayOf(PropTypes.any),
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

export default TablePlans