import { useEffect, useState } from "react"
import InputMask from "react-input-mask"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, Card, CircularProgress, Grid, MenuItem, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from "../../../../styles/Customer/CustomerForm"
import masksUtils from "../../../../utils/MasksUtils"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import customerStore from "../../../../stores/CustomerStore"
import ThemedTextField from "../../../Common/Themed/ThemedTextField"
import { CustomerType } from "../../../../interfaces/Customers"
import CancelToken from "../../../../helpers/cancelToken"


const open = "open"
const close = "close"
const editable = "editable"

function CustomerForm(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()

  const [customer, setCustomer] = useState<CustomerType>(null)
  const [backup, setBackup] = useState<CustomerType>(null)
  const [stateForm, setStateForm] = useState(close)
  const [loader, setLoader] = useState<boolean>(false)
  const [flagNameError, setFlagNameError] = useState<boolean>(false)
  const [textNameError, setTextNameError] = useState<string>("")
  const [flagEmailError, setFlagEmailError] = useState<boolean>(false)
  const [textEmailError, setTextEmailError] = useState<string>("")
  const [flagCpfCnpjError, setFlagCpfCnpjError] = useState<boolean>(false)
  const [textCpfCnpjError, setTextCpfCnpjError] = useState<string>("")
  const [flagPhoneError, setFlagPhoneError] = useState<boolean>(false)
  const [textPhoneError, setTextPhoneError] = useState<string>("")
  const [flagCepError, setFlagCepError] = useState<boolean>(false)
  const [textCepError, setTextCepError] = useState<string>("")
  const [flagStreetError, setFlagStreetError] = useState<boolean>(false)
  const [textStreetError, setTextStreetError] = useState<string>("")
  const [flagNumberError, setFlagNumberError] = useState<boolean>(false)
  const [textNumberError, setTextNumberError] = useState<string>("")
  const [flagDistrictError, setFlagDistrictError] = useState<boolean>(false)
  const [textDistrictError, setTextDistrictError] = useState<string>("")
  const [flagCityError, setFlagCityError] = useState<boolean>(false)
  const [textCityError, setTextCityError] = useState<string>("")
  const [flagStateError, setFlagStateError] = useState<boolean>(false)
  const [textStateError, setTextStateError] = useState<string>("")

  const [cpfCnpjMask, setCpfCnpjMask] = useState<string>("99999999999")
  const [numberMask, setNumberMask] = useState<string>("99999999999")

  useEffect(() => {
    setCustomer(props.customer)
    setBackup(props.customer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    if (customer?.cpf_cnpj) {
      generateCpfCnpjMask()
    }

    if (customer?.phone) {
      generateNumberMask()
    }

    if (customer?.name?.length > 0) {
      setFlagNameError(false)
      setTextNameError("")
    }

    if (customer?.email?.length > 0) {
      setFlagEmailError(false)
      setTextEmailError("")
    }

    if (customer?.cpf_cnpj?.length > 0) {
      setFlagCpfCnpjError(false)
      setTextCpfCnpjError("")
    }

    if (customer?.phone_prefix?.length === 2 && customer?.phone?.length > 7) {
      setFlagPhoneError(false)
      setTextPhoneError("")
    }

    if (customer?.zip_code?.length > 0) {
      setFlagCepError(false)
      setTextCepError("")
    }

    if (customer?.street?.length > 0) {
      setFlagStreetError(false)
      setTextStreetError("")
    }

    if (customer?.number?.length > 0) {
      setFlagNumberError(false)
      setTextNumberError("")
    }

    if (customer?.district?.length > 0) {
      setFlagDistrictError(false)
      setTextDistrictError("")
    }

    if (customer?.city?.length > 0) {
      setFlagCityError(false)
      setTextCityError("")
    }

    if (customer?.state?.length > 0) {
      setFlagStateError(false)
      setTextStateError("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer])

  const updateCustomer = () => {
    if (
      customer.name.length > 0 && customer.email.length > 0 && customer.cpf_cnpj.length > 0 &&
      customer.phone_prefix.length === 2 && customer.phone.length > 7 && customer.zip_code.length > 0 &&
      customer.street.length > 0 && customer.number.length > 0 && customer.district.length > 0 &&
      customer.city.length > 0 && customer.state.length > 0
    ) {
      const newCustomer = {
        name: customer.name,
        email: customer.email,
        cpf_cnpj: customer.cpf_cnpj,
        phone: customer.phone,
        phone_prefix: customer.phone_prefix,
        zip_code: customer.zip_code,
        street: customer.street,
        number: customer.number,
        complement: customer.complement,
        district: customer.district,
        city: customer.city,
        state: customer.state
      }

      setLoader(true)
      customerStore.updateCustomer(CancelToken(), customer.objectid, newCustomer, responseUpdateCustomer)
    } else {
      handleFieldsError()
    }
  }

  const responseUpdateCustomer = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setStateForm(close)
      customerStore.emit("customer_reload")
      customerStore.emit("customer_feedback", "200")
    }

    if (response.status) {
      customerStore.emit("customer_feedback", response.status.toString())
    }
  }

  const handleFieldsError = () => {
    const phoneNumber = customer.phone_prefix + customer.phone

    if (customer.name.length === 0) {
      setFlagNameError(true)
      setTextNameError(t("general.errorMessage1"))
    }

    if (customer.email.length === 0) {
      setFlagEmailError(true)
      setTextEmailError(t("general.errorMessage1"))
    }

    if (customer.cpf_cnpj.length === 0) {
      setFlagCpfCnpjError(true)
      setTextCpfCnpjError(t("general.errorMessage1"))
    }

    if (phoneNumber.length < 10) {
      setFlagPhoneError(true)
      setTextPhoneError(t("general.errorMessage6"))
    }

    if (customer.zip_code.length === 0) {
      setFlagCepError(true)
      setTextCepError(t("general.errorMessage1"))
    }

    if (customer.street.length === 0) {
      setFlagStreetError(true)
      setTextStreetError(t("general.errorMessage1"))
    }

    if (customer.number.length === 0) {
      setFlagNumberError(true)
      setTextNumberError(t("general.errorMessage1"))
    }

    if (customer.district.length === 0) {
      setFlagDistrictError(true)
      setTextDistrictError(t("general.errorMessage1"))
    }

    if (customer.city.length === 0) {
      setFlagCityError(true)
      setTextCityError(t("general.errorMessage1"))
    }

    if (customer.state.length === 0) {
      setFlagStateError(true)
      setTextStateError(t("general.errorMessage1"))
    }
  }

  const toggleVisibility = () => {
    if (stateForm === open) {
      setStateForm(close)
    } else {
      setStateForm(open)
    }
  }

  const toggleEditable = () => {
    if (stateForm === editable) {
      updateCustomer()
    } else {
      setStateForm(editable)
    }
  }
  const toggleClose = () => {
    setStateForm(close)
    setCustomer(backup)
  }

  const closedLabel = () => {
    return (
      <Grid item xs={12} marginTop={"-5px"}>
        <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
          *********************
        </Typography>
      </Grid>
    )
  }

  const onChangeLabel = (e) => {
    let name = e.target.name
    let value = e.target.value
    let newCustomer = customer
    if (name === "phone") {
      value = masksUtils.unformatPhone(value)

      newCustomer = {
        ...newCustomer,
        phone_prefix: value.substring(0, 2),
        phone: value.substring(2)
      }
    } else {
      newCustomer = {
        ...newCustomer,
        [name]: value
      }
    }

    setCustomer(newCustomer)
  }

  const generateCpfCnpjMask = () => {
    if (customer?.cpf_cnpj) {
      setCpfCnpjMask(masksUtils.maskCpfCnpj(customer.cpf_cnpj))
    }
  }

  const generateNumberMask = () => {
    if (customer?.phone_prefix && customer?.phone) {
      setNumberMask(masksUtils.maskPhone(customer.phone_prefix + " " + customer.phone))
    }
  }

  const nameLabel = () => {
    return (
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            {stateForm !== "editable" &&
              <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
                Nome
              </Typography>
            }
          </Grid>
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {customer.name}
              </Typography>
            </Grid>
          }
          {stateForm === "editable" &&
            <Grid item xs={12}>
              <ThemedTextField
                fullWidth
                label="Nome"
                size="small"
                name="name"
                onChange={onChangeLabel}
                value={customer.name}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagNameError}
                helperText={textNameError}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const emailLabel = () => {
    return (
      <Grid item xs={12}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              E-mail
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {customer.email}
              </Typography>
            </Grid>
          }
          {stateForm === "editable" &&
            <Grid item xs={12}>
              <ThemedTextField
                fullWidth
                label="E-mail"
                name="email"
                size="small"
                onChange={onChangeLabel}
                value={customer.email}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagEmailError}
                helperText={textEmailError}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const cpfcnpjLabel = () => {
    return (
      <Grid item xs={12}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              CPF ou CNPJ
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {masksUtils.formatCpfCnpj(customer.cpf_cnpj)}
              </Typography>
            </Grid>
          }

          {stateForm === "editable" &&
            <Grid item xs={12}>
              <InputMask mask={cpfCnpjMask}
                name="cpf_cnpj"
                label="CPF ou CNPJ"
                fullWidth
                value={customer.cpf_cnpj}
                size="small"
                onChange={onChangeLabel}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagCpfCnpjError}
                helperText={textCpfCnpjError}
              >
                {(inputProps) =>
                  <ThemedTextField
                    {...inputProps} />
                }
              </InputMask>
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const phoneLabel = () => {
    return (
      <Grid item xs={12}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              Telefone
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {masksUtils.formatPhone(customer.phone_prefix + customer.phone)}
              </Typography>
            </Grid>
          }

          {stateForm === "editable" &&
            <Grid item xs={12}>
              <InputMask mask={numberMask}
                name="phone"
                label="Telefone"
                fullWidth
                value={customer.phone_prefix + customer.phone}
                size="small"
                onChange={onChangeLabel}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagPhoneError}
                helperText={textPhoneError}
              >
                {(inputProps) =>
                  <ThemedTextField
                    {...inputProps} />
                }
              </InputMask>
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const cepLabel = () => {
    return (
      <Grid item xs={12}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              CEP
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {customer.zip_code}
              </Typography>
            </Grid>
          }

          {stateForm === "editable" &&
            <Grid item xs={12}>
              <InputMask mask={"99999-999"}
                name="zip_code"
                label="CEP"
                fullWidth
                value={customer.zip_code}
                size="small"
                onChange={onChangeLabel}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagCepError}
                helperText={textCepError}
              >
                {(inputProps) =>
                  <ThemedTextField
                    {...inputProps} />
                }
              </InputMask>
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const streetLabel = () => {
    return (
      <Grid item xs={12}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              Endereço
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {customer.street}
              </Typography>
            </Grid>
          }
          {stateForm === "editable" &&
            <Grid item xs={12}>
              <ThemedTextField
                fullWidth
                label="Endereço"
                name="street"
                size="small"
                onChange={onChangeLabel}
                value={customer.street}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagStreetError}
                helperText={textStreetError}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const streetNumberLabel = () => {
    return (
      <Grid item xs={6}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              Número
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {customer.number}
              </Typography>
            </Grid>
          }
          {stateForm === "editable" &&
            <Grid item xs={12}>
              <ThemedTextField
                fullWidth
                label="Número"
                name="number"
                size="small"
                onChange={onChangeLabel}
                value={customer.number}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagNumberError}
                helperText={textNumberError}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const streetComplementLabel = () => {
    return (
      <Grid item xs={6}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              Complemento
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {customer.complement || ConstantsUtils.NullFieldMask}
              </Typography>
            </Grid>
          }
          {stateForm === "editable" &&
            <Grid item xs={12}>
              <ThemedTextField
                fullWidth
                label="Complemento"
                name="complement"
                size="small"
                onChange={onChangeLabel}
                value={customer.complement}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const districtLabel = () => {
    return (
      <Grid item xs={12}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              Bairro
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {customer.district}
              </Typography>
            </Grid>
          }
          {stateForm === "editable" &&
            <Grid item xs={12}>
              <ThemedTextField
                fullWidth
                label="Bairro"
                name="district"
                size="small"
                onChange={onChangeLabel}
                value={customer.district}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagDistrictError}
                helperText={textDistrictError}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const cityLabel = () => {
    return (
      <Grid item xs={6}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              Cidade
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {customer.city}
              </Typography>
            </Grid>
          }
          {stateForm === "editable" &&
            <Grid item xs={12}>
              <ThemedTextField
                fullWidth
                label="Cidade"
                name="city"
                size="small"
                onChange={onChangeLabel}
                value={customer.city}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagCityError}
                helperText={textCityError}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  const stateLabel = () => {
    return (
      <Grid item xs={6}>
        <Grid container>
          {stateForm !== "editable" &&
            <Typography variant="caption" className={cx(classes.labels, classes.commonText)}>
              Estado
            </Typography>
          }
          {stateForm === "close" &&
            closedLabel()
          }
          {stateForm === "open" &&
            <Grid item xs={12} marginTop={"-5px"}>
              <Typography variant="caption" className={cx(classes.contentText, classes.commonText)}>
                {ConstantsUtils.StatesList.find(state => state.value === customer.state.toUpperCase()).label}
              </Typography>
            </Grid>
          }
          {stateForm === "editable" &&
            <Grid item xs={12}>
              <ThemedTextField
                fullWidth
                select
                label="Estado"
                name="state"
                size="small"
                onChange={onChangeLabel}
                value={customer.state.toUpperCase()}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={flagStateError}
                helperText={textStateError}
              >
                {ConstantsUtils.StatesList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </ThemedTextField>
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container>
      {!loader &&
        <Card elevation={1} className={classes.cardContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end" spacing={3}>
                <Grid item>
                  {(stateForm === close || stateForm === open) &&
                    <Button onClick={toggleVisibility} className={classes.iconButton}>
                      {stateForm === close &&
                        <VisibilityIcon className={classes.iconColor} />
                      }
                      {stateForm === open &&
                        <VisibilityOffIcon className={classes.iconColor} />
                      }
                    </Button>
                  }
                </Grid>
                {stateForm === editable &&
                  <Grid item>
                    <Button onClick={toggleClose} className={classes.iconButton}>
                      <CloseIcon className={classes.iconColor} />
                    </Button>
                  </Grid>
                }
                <Grid item>
                  <Button onClick={toggleEditable} className={classes.iconButton}>
                    {stateForm === editable &&
                      <CheckIcon className={classes.iconColor} />
                    }
                    {stateForm !== editable &&
                      <EditIcon className={classes.editIcon} />
                    }
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {nameLabel()}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {emailLabel()}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {cpfcnpjLabel()}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {phoneLabel()}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {cepLabel()}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {streetLabel()}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {streetNumberLabel()}
                {streetComplementLabel()}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {districtLabel()}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {cityLabel()}
                {stateLabel()}
              </Grid>
            </Grid>
            {stateForm === editable &&
              <Grid item xs={12}>
                <Grid container justifyContent={"center"}>
                  <Typography className={classes.commonText}>
                    <span className={classes.contentText}>{`Seus dados serão processados de acordo com nossos `}</span>
                    <span className={classes.highlightText}>Termos e Condições de Uso.</span>
                  </Typography>
                </Grid>
              </Grid>
            }
          </Grid>
        </Card>
      }
      {loader &&
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 250px)" }}>
          <CircularProgress />
        </Grid>
      }
    </Grid>
  )
}

CustomerForm.propTypes = {
  customer: PropTypes.any.isRequired,
}

export default CustomerForm