import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { CircularProgress, Grid } from "@mui/material"
import Typography from "@mui/material/Typography"

import useStyles from "../../../../styles/HomePanel/Tabs/Customers/CustomerTab"
import customerStore from "../../../../stores/CustomerStore"
import TableCustomers from "./TableCustomers"
import FilterTable from "../../../Common/FilterTable"
import TabPanel from "../../../Common/TabPanel"
import UserFeedback from "../../../Common/UserFeedback"
import useParamsPagination from "../../../../hook/useParamsPagination"
import CancelToken from "../../../../helpers/cancelToken"
import { CustomerType } from "../../../../interfaces/Customers"


function CustomerTab() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const pagination = useParamsPagination()
  const { t } = useTranslation()

  const [customers, setCustomers] = useState<CustomerType[]>([])
  const [customersToRef, setCustomersToRef] = useState<CustomerType[]>(null)
  const [loader, setLoader] = useState<boolean>(false)
  const [page, setPage] = useState<number>(null)
  const [rowsPerPage, setRowsPerPage] = useState<number>(null)
  const [totalrows, setTotalRows] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [flagReloadPage, setFlagReloadPage] = useState<boolean>(false)
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")

  const filtersLabel = [{ label: t("homePanel.customers.filters.inputLabel") }]

  const filterInput = {
    placeholder: t("homePanel.customers.filters.placeholderInput"),
    label: t("homePanel.customers.filters.inputLabel")
  }

  useEffect(() => {
    setRowsPerPage(pagination.rowsPerPage)
    setTotalItems(pagination.totalItems)
    setPage(pagination.totalItems / pagination.rowsPerPage)
  }, [pagination])

  useEffect(() => {
    if (page || rowsPerPage) {
      getCustomers()
    }

    if (flagReloadPage) {
      navigate("/customer?start=" + totalItems + "&limit=" + rowsPerPage)
    }
  }, [page, rowsPerPage])

  const getCustomers = () => {
    const pagination = {
      start: totalItems,
      limit: rowsPerPage
    }

    setLoader(true)
    customerStore.getListCustomers(CancelToken(), pagination, responseGetCustomers)
  }

  const responseGetCustomers = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setTotalRows(response.data.totalItems)

      const mapCustomers = response.data.items.map(customer => {
        return {
          name: customer.name,
          email: customer.email,
          phone: customer.phone_prefix + customer.phone,
          objectId: customer.objectid
        }
      })

      setCustomers(mapCustomers)
      setCustomersToRef(mapCustomers)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const handlePage = (newPage) => {
    if (newPage > page) {
      setTotalItems(totalItems + rowsPerPage);
    } else if (newPage < page) {
      setTotalItems(totalItems - rowsPerPage);
    }

    setPage(newPage)
  }

  const handleRowsPerPage = (newValue) => {
    setRowsPerPage(newValue)
    setTotalItems(0)
  }

  return (
    <TabPanel value={0} index={0}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.tabTitle}>
            {t("homePanel.customers.tabTitle")}
          </Typography>
        </Grid>
        <FilterTable
          filterInput={filterInput}
          labels={filtersLabel}
          contentToRef={customersToRef}
          updateFilteredItems={(filteredCustomers) => { setCustomers(filteredCustomers) }}
        />
        {!loader &&
          <Grid item xs={12}>
            <TableCustomers
              customers={customers}
              totalRows={totalrows}
              page={page}
              rowsPerPage={rowsPerPage}
              handleRowsPerPage={handleRowsPerPage}
              handleFlagReloadPage={setFlagReloadPage}
              handlePage={handlePage}
              handleLoader={setLoader}
              handleError={setErrorStatusResponse}
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

export default CustomerTab