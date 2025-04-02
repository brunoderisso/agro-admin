import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Grid, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import useStyles from "../../../../styles/Customer/CustomerPayments/ItemCreditCard"
import mastercard from "../../../../img/mastercard.png"
import visa from "../../../../img/visa.png"
import cielo from "../../../../img/cielo.png"
import stringsUtils from "../../../../utils/StringUtils"
import theme from "../../../../styles/Utils/Theme"
import CustomCondition from "../../../Common/CustomCondition"
import customerStore from "../../../../stores/CustomerStore"
import CancelToken from "../../../../helpers/cancelToken"


function ItemCreditCard(props) {
  const { classes } = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const [creditCard, setCreditCard] = useState(null)

  const optionCardMenu = [
    { text: 'Editar' },
    { text: 'Tornar Padrão' },
    { text: 'Excluir', color: theme.colors.error[40] },
  ]

  useEffect(() => {
    setCreditCard(props.card)
  }, [props.card])

  useEffect(() => {
    if (props.ccObjectid) {
      setAsDefaultCc(props.ccObjectid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ccObjectid])

  const selectBrand = () => {
    let brand = ""

    switch (creditCard?.data.brand) {
      case "Master": {
        brand = mastercard
        break
      }
      case "Visa": {
        brand = visa
        break
      }
      case "Cielo": {
        brand = cielo
        break
      }
      default: break
    }

    return brand
  }

  const handleClickBt = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleMenuItem = (text) => {
    handleCloseMenu()

    if (typeof text === 'string' && text !== 'Tornar Padrão') {
      props.callback(true, text, creditCard)
    } else if (text === 'Tornar Padrão') {
      setAsDefaultCc()
    }
  }

  const setAsDefaultCc = (ccObjectid = null) => {
    props.handleLoader(true)
    customerStore.setDefaultPaymentByCustomer(CancelToken(), props.customerId, ccObjectid || creditCard.objectid, responseSetAsDefaultCc)
  }

  const responseSetAsDefaultCc = (response) => {
    CancelToken().remove(response.id)
    props.handleLoader(false)
    props.resetCc(null)

    if (response.data) {
      props.handlePayments()
      props.handleError("200")
    }

    if (response.status) {
      props.handleError(response.status.toString())
    }
  }

  const MenuOption = () => {
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        elevation={4}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {optionCardMenu.map((item, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => { handleMenuItem(item.text) }}
              disabled={creditCard?.is_default === "true" && item.text === "Tornar Padrão"}
            >
              <Typography className={classes.textItemMenu} sx={{ color: item.color }}>
                <CustomCondition
                  test={[item.text === "Editar", item.text === "Tornar Padrão"]}
                >
                  {"Editar"}
                  {"Tornar Padrão"}
                  {"Excluir"}
                </CustomCondition>
              </Typography>
            </MenuItem>
          )
        })}
      </Menu>
    )
  }

  return (
    <TableRow>
      <TableCell>
        <Grid container className={classes.contentCel}>
          <Grid item className={classes.centerContent}>
            <img
              className={classes.brand}
              alt="Bandeira"
              src={selectBrand()}
            />
          </Grid>
          <Grid item className={classes.infoCard}>
            <Typography className={classes.nameCard}>{creditCard?.description}</Typography>
            <Typography className={classes.numberCard}>
              {creditCard?.data.display_number.replaceAll("X", "*").replaceAll("-", " ")}
            </Typography>
            <Typography className={classes.validityCard}>
              {`Validade: ${stringsUtils.formatValidityDateCc(creditCard?.data.month.toString(), creditCard?.data.year.toString())}`}
            </Typography>
          </Grid>
          {creditCard?.is_default === "true" &&
            <Grid item className={classes.centerContent}>
              <Typography className={classes.title}>Padrão</Typography>
            </Grid>
          }
          <Grid item className={classes.centerContent}>
            <IconButton
              aria-label="option"
              size="small"
              color="inherit"
              className={classes.btOptions}
              onClick={handleClickBt}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            {MenuOption()}
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  )
}

ItemCreditCard.propTypes = {
  card: PropTypes.shape({
    data: PropTypes.shape({
      holder_name: PropTypes.string.isRequired,
      display_number: PropTypes.string.isRequired,
      month: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
    }),
    is_default: PropTypes.string,
  }),
  callback: PropTypes.func.isRequired,
  handleLoader: PropTypes.func.isRequired,
  customerId: PropTypes.string,
  ccObjectid: PropTypes.string,
  resetCc: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  handlePayments: PropTypes.func.isRequired,
}

export default ItemCreditCard