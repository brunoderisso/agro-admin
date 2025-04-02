import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import InputMask from "react-input-mask"

import PropTypes from "prop-types"

import { Button, Drawer, Grid, IconButton, InputLabel, MenuItem, Select, Skeleton, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/DrawerNewCustomer"
import ThemedTextField from "../../../../../Common/Themed/ThemedTextField"
import ThemedSelectFormControl from "../../../../../Common/Themed/ThemedSelectFormControl"
import ArrowDownIcon from "../../../../../../img/icons/arrowDown.svg?react"
import masksUtils from "../../../../../../utils/MasksUtils"
import { ConstantsUtils } from "../../../../../../utils/ConstantsUtils"
import geoStore from "../../../../../../stores/GeoStore"
import customerStore from "../../../../../../stores/CustomerStore"
import CancelToken from "../../../../../../helpers/cancelToken"


function DrawerNewCustomer({ open, handleOpen, handleErrorStatus }) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const initData = () => {
    return {
      name: "", email: "", cpfCnpj: "", phone: "", cep: "", address: "", number: "",
      complement: "", district: "", country: "", state: "", city: ""
    }
  }

  const [customer, setCustomer] = useState(initData())
  const [cpfCnpjMask, setCpfCnpjMask] = useState("99999999999")
  const [countryIso, setCountryIso] = useState("")
  const [states, setStates] = useState(null)
  const [cities, setCities] = useState(null)
  const [flagError, setFlagError] = useState(null)
  const [textError, setTextError] = useState(null)
  const [loading, setLoading] = useState(false)

  const customerRef = useRef(null)

  useEffect(() => {
    if (customer.cpfCnpj) {
      generateCpfCnpjMask()
    }

    if (customer?.name?.length > 0) {
      setFlagError(prev => ({ ...prev, name: false }));
      setTextError(prev => ({ ...prev, name: "" }));
    }

    if (customer?.email?.length > 0) {
      setFlagError(prev => ({ ...prev, email: false }));
      setTextError(prev => ({ ...prev, email: "" }));
    }

    if (customer?.cpfCnpj?.length > 0) {
      setFlagError(prev => ({ ...prev, cpfCnpj: false }));
      setTextError(prev => ({ ...prev, cpfCnpj: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer])

  useEffect(() => {
    if (countryIso.length > 0) {
      setCities(null)
      getStates()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryIso])

  const getStates = () => {
    setStates(null)
    geoStore.getGeoStates(CancelToken(), countryIso, responseGetStates)
  }

  const responseGetStates = (response) => {
    CancelToken().remove(response.id)

    if (response.data?.Items?.length > 0) {
      const states = response.data.Items.map(state => {
        return {
          label: state.name,
          value: state.iso2
        }
      })

      setStates(states)
    }
  }

  const getCities = (stateIso2) => {
    setCities(null)
    geoStore.getGeoCities(CancelToken(), countryIso, stateIso2, responseGetCities)
  }

  const responseGetCities = (response) => {
    CancelToken().remove(response.id)

    if (response.data?.Items?.length > 0) {
      const cities = response.data.Items.map(city => {
        return {
          value: city.name,
          label: city.name,
        }
      })

      setCities(cities)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === "country") {
      setCountryIso(value)
    }

    if (name === "state") {
      getCities(value)
    }

    if (name === "country") {
      setCustomer((prev) => ({ ...prev, [name]: value, state: "", city: "" }))
    } else if (name === "cpfCnpj") {
      setCustomer((prev) => ({ ...prev, [name]: value.replace(/[^0-9]+/g, "") }))
    } else if (name === "phone") {
      setCustomer((prev) => ({ ...prev, [name]: value.replace(/\D/g, "") }))
    }
    else {
      setCustomer((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFieldsError = () => {
    if (customer.name?.length === 0) {
      setFlagError(prev => ({ ...prev, name: true }));
      setTextError(prev => ({ ...prev, name: t("general.errorMessage1") }));
    }

    if (customer.email?.length === 0) {
      setFlagError(prev => ({ ...prev, email: true }));
      setTextError(prev => ({ ...prev, email: t("general.errorMessage1") }));
    }

    if (customer.cpfCnpj?.length === 0) {
      setFlagError(prev => ({ ...prev, cpfCnpj: true }));
      setTextError(prev => ({ ...prev, cpfCnpj: t("general.errorMessage1") }));
    }
  }

  const onClose = () => {
    if (typeof handleOpen === "function") {
      handleOpen(false)
    }

    setCustomer({
      name: "", email: "", cpfCnpj: "", phone: "", cep: "", address: "", number: "",
      complement: "", district: "", country: "", state: "", city: ""
    })
  }

  const createCustomer = () => {
    if (customer.name.length > 0 && customer.email.length > 0 && customer.cpfCnpj.length > 0) {
      postCustomer()
    } else {
      handleFieldsError()
    }
  }

  const postCustomer = () => {
    const body = {
      name: customer.name.length > 0 ? customer.name : null,
      email: customer.email.length > 0 ? customer.email : null,
      cpf_cnpj: customer.cpfCnpj.length > 0 ? customer.cpfCnpj : null,
      zip_code: customer.cep.length > 0 ? customer.cep : null,
      phone: customer.phone.length > 0 ? customer.phone : null,
      street: customer.address.length > 0 ? customer.address : null,
      number: customer.number.length > 0 ? customer.number : null,
      complement: customer.complement.length > 0 ? customer.complement : null,
      district: customer.district.length > 0 ? customer.district : null,
      country: customer.country.length > 0 ? customer.country : null,
      state: customer.state.length > 0 ? customer.state : null,
      city: customer.city.length > 0 ? customer.city : null
    }

    customerRef.current = body
    setLoading(true)
    customerStore.postCustomer(CancelToken(), body, responsePostCustomer)
  }

  const responsePostCustomer = (response) => {
    CancelToken().remove(response.id)
    setLoading(false)

    if (response.data) {
      onClose()
      handleErrorStatus("200")
      customerStore.emit("customers_create", customerRef.current)
    }

    if (response.status) {
      handleErrorStatus(response.status.toString())
    }
  }

  const generateCpfCnpjMask = () => {
    if (customer.cpfCnpj) {
      setCpfCnpjMask(masksUtils.maskCpfCnpj(customer.cpfCnpj))
    }
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      classes={{ paper: classes.wrapperPaper }}
    >
      <Grid container className={classes.container}>
        <Grid item container>
          <Typography variant="h5" className={classes.title}>
            {t("homePanel.subscriptions.newCustomer")}
          </Typography>
          <Grid className={classes.buttonContainer}>
            <IconButton size="small" className={classes.icon} onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" className={classes.icon} onClick={createCustomer} disabled={loading}>
              <DoneIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item className={classes.subHeader}>
          <Typography variant="overline" className={classes.subtitle}>
            {t("homePanel.customers.customerEdit.customerData.tabTitle")}
          </Typography>
          <Button color="primary" className={classes.primaryBt} onClick={() => setCustomer(initData)}>
            <Typography className={classes.primaryText}>
              {t("general.filterClean")}
            </Typography>
          </Button>
        </Grid>
        <Grid item container className={classes.formContainer}>
          {loading
            ? <>
              {Array.from({ length: 10 }).map((_, index) => {
                return <Skeleton key={index} variant="rounded" width={"100%"} height={39} />
              })}
            </>
            : <>
              <Grid item>
                <ThemedTextField
                  name="name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={customer.name}
                  onChange={handleChange}
                  placeholder={t("homePanel.plans.tableHeader1")}
                  variant="outlined"
                  fullWidth
                  error={flagError?.name}
                  helperText={textError?.name}
                />
              </Grid>
              <Grid item>
                <ThemedTextField
                  name="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={customer.email}
                  onChange={handleChange}
                  placeholder={t("general.email")}
                  variant="outlined"
                  fullWidth
                  error={flagError?.email}
                  helperText={textError?.email}
                />
              </Grid>
              <Grid item>
                <InputMask
                  mask={cpfCnpjMask}
                  name="cpfCnpj"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={customer.cpfCnpj}
                  onChange={handleChange}
                  placeholder={t("homePanel.subscriptions.cpfOrCnpj")}
                  variant="outlined"
                  fullWidth
                  error={flagError?.cpfCnpj}
                  helperText={textError?.cpfCnpj}
                >
                  {(inputProps) =>
                    <ThemedTextField
                      {...inputProps} />
                  }
                </InputMask>
              </Grid>
              <Grid item>
                <ThemedTextField
                  name="phone"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder={t("general.phone")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <ThemedTextField
                  name="cep"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={customer.cep}
                  onChange={handleChange}
                  placeholder={t("general.cep")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <ThemedTextField
                  name="address"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={customer.address}
                  onChange={handleChange}
                  placeholder={t("general.address")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <ThemedTextField
                    name="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={customer.number}
                    onChange={handleChange}
                    placeholder={t("general.number")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThemedTextField
                    name="complement"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={customer.complement}
                    onChange={handleChange}
                    placeholder={t("general.complement")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item>
                <ThemedTextField
                  name="district"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={customer.district}
                  onChange={handleChange}
                  placeholder={t("general.district")}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <ThemedSelectFormControl fullWidth size="small">
                    <InputLabel id="select-label-country" shrink={true}>{t("general.country")}</InputLabel>
                    <Select
                      labelId="select-label-country"
                      name="country"
                      value={customer.country}
                      onChange={handleChange}
                      displayEmpty
                      IconComponent={ArrowDownIcon}
                    >
                      {ConstantsUtils.CountriesList.map((country, index) => {
                        return <MenuItem key={index} value={country.value} className={classes.menuItem}>
                          {country.label}
                        </MenuItem>
                      })}
                    </Select>
                  </ThemedSelectFormControl>
                </Grid>
                <Grid item xs={6}>
                  <ThemedSelectFormControl fullWidth size="small">
                    <InputLabel id="select-label-state" shrink={true}>{t("general.state")}</InputLabel>
                    <Select
                      labelId="select-label-state"
                      name="state"
                      value={customer.state}
                      onChange={handleChange}
                      displayEmpty
                      IconComponent={ArrowDownIcon}
                      disabled={!states}
                    >
                      {states?.map((state, index) => {
                        return <MenuItem key={index} value={state.value} className={classes.menuItem}>
                          {state.label}
                        </MenuItem>
                      })}
                    </Select>
                  </ThemedSelectFormControl>
                </Grid>
              </Grid>
              <Grid item>
                <ThemedSelectFormControl fullWidth size="small">
                  <InputLabel id="select-label-city" shrink={true}>{t("general.city")}</InputLabel>
                  <Select
                    labelId="select-label-city"
                    name="city"
                    value={customer.city}
                    onChange={handleChange}
                    displayEmpty
                    IconComponent={ArrowDownIcon}
                    disabled={!cities}
                  >
                    {cities?.map((city, index) => {
                      return <MenuItem key={index} value={city.value} className={classes.menuItem}>
                        {city.label}
                      </MenuItem>
                    })}
                  </Select>
                </ThemedSelectFormControl>
              </Grid>
            </>
          }
        </Grid>
        <Grid item container className={classes.footer} justifyContent="center">
          <Typography className={classes.text}>{t("homePanel.subscriptions.drawerFooter")}</Typography>
          {/* TODO: Colocar link */}
          <Link className={classes.link} to={"/"}>{t("homePanel.subscriptions.privacyPolicy")}</Link>
        </Grid>
      </Grid>
    </Drawer>
  )
}

DrawerNewCustomer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleErrorStatus: PropTypes.func.isRequired,
}

export default DrawerNewCustomer