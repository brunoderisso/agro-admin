import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"
import moment from "moment"

import {
  Backdrop,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import ViewInvoiceIcon from "../../../../img/icons/viewInvoiceIcon.svg?react"
import PixIcon from "../../../../img/icons/pixIcon_dark.svg?react"
import PixModal from "./PixModal"
import useStyles from "../../../../styles/Customer/CustomerInvoices/InvoiceList"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import EmptyTable from "../../../Common/EmptyTable"
import masksUtils from "../../../../utils/MasksUtils"
import theme from "../../../../styles/Utils/Theme"
import invoiceStore from "../../../../stores/InvoiceStore"
import UserFeedback from "../../../Common/UserFeedback"
import CancelToken from "../../../../helpers/cancelToken"
import { InvoiceType } from "../../../../interfaces/Customer/Invoice"


function InvoiceList(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [invoices, setInvoices] = useState<InvoiceType[]>([])
  const [invoiceClicked, setInvoiceClicked] = useState<InvoiceType>(null)
  const [totalrows, setTotalRows] = useState(0)
  const [page, setPage] = useState(0)
  const [isEmptyState, setIsEmptyState] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [loaderBackdrop, setLoaderBackdrop] = useState(false)
  const [errorStatusResponse, setErrorStatusResponse] = useState("")

  const invoiceRef = useRef(null)

  const optionCardMenu = [
    { text: "Reembolsar" },
    { text: "Atualizar" },
    { text: "Cancelar", color: theme.colors.error[40] },
  ]

  useEffect(() => {
    setInvoices(props.invoices || [])

    if (props.invoices.length > 0) {
      setIsEmptyState(false)
    } else {
      setIsEmptyState(true)
    }
  }, [props.invoices])

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

  const refundInvoice = () => {
    setLoaderBackdrop(true)
    invoiceStore.postRefundInvoice(CancelToken(), invoiceRef.current.objectid, responseRefundInvoice)
  }

  const responseRefundInvoice = (response) => {
    CancelToken().remove(response.id)
    setLoaderBackdrop(false)

    if (response.data) {
      setErrorStatusResponse("200")
      props.getInvoices()
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const refreshInvoice = () => {
    setLoaderBackdrop(true)
    invoiceStore.postRefreshInvoice(CancelToken(), invoiceRef.current.objectid, responseRefreshInvoice)
  }

  const responseRefreshInvoice = (response) => {
    CancelToken().remove(response.id)
    setLoaderBackdrop(false)

    if (response.data) {
      setErrorStatusResponse("200")
      props.getInvoices()
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const cancelInvoice = () => {
    setLoaderBackdrop(true)
    invoiceStore.postCancelInvoice(CancelToken(), invoiceRef.current.objectid, responseCancelInvoice)
  }

  const responseCancelInvoice = (response) => {
    CancelToken().remove(response.id)
    setLoaderBackdrop(false)

    if (response.data) {
      setErrorStatusResponse("200")
      props.getInvoices()
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const handleClickBt = (event, invoice) => {
    setAnchorEl(event.currentTarget)
    invoiceRef.current = invoice
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const menuOption = () => {
    return (
      <Menu
        id="option-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        elevation={4}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {optionCardMenu.map((item, index) => {
          return (
            <MenuItem key={index} onClick={() => { handleMenuItem(item.text) }}>
              <Typography className={classes.textItemMenu} sx={{ color: item.color }}>
                {item.text}
              </Typography>
            </MenuItem>
          )
        })
        }
      </Menu>
    )
  }

  const handleMenuItem = (text) => {
    handleCloseMenu()

    switch (text) {
      case "Reembolsar": {
        refundInvoice()

        break
      }
      case "Atualizar": {
        refreshInvoice()
        break
      }
      case "Cancelar": {
        cancelInvoice()

        break
      }
      default: {
        break
      }
    }
  }

  const getInvoiceButtons = (invoice) => {
    return (
      <Grid container>
        <IconButton onClick={() => { onClickViewInvoice(invoice) }}><ViewInvoiceIcon /></IconButton>
        <IconButton onClick={() => { onClickPix(invoice) }}><PixIcon /></IconButton>
        <IconButton
          aria-label="option"
          size="small"
          color="inherit"
          className={classes.btOptions}
          onClick={(event) => { handleClickBt(event, invoice) }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Grid>
    )
  }

  const onClickViewInvoice = (invoice) => {
    window.open(invoice?.secure_url, '_blank').focus()
  }

  const onClickPix = (invoice) => {
    setInvoiceClicked(invoice)
  }

  const handleClosePixModal = () => {
    setInvoiceClicked(null)
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

  const handleCloseBackdrop = () => {
    setLoaderBackdrop(false)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "paid":
        return "Pago"

      case "canceled":
        return "Cancelado"

      case "pending":
        return "Pendente"

      case "refunded":
        return "Estornado"

      case "expired":
        return "Expirado"

      case "externally_paid":
        return "Pago Externamente"

      case "chargeback":
        return "Contestado"

      case "partially_paid":
        return "Parcialmente Pago"

      default:
        break
    }
  }

  return (
    <Grid>
      <Card elevation={1} className={classes.tableContainer}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="overline" className={classes.textCard}>DATA</Typography></TableCell>
                <TableCell><Typography variant="overline" className={classes.textCard}>PLANO</Typography></TableCell>
                <TableCell><Typography variant="overline" className={classes.textCard}>VALOR</Typography></TableCell>
                <TableCell><Typography variant="overline" className={classes.textCard}>STATUS</Typography></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="caption" className={classes.textCard}>
                        {invoice.due_date ? moment(invoice.due_date).format("DD/MM/YYYY") : ConstantsUtils.NullFieldMask}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" className={classes.textCard}>{invoice.plan_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" className={classes.textCard}>
                        {invoice.total_cents
                          ? masksUtils.currencyFormatToReal(invoice.total_cents)
                          : ConstantsUtils.NullFieldMask
                        }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" className={classes.textCard}>{getStatusLabel(invoice.status)}</Typography>
                    </TableCell>
                    <TableCell>{getInvoiceButtons(invoice)}</TableCell>
                  </TableRow>
                )
              })}
              {isEmptyState && <EmptyTable colspan={5} />}
            </TableBody>
          </Table>
        </TableContainer>
        {menuOption()}
        <Grid className={classes.wrapperPagination}>
          <TablePagination
            component="div"
            className={classes.textCard}
            count={+totalrows}
            page={!totalrows || +totalrows <= 0 ? 0 : page}
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
      <PixModal open={Boolean(invoiceClicked?.objectid)} handleClose={handleClosePixModal} invoice={invoiceClicked} />
      <Backdrop
        sx={{ color: "#fff", zIndex: 100 }}
        open={loaderBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </Grid>
  )
}

InvoiceList.propTypes = {
  customer: PropTypes.any,
  invoices: PropTypes.any.isRequired,
  totalRows: PropTypes.any,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handlePage: PropTypes.func,
  handleFlagReloadPage: PropTypes.func,
  handleRowsPerPage: PropTypes.func,
  getInvoices: PropTypes.func,
}

export default InvoiceList