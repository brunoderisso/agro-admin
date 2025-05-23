import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Grid, Grow, Typography } from "@mui/material"

import useStyles from "../../../../styles/Customer/CustomerPayments/CreditCardComponent"
import mastercard from "../../../../img/mastercard.png"
import visa from "../../../../img/visa.png"
import cielo from "../../../../img/cielo.png"


function CreditCardComponent(props) {
  const { classes } = useStyles()

  const [cardNumber, setCardNumber] = useState<string>("")
  const [cvv, setCvv] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [date, setDate] = useState<string>("__/____")

  useEffect(() => {
    if (props.cardNumber) {
      setCardNumber(props.cardNumber)
    } else {
      setCardNumber("")
    }

    if (props.name) {
      setName(props.name)
    } else {
      setName("")
    }

    if (props.date) {
      setDate(props.date)
    } else {
      setDate("__/____")
    }

    if (props.cvv) {
      setCvv(props.cvv)
    } else {
      setCvv("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const maskCardNumber = (cardNumber) => {
    const formatCardNumber = cardNumber.replaceAll("_", "").replaceAll(" ", "").split("")

    formatCardNumber.forEach((_, index) => {
      if ([4, 9, 14].includes(index)) {
        formatCardNumber.splice(index, "0", " ")
      } else if ((5 <= index && index <= 8) || (10 <= index && index <= 13)) {
        formatCardNumber[index] = "*"
      }
    })

    return formatCardNumber
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.itemColor}>
                Número do Cartão
              </Typography>
            </Grid>
            <Grid container style={{ height: "20px" }}>
              {cardNumber !== ""
                ? (maskCardNumber(cardNumber).map((val, index) => {
                  return (
                    <Grid item className={classes.itemNumber} key={index}>
                      <Grow in={val !== "_"} timeout={250}><Grid>{val}</Grid></Grow>
                    </Grid>
                  )
                }))
                : <Grow timeout={250}><Grid>#</Grid></Grow>
              }
            </Grid>
          </Grid>
          {props.brand &&
            <Grid item xs={3}>
              <Grow mountOnEnter unmountOnExit timeout={500} in={props.brand === "mastercard" || props.brand === "Master"}>
                <img className={classes.chip} alt="Bandeira" src={mastercard} />
              </Grow>
              <Grow mountOnEnter unmountOnExit timeout={500} in={props.brand === "visa" || props.brand === "Visa"}>
                <img className={classes.chip} alt="Bandeira" src={visa} />
              </Grow>
              <Grow mountOnEnter unmountOnExit timeout={500} in={props.brand === "cielo" || props.brand === "Cielo"}>
                <img className={classes.chip} alt="Bandeira" src={cielo} />
              </Grow>
            </Grid>
          }
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ margin: "8px 0px" }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption" className={classes.itemColor}>
              Nome do Titular do Cartão
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container style={{ height: "20px" }}>
              {
                name.split("").map((val, index) => {
                  return (
                    <Grid className={classes.itemLetter} key={index}>
                      <Grow key={index} in={true} timeout={500}>
                        <Grid>{val.toUpperCase()}</Grid>
                      </Grow>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Grid container style={{ color: "white" }}>
              <Grid item xs={12}>
                <Typography variant="caption" className={classes.itemColor}>
                  Data de Expiração
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid>
                  <Grow in={date !== ""}>
                    <Grid style={{ fontSize: "14px" }}>
                      {date}
                    </Grid>
                  </Grow>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="caption" className={classes.itemColor}>
                  CVV
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.itemColor}>
                {cvv}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

CreditCardComponent.propTypes = {
  cvv: PropTypes.string,
  brand: PropTypes.any,
  cardNumber: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
}

export default CreditCardComponent