import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import PropTypes from "prop-types"

import { Box, Breadcrumbs, FormControl, Grid, InputAdornment, Link, ListSubheader, MenuItem, Select, Skeleton, TextField, } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

import useStyles from "../../../styles/Customer/CustomerBreadcrumb"
import CustomerStore from "../../../stores/CustomerStore"
import { CustomerType } from "../../../interfaces/Customers"
import CancelToken from "../../../helpers/cancelToken"
import { ApiResponseType, PaginateType } from "../../../interfaces/Utils"
import { useCustomerListStore } from "../../../stores/CustomerStore2"

const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

function CustomerBreadcrumb(props) {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const [customer, setCustomer] = useState<CustomerType>(null)
  const [selectedOption, setSelectedOption] = useState({})
  const [searchText, setSearchText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const customerListStore = useCustomerListStore()

  const displayedOptions = useMemo(
    () => customerListStore.customers.filter((c) => containsText(c.name, searchText)),
    [searchText, customerListStore.customers]
  )

  useEffect(() => {
    setCustomer(props.customer)
    setSelectedOption(props.customer.objectid)
  }, [props.customer])

  const onChangeCustomer = (value) => {
    navigate("/customer/" + value + "/" + props.tab)
  }

  const getCustomers = () => {
    if (customerListStore.customers.length > 0) {
      return
    }

    setLoading(true)
    CustomerStore.getListCustomers(CancelToken(), null, responseGetCustomers)
  }

  const responseGetCustomers = (response: ApiResponseType<PaginateType<CustomerType>>) => {
    CancelToken().remove(response.id)
    setLoading(false)

    if (response.data?.items?.length > 0) {
      customerListStore.setCustomers(response.data.items)
    }

    if (response.status) {
      CustomerStore.emit("customer_feedback", response.status.toString())
    }
  }

  const getSelectCustomer = () => {
    return (
      <Box key="1">
        <FormControl size="small">
          <Select
            MenuProps={{ autoFocus: false }}
            labelId="search-select-label"
            id="search-select"
            value={selectedOption}
            label="Options"
            onOpen={getCustomers}
            onChange={(e) => { onChangeCustomer(e.target.value) }}
            onClose={() => setSearchText("")}
            renderValue={() => customer?.name}
            className={classes.selectInput}
          >
            <ListSubheader>
              <TextField
                size="small"

                autoFocus
                placeholder="Digite para filtrar..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {

                    e.stopPropagation()
                  }
                }}
              />
            </ListSubheader>
            {loading
              ? <Grid container sx={{ gap: "2px" }}>
                {Array.from({ length: 3 }).map((_, index) => {
                  return <Skeleton key={index} variant="rectangular" width={"100%"} height={30} />
                })}
              </Grid>
              : displayedOptions.map((c, i) => (
                <MenuItem key={i} value={c.objectid}>
                  {c.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    )
  }

  const breadcrumbs = [
    <Link underline="hover" key="0" color="inherit" href={"/finance/"} className={classes.link}>
      Clientes
    </Link>,
    getSelectCustomer()
  ]

  return (
    <Grid container className={props.className}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" className={classes.nextIcon} />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>

    </Grid>
  )
}

CustomerBreadcrumb.propTypes = {
  customer: PropTypes.any,
  tab: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default CustomerBreadcrumb