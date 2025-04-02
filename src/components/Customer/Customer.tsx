import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom"

import { CircularProgress, Grid } from "@mui/material"

import CustomerMenu from "./CustomerMenu"
import customerStore from "../../stores/CustomerStore"
import UserFeedback from "../Common/UserFeedback"
import CancelToken from "../../helpers/cancelToken"


function Customer() {
  const [customer, setCustomer] = useState({})
  const [value, setValue] = useState<number>(0)
  const [loader, setLoader] = useState<boolean>(false)
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")

  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const url = location.pathname.split("/")[3]

  useEffect(() => {
    switch (url) {
      case "data":
        setValue(0)
        break
      case "subscription":
        setValue(1)
        break
      case "property":
        setValue(2)
        break
      case "payment":
        setValue(3)
        break
      case "invoice":
        setValue(4)
        break
      case "coupon":
        setValue(5)
        break
      default:
        setValue(0)
        handleChange(0)
        break
    }

    bind()

    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    setCustomer({})

    switch (url) {
      case "data":
        setValue(0)
        break
      case "subscription":
        setValue(1)
        break
      case "property":
        setValue(2)
        break
      case "payment":
        setValue(3)
        break
      case "invoice":
        setValue(4)
        break
      case "coupon":
        setValue(5)
        break
      default:
        setValue(0)
        handleChange(0)
        break
    }

    getCustomer()

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const bind = () => {
    customerStore.addListener("customer_reload", getCustomer)
    customerStore.addListener("customer_feedback", setErrorStatusResponse)
    customerStore.addListener("tab_handle", handleChange)
    customerStore.addListener("load_content", setLoader)
  }

  const clear = () => {
    customerStore.removeListener("customer_reload", getCustomer)
    customerStore.removeListener("customer_feedback", setErrorStatusResponse)
    customerStore.removeListener("tab_handle", handleChange)
    customerStore.removeListener("load_content", setLoader)
  }

  const handleChange = (value) => {
    let tab = ""

    switch (value) {
      case 0:
        tab = "data"
        break
      case 1:
        tab = "subscription"
        break
      case 2:
        tab = "property?start=0&limit=10"
        break
      case 3:
        tab = "payment"
        break
      case 4:
        tab = "invoice?start=0&limit=10"
        break
      case 5:
        tab = "coupon?start=0&limit=10"
        break
      default:
        tab = "data"
        break
    }
    setValue(value)
    navigate("/customer/" + id + "/" + tab)
  }

  const getCustomer = () => {
    setLoader(true)
    customerStore.getCustomer(CancelToken(), id, responseGetCustomer)
  }

  const responseGetCustomer = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setCustomer(response.data)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  return (
    <Grid container>
      <CustomerMenu handleChange={handleChange} value={value} />
      {!loader &&
        <Outlet context={[customer]} />
      }
      {loader &&
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 64px)" }}>
          <CircularProgress />
        </Grid>
      }
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </Grid>
  )
}

export default Customer