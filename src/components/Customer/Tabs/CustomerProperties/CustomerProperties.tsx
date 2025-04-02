import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

import { CircularProgress, Grid, Typography } from "@mui/material"

import TabPanel from "../../../Common/TabPanel"
import useStyles from "../../../../styles/Customer/CustomerProperties/CustomerProperties"
import PropertiesCards from "./PropertiesCards"
import customerStore from "../../../../stores/CustomerStore"
import polygonUtils from "../../../../utils/PolygonUtils"
import UserFeedback from "../../../Common/UserFeedback"
import NewPropertyCard from "./NewPropertyCard"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import CustomerBreadcrumb from "../CustomerBreadcrumb"
import useParamsPagination from "../../../../hook/useParamsPagination"
import { CustomerType } from "../../../../interfaces/Customers"
import CancelToken from "../../../../helpers/cancelToken"
import { PropertyType } from "../../../../interfaces/Customer/Property"


function CustomerProperties() {
  const [customer] = useOutletContext<[CustomerType]>()
  const { classes } = useStyles()
  const navigate = useNavigate()
  const pagination = useParamsPagination()

  const [loader, setLoader] = useState<boolean>(false)
  const [properties, setProperties] = useState<PropertyType[]>([])
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")
  const [totalrows, setTotalRows] = useState<number>(0)
  const [page, setPage] = useState<number>(null)
  const [rowsPerPage, setRowsPerPage] = useState<number>(null)
  const [flagReloadPage, setFlagReloadPage] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    bind()

    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    if (customer.objectid) {
      getProperties()
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
      getProperties()
      navigate("/customer/" + customer.objectid + "/property?start=" + totalItems + "&limit=" + rowsPerPage)
    }

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  const bind = () => {
    customerStore.addListener("properties_feedback", setErrorStatusResponse)
    customerStore.addListener("customers_reload", getProperties)
  }

  const clear = () => {
    customerStore.removeListener("properties_feedback", setErrorStatusResponse)
    customerStore.removeListener("customers_reload", getProperties)
  }

  const getProperties = (customerId = null) => {
    const pagination = {
      start: totalItems,
      limit: rowsPerPage || ConstantsUtils.RowsPerPage
    }

    setLoader(true)
    customerStore.getPropertiesByCustomer(CancelToken(), customerId || customer.objectid, pagination, responseGetProperties)
  }

  const responseGetProperties = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data?.items.length > 0) {
      setTotalRows(response.data.totalItems)

      const listProperties = response.data.items.map(item => {
        return {
          objectid: item.objectid,
          name: item.name,
          area: polygonUtils.convertAreaToHa(item.area),
          productiveSize: "" // TODO: temporário
        }
      })

      setProperties(listProperties)
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
      <CustomerBreadcrumb customer={customer} tab="property?start=0&limit=10" />

      <Typography sx={{ margin: "24px 0px" }} variant="h1" className={classes.title}>
        Propriedades Cadastradas
      </Typography>

      {!loader &&
        <Grid container spacing={3} sx={{ marginTop: "24px" }}>
          <PropertiesCards
            properties={properties}
            customerId={customer.objectid}
            totalRows={totalrows}
            page={page}
            rowsPerPage={rowsPerPage}
            handleRowsPerPage={handleRowsPerPage}
            handleFlagReloadPage={setFlagReloadPage}
            handlePage={handlePage}
          />
          <NewPropertyCard
            index={properties.length}
            handleLoader={setLoader}
            handleError={setErrorStatusResponse}
            customerId={customer.objectid}
            callback={getProperties}
          />
        </Grid>
      }
      {loader &&
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 250px)" }}>
          <CircularProgress />
        </Grid>
      }
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </TabPanel>
  )
}

export default CustomerProperties