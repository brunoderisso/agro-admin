import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

import { CircularProgress, Grid, Typography } from "@mui/material"

import TabPanel from "../../../Common/TabPanel"
import useStyles from "../../../../styles/Customer/CustomerInvoices/CustomerInvoices"
import InvoiceList from "./InvoiceList"
import customerStore from "../../../../stores/CustomerStore"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import UserFeedback from "../../../Common/UserFeedback"
import CustomerBreadcrumb from "../CustomerBreadcrumb"
import useParamsPagination from "../../../../hook/useParamsPagination"
import { CustomerType } from "../../../../interfaces/Customers"
import CancelToken from "../../../../helpers/cancelToken"


function CustomerInvoices() {
  const { classes } = useStyles()
  const [customer] = useOutletContext<[CustomerType]>()
  const navigate = useNavigate()
  const pagination = useParamsPagination()

  const [invoices, setInvoices] = useState([])
  const [loader, setLoader] = useState(false)
  const [errorStatusResponse, setErrorStatusResponse] = useState("")
  const [totalRows, setTotalRows] = useState(0)
  const [flagReloadPage, setFlagReloadPage] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(null)
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    if (customer.objectid) {
      getCustomerInvoices()
    }

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer])

  useEffect(() => {
    setRowsPerPage(pagination.rowsPerPage)
    setTotalItems(pagination.totalItems)
    setPage(pagination.totalItems / pagination.rowsPerPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    const controller = new AbortController()

    if (customer.objectid && flagReloadPage) {
      getCustomerInvoices()
      navigate("/customer/" + customer.objectid + "/invoice?start=" + totalItems + "&limit=" + rowsPerPage)
    }

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  const getCustomerInvoices = () => {
    const pagination = {
      start: totalItems,
      limit: rowsPerPage || ConstantsUtils.RowsPerPage
    }

    setLoader(true)
    customerStore.getInvoicesByCustomer(CancelToken(), customer.objectid, pagination, responseGetInvoices)
  }

  const responseGetInvoices = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data?.items.length > 0) {
      setTotalRows(response.data.totalItems)
      setInvoices(response.data.items)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const handleRowsPerPage = (newValue) => {
    setRowsPerPage(newValue)
    setTotalItems(0)
  }

  const handlePage = (newPage) => {
    if (newPage > page) {
      setTotalItems(totalItems + rowsPerPage)
    } else if (newPage < page) {
      setTotalItems(totalItems - rowsPerPage)
    }

    setPage(newPage)
  }

  return (
    <TabPanel value={4} index={4} className={classes.tabPanel} >
      <CustomerBreadcrumb customer={customer} tab="invoice?start=0&limit=10" />

      <Typography sx={{ margin: "24px 0px" }} variant="h1" className={classes.title}>
        Histórico de cobranças
      </Typography>

      {!loader &&
        <InvoiceList
          customer={customer}
          invoices={invoices}
          totalRows={totalRows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleRowsPerPage={handleRowsPerPage}
          handleFlagReloadPage={setFlagReloadPage}
          handlePage={handlePage}
          getInvoices={getCustomerInvoices}
        />
      }
      {loader &&
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 350px)" }}>
          <CircularProgress />
        </Grid>
      }
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </TabPanel>
  )
}

export default CustomerInvoices