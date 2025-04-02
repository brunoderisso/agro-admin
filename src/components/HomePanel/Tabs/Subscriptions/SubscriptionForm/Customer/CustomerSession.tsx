import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, CircularProgress, Grid, InputAdornment, Menu, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/CustomerSession"
import AddIcon from "../../../../../../img/icons/addIcon.svg?react"
import PredizaSearchIcon from "../../../../../../img/AdvancedMapIcons/PredizaSearchIcon.svg?react"
import ThemedTextField from "../../../../../Common/Themed/ThemedTextField"
import CustomerMenuItem from "./CustomerMenuItem"
import CustomerSelect from "./CustomerSelect"
import customerStore from "../../../../../../stores/CustomerStore"
// import subscriptionStore from "../../../../../../stores/SubscriptionStore"
import CancelToken from "../../../../../../helpers/cancelToken"
import { useCustomerStore } from "../../../../../../stores/SubscriptionStore"
import { CustomerType } from "../../../../../../interfaces/Customers"


function CustomerSession({ handleDrawer, handleErrorStatus }) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [searchText, setSearchText] = useState<string>("")
  const [customers, setCustomers] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 })
  const [flagMode, setFlagMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const customerStateStore = useCustomerStore()

  const flagGetCustomersRef = useRef<boolean>(false)
  const inputRef = useRef(null)

  const displayedOptions = useMemo(() => {
    return customers.filter((customer) => customer.name.toLowerCase().includes(searchText.toLowerCase())
      || customer.email.toLowerCase().includes(searchText.toLowerCase()))
  }, [searchText, customers])

  useEffect(() => {
    bind()

    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (searchText.length > 0 && !flagGetCustomersRef.current) {
      getCustomers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  useEffect(() => {
    if (customerStateStore.selected) {
      setFlagMode(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerStateStore.selected])

  const bind = () => {
    customerStore.addListener("customers_create", receiveNewCustomer)
  }

  const clear = () => {
    customerStore.removeListener("customers_create", receiveNewCustomer)
  }

  const getCustomers = () => {
    flagGetCustomersRef.current = true
    setLoading(true)
    customerStore.getListCustomers(CancelToken(), null, responseGetCustomers)
  }

  const responseGetCustomers = (response) => {
    CancelToken().remove(response.id)
    setLoading(false)

    if (response.data?.items?.length > 0) {
      setCustomers(response.data.items)
    }

    if (response.status) {
      flagGetCustomersRef.current = false
      handleErrorStatus(response.status.toString())
    }
  }

  const addNewCustomer = () => {
    if (typeof handleDrawer === "function") {
      handleDrawer(true)
    }
  }

  const selectCustomer = (customer: CustomerType) => {
    customerStateStore.setSelected(customer)
    setSearchText("")
    handleClose()
  }

  const receiveNewCustomer = (customer) => {
    flagGetCustomersRef.current = false
    selectCustomer(customer)
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)

    if (event.target.value) {
      const rect = event.currentTarget.getBoundingClientRect()

      setMenuPosition({
        top: rect.bottom + window.scrollY - 6, // Posiciona abaixo do textField
        left: rect.left - 40,
        width: rect.width + 40
      })

      setAnchorEl(event.currentTarget)
    } else {
      setAnchorEl(null)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)

    // Mantém o focus no CustomOutlinedText ao fechar o menu
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleMenuOpen = () => {
    // Mantém o focus no CustomOutlinedText
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <Grid container className={classes.container}>
      <Grid item container className={classes.header}>
        <Typography variant="overline" className={classes.title}>
          {t("homePanel.subscriptions.customer")}
        </Typography>
        <Typography variant="caption" className={classes.text}>
          {t("general.optional")}
        </Typography>
        <Button color="primary" className={classes.primaryBtn} onClick={addNewCustomer}>
          <AddIcon />
          <Typography className={classes.addTextBtn}>
            {t("homePanel.subscriptions.newCustomer")}
          </Typography>
        </Button>
      </Grid>
      <Grid item container>
        {flagMode && customerStateStore.selected?.name
          ? <CustomerSelect customers={customers} />
          : <>
            <ThemedTextField
              name="customer"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PredizaSearchIcon />
                  </InputAdornment>
                ),
                endAdornment: loading
                  ? (
                    <InputAdornment position="end">
                      <CircularProgress size={18} />
                    </InputAdornment>
                  )
                  : null
              }}
              value={searchText}
              onChange={handleChange}
              placeholder={t("homePanel.subscriptions.searchFieldCustomer")}
              variant="outlined"
              fullWidth
              inputRef={inputRef}
            />
            {displayedOptions.length > 0 &&
              <Menu
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
                elevation={4}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
                disableAutoFocusItem
                disableEnforceFocus
                TransitionProps={{ onEnter: handleMenuOpen }}
                slotProps={{
                  paper: {
                    sx: { width: menuPosition.width }
                  },
                }}
              >
                {displayedOptions.map((customer, index) => (
                  <CustomerMenuItem key={index} customer={customer} onClickHandle={selectCustomer} />
                ))}
              </Menu>
            }
          </>
        }
      </Grid>
    </Grid>
  )
}

CustomerSession.propTypes = {
  handleDrawer: PropTypes.func.isRequired,
  handleErrorStatus: PropTypes.func.isRequired,
}

export default CustomerSession