import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import {
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

import InfoIcon from '@mui/icons-material/Info'

import useStyles from "../../../../styles/HomePanel/Tabs/Customers/TableCustomers"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import theme from "../../../../styles/Utils/Theme"
import CustomModal from "../../../Common/CustomModal"
import EmptyTable from "../../../Common/EmptyTable"
import ContactModal from "./ContactModal"
import ItemTableCustomers from "./ItemTableCustomers"
import stringsUtils from "../../../../utils/StringUtils"
import customerStore from "../../../../stores/CustomerStore"
import CancelToken from "../../../../helpers/cancelToken"
import { CustomerTableType } from "../../../../interfaces/Customers"


function TableCustomers(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openContactModal, setOpenContactModal] = useState<boolean>(false)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerTableType>(null)
  const [totalrows, setTotalRows] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [isEmptyState, setIsEmptyState] = useState<boolean>(false)

  const suspendModalButtons = [
    { label: t("general.modalCancelBtn"), action: (status) => handleModal(status) },
    { label: t("homePanel.customers.menuOption.text3"), action: () => suspendCustomer(), color: theme.colors.error[40] }
  ]

  useEffect(() => {
    if (props.customers.length > 0) {
      setIsEmptyState(false)
    } else {
      setIsEmptyState(true)
    }
  }, [props.customers])

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

  const suspendCustomer = () => {
    props.handleLoader(true)
    customerStore.postSuspendCustomer(CancelToken(), selectedCustomer.objectId, responseSuspendCustomer)
  }

  const responseSuspendCustomer = (response) => {
    CancelToken().remove(response.id)
    props.handleLoader(false)

    if (response.data?.status === 200) {
      props.handleError("200")
    }

    if (response.status) {
      props.handleError(response.status.toString())
    }
  }

  const handleModal = (status, customer = null) => {
    setOpenModal(status)

    if (customer) {
      setSelectedCustomer(customer)
    }
  }

  const handleContactModal = (status, customer) => {
    const [name, surname] = stringsUtils.getNameAndSurname(customer.name)
    const newCustomer = {
      objectId: customer.objectId,
      name,
      surname,
      email: customer.email,
      phone: customer.phone,
      typeAccount: "Conta prediza"
    }

    setOpenContactModal(status)
    setSelectedCustomer(newCustomer)
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
          {t("homePanel.customers.modal.mainTextSuspend")}
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
      <Card component={Paper} className={classes.wrapperCard}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ maxWidth: "304px" }}>
                  <Typography className={cx(classes.titleTable, classes.textTable)}>
                    {t("homePanel.customers.tableHeader1")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "204px" }}>
                  <Typography className={cx(classes.titleTable, classes.textTable)}>
                    {t("homePanel.customers.tableHeader2")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "80px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.customers.map((customer, index) => (
                <ItemTableCustomers
                  customer={customer}
                  key={index}
                  index={index}
                  handleModal={handleModal}
                  handleContactModal={handleContactModal}
                />
              ))}
              {isEmptyState && <EmptyTable colspan={3} />}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid className={classes.wrapperPagination}>
          <TablePagination
            component="div"
            className={cx(classes.commonText, classes.textTable)}
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
        title={t("homePanel.customers.menuOption.text3")}
        size={'medium'}
      >
        {bodyModal()}
      </CustomModal>
      <ContactModal
        open={openContactModal}
        handle={setOpenContactModal}
        customer={selectedCustomer}
      />
    </Grid>
  )
}

TableCustomers.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      phone: PropTypes.any
    })
  ).isRequired,
  totalRows: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handlePage: PropTypes.func.isRequired,
  handleLoader: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  handleRowsPerPage: PropTypes.func.isRequired,
  handleFlagReloadPage: PropTypes.func.isRequired,
}

export default TableCustomers