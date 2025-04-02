import { useEffect, useState } from "react"
import InputMask from "react-input-mask"

import PropTypes from "prop-types"

import { Button, Card, CircularProgress, FormControl, Grid, InputAdornment, Tooltip } from "@mui/material"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import PersonIcon from "@mui/icons-material/Person"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import HelpIcon from "@mui/icons-material/Help"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

import useStyles from "../../../../styles/Customer/CustomerPayments/CreditCardForm"
import iuguStore from "../../../../stores/IuguStore"
import CreditCardComponent from "./CreditCardComponent"
import ThemedTextField from "../../../Common/Themed/ThemedTextField"


function CreditCardForm(props) {
  const { classes } = useStyles()

  const [number, setNumber] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [nickname, setNickname] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [cvv, setCvv] = useState<string>("")
  const [brand, setBrand] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false)
  const [disableFlag, setDisableFlag] = useState<boolean>(false)

  useEffect(() => {
    bind()

    return clear
  }, [])

  useEffect(() => {
    if (typeof props.onChange === "function") {
      let card = {
        number: number,
        verification_value: cvv,
        expiration: date,
        full_name: name,
        description: nickname
      }

      props.onChange(card)
    }
  }, [number, name, date, cvv, nickname])

  useEffect(() => {
    if (typeof props.getBrand === "function") {
      setBrand(props.getBrand(number))
    }
  }, [number])

  const bind = () => {
    iuguStore.addListener("credit_card.process", setLoader)
    iuguStore.addListener("confirm.disable", setDisableFlag)
  }

  const clear = () => {
    iuguStore.removeListener("credit_card.process", setLoader)
    iuguStore.removeListener("confirm.disable", setDisableFlag)
  }


  const handleChangeValue = (event) => {
    let value = event.target.value

    if (event.target.name === "number") {
      setNumber(value)
    }
    if (event.target.name === "name") {
      setName(value)
    }
    if (event.target.name === "date") {
      setDate(value)
    }
    if (event.target.name === "cvv") {
      setCvv(value)
    }

    if (event.target.name === "nickname") {
      setNickname(value)
    }

    return
  }

  const finalize = () => {
    if (typeof props.submit === "function") {
      props.submit()
    }
  }

  const cleanFields = () => {
    setNumber("")
    setName("")
    setDate("")
    setCvv("")
    setNickname("")
  }

  return (
    <Grid container className={props.billing && classes.alignCenter}>
      <Card elevation={2} className={classes.cardContainer}>
        <Grid item xs={12} style={{ margin: "0px 0px 40px 0px" }}>
          <Grid container justifyContent="center" alignContent="center">
            <CreditCardComponent cvv={cvv} brand={brand} cardNumber={number} name={name} date={date} />
          </Grid>
        </Grid>

        <FormControl fullWidth className={classes.paddingInput}>
          <InputMask mask="9999 9999 9999 9999"
            id="card-number"
            placeholder="1234 5678 9012 3456"
            name="number"
            value={number}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon className={classes.iconColor} />
                </InputAdornment>
              ),
            }}
            onChange={handleChangeValue}>
            {(inputProps) => <ThemedTextField
              variant="outlined"
              label={"Número do Cartão"}
              InputLabelProps={{ shrink: true }}
              {...inputProps}
            />}
          </InputMask>
        </FormControl>

        <FormControl fullWidth className={classes.paddingInput}>
          <ThemedTextField
            id="name"
            placeholder={"Titular do Cartão"}
            name="name"
            size="small"
            value={name}
            variant="outlined"
            label={"Nome Completo"}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon className={classes.iconColor} />
                </InputAdornment>
              )
            }}
            onChange={handleChangeValue} />

        </FormControl>

        <Grid container className={classes.paddingInput} justifyContent="space-between">
          <Grid item xs={6}>
            <FormControl>
              <InputMask mask="99/9999"
                id="card-number"
                placeholder="MM/AAAA"
                name="date"
                value={date}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon className={classes.iconColor} />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChangeValue}>
                {(inputProps) => <ThemedTextField
                  variant="outlined"
                  label={"Data de Vencimento"}
                  InputLabelProps={{ shrink: true }}
                  {...inputProps}
                />}
              </InputMask>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <FormControl>
                <InputMask mask="999"
                  id="cvv"
                  placeholder="123"
                  name="cvv"
                  value={cvv}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip placement="bottom-start" title={"Código de três dígitos no verso do cartão"}>
                          <HelpIcon className={classes.iconColor} />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChangeValue}>
                  {(inputProps) => <ThemedTextField
                    variant="outlined"
                    label="CVV"
                    InputLabelProps={{ shrink: true, }}
                    {...inputProps}
                  />}
                </InputMask>
              </FormControl>
            </Grid>

          </Grid>
        </Grid>

        <FormControl fullWidth className={classes.paddingInput}>
          <ThemedTextField
            id="apelido"
            placeholder="Defina um apelido para este cartão"
            name="nickname"
            size="small"
            value={nickname}
            variant="outlined"
            label="Apelido"
            InputLabelProps={{ shrink: true, }}
            onChange={handleChangeValue} />

        </FormControl>

        <Grid container spacing={2}>
          <Grid item>
            <Button className={classes.cleanButton} onClick={cleanFields}>
              Limpar
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.prevButton}
              startIcon={props.billing && <ArrowBackIosIcon className={classes.iconSize} />}
              onClick={props.revert}
              variant="outlined"
            >
              {props.billing ? "Voltar" : "Cancelar"}
            </Button>
          </Grid>
          <Grid item md>
            <Button
              id="bt-create-cc"
              className={classes.nextButton}
              fullWidth
              onClick={finalize}
              variant="contained"
              disabled={disableFlag}
            >
              {!loader && "Finalizar"}
              {loader && <CircularProgress className={classes.loader} />}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

CreditCardForm.propTypes = {
  submit: PropTypes.func.isRequired,
  getBrand: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  revert: PropTypes.func.isRequired,
}

export default CreditCardForm