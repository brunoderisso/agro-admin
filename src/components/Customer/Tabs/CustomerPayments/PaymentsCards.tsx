import { useEffect, useRef, useState } from "react"

import PropTypes from "prop-types"

import { Backdrop, Button, Card, CircularProgress, FormControl, Grid, Table, TableBody, TableContainer, Typography } from "@mui/material"

import useStyles from "../../../../styles/Customer/CustomerPayments/PaymentsCards"
import customerStore from "../../../../stores/CustomerStore"
import UserFeedback from "../../../Common/UserFeedback"
import ItemCreditCard from "./ItemCreditCard"
import AddIcon from "../../../../img/icons/addIcon.svg?react"
import CustomModal from "../../../Common/CustomModal"
import stringsUtils from "../../../../utils/StringUtils"
import theme from "../../../../styles/Utils/Theme"
import useScript from "../../../../hook/useScript"
import iuguStore from "../../../../stores/IuguStore"
import { LocalConfig } from "../../../../LocalConfig"
import CreditCardForm from "./CreditCardForm"
import ThemedTextField from "../../../Common/Themed/ThemedTextField"
import CancelToken from "../../../../helpers/cancelToken"
import { CreditCardType } from "../../../../interfaces/Customer/CreditCard"


function PaymentsCards(props) {
  const { classes } = useStyles()

  const [loader, setLoader] = useState(false)
  const [loaderModal, setLoaderModal] = useState(false)
  const [loaderBackdrop, setLoaderBackdrop] = useState(false)
  const [CcToDefault, setCcToDefault] = useState(null)
  const [errorStatusResponse, setErrorStatusResponse] = useState("")
  const [errorMessageResponse, setErrorMessageResponse] = useState("")
  const [payments, setPayments] = useState(null)
  const [newCreditCard, setNewCreditCard] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [titleModal, setTitleModal] = useState("")
  const [typeModal, setTypeModal] = useState("")
  const [infoCcSelect, setInfoCcSelect] = useState(null)
  const [newDescriptionCc, setNewDescriptionCc] = useState("")
  const [creditCard, setCreditCard] = useState<CreditCardType>(null)

  const Iugu = useRef(null)

  const modalButtons = [
    { label: "Cancelar", action: (status, title) => { handleModal(status, title) } },
    { label: "Excluir", action: () => deleteCreditCard(), color: theme.colors.error[40] },
    { label: "Salvar", action: () => editCreditCard() }
  ]

  useScript("https://js.iugu.com/v2")

  useEffect(() => {
    const controller = new AbortController()

    if (props.customer.objectid) {
      getPayments()
      storeIuguReference()
    }

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.customer.objectid])

  const storeIuguReference = () => {
    const interval = setInterval(() => {
      if ((window as any).Iugu) {
        Iugu.current = (window as any).Iugu
        clearInterval(interval)
        initIugu()
      }
    }, 1000)
  }

  const initIugu = () => {
    Iugu.current.setAccountID(LocalConfig.iuguID)
    Iugu.current.setup()
  }

  const getPayments = () => {
    setLoader(true)
    customerStore.getPaymentsByCustomer(CancelToken(), props.customer.objectid, responseGetPayments)
  }

  const responseGetPayments = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      setPayments(response.data)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const deleteCreditCard = () => {
    setLoaderModal(true)
    customerStore.deletePaymentByCustomer(CancelToken(), props.customer.objectid, infoCcSelect.objectid, responseDeleteCreditCard)
  }

  const responseDeleteCreditCard = (response) => {
    CancelToken().remove(response.id)
    setLoaderModal(false)
    setOpenModal(false)

    if (response.data) {
      getPayments()
      setErrorStatusResponse("200")
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const editCreditCard = () => {
    const cardCredit = {
      ...infoCcSelect,
      description: newDescriptionCc
    }

    setLoaderModal(true)
    customerStore.updatePaymentByCustomer(CancelToken(), props.customer.objectid, cardCredit, responseEditCreditCard)
  }

  const responseEditCreditCard = (response) => {
    CancelToken().remove(response.id)
    setLoaderModal(false)
    setOpenModal(false)

    if (response.data) {
      getPayments()
      setErrorStatusResponse("200")
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const onSubmitCc = () => {
    iuguStore.emit("credit_card.process", true)
    iuguStore.emit("confirm.disable", true)

    iuguStore.createTokenIugu(creditCard, Iugu.current, tokenResponseHandler)
  }

  const tokenResponseHandler = (data) => {
    if (data.errors) {
      iuguStore.emit("credit_card.process", false)
      iuguStore.emit("confirm.disable", false)

      setErrorStatusResponse("400")
      setErrorMessageResponse("Verifique se os dados do cartão estão corretos.")
      console.error(data.errors)
    } else if (data.id) {
      customerStore.postPaymentByCustomer(CancelToken(), props.customer.objectid, data, creditCard.description, responseAttCustomer)
    }
  }

  const responseAttCustomer = (response) => {
    CancelToken().remove(response.id)

    if (response.data) {
      setNewCreditCard(false)
      setCcToDefault(response.data.objectid);
    }

    if (response.status) {
      iuguStore.emit('credit_card.process', false)
      iuguStore.emit('confirm.disable', false)
      setErrorStatusResponse(response.status.toString())
    }
  }

  const handleCloseBackdrop = () => {
    setLoaderBackdrop(false)
  }

  const handleModal = (status, type, infoCc = null) => {
    setOpenModal(status)
    setTypeModal(type)

    if (infoCc) {
      setInfoCcSelect(infoCc)
    }

    if (type === "Excluir") {
      setTitleModal("Excluir cartão")
    } else if (type === "Editar") {
      setTitleModal("Alterar apelido")
    }
  }

  const handleChangeNicknameCc = (event) => {
    setNewDescriptionCc(event.target.value)
  }

  const onChangeCc = (card) => {
    setCreditCard(card)
  }

  const getBrandCc = (n) => {
    return iuguStore.getBrandCreditCard(n, Iugu.current);
  }

  const cancelNewCard = () => {
    setNewCreditCard(false);
  }

  const bodyModal = () => {
    return (
      <Grid>
        <Typography className={classes.textModal}>
          {typeModal === "Excluir" &&
            <span>Tem certeza que deseja excluir o cartão</span>
          }
          {typeModal === "Editar" &&
            <span>Como quer chamar o cartão</span>
          }
          <span className={classes.highlightText}>
            {` ${infoCcSelect?.data.brand} ${infoCcSelect?.data.display_number.replaceAll("X", "*").replaceAll("-", " ")} `}
          </span>
          com vencimento em
          <span className={classes.highlightText}>
            {` ${stringsUtils.formatValidityDateCc(infoCcSelect?.data.month.toString(), infoCcSelect?.data.year.toString())}`}
          </span>?
        </Typography>
        {typeModal === "Editar" &&
          <FormControl fullWidth className={classes.modalInput}>
            <ThemedTextField
              id="newNickname"
              placeholder={"Insira um apelido para seu cartão"}
              name="newNickname"
              value={newDescriptionCc}
              onChange={handleChangeNicknameCc}
              size="small"
              variant="outlined"
            />
          </FormControl>
        }
      </Grid>
    )
  }

  return (
    <Grid>
      {payments?.length > 0 && !newCreditCard && !loader &&
        <Card className={classes.container}>
          <Typography className={classes.title}>Cartões de crédito</Typography>
          <TableContainer className={classes.wrapperTable}>
            <Table>
              <TableBody>
                {payments.map((payment, index) => {
                  return (
                    <ItemCreditCard
                      key={index}
                      card={payment}
                      callback={handleModal}
                      handleLoader={setLoaderBackdrop}
                      customerId={props.customer.objectid}
                      ccObjectid={CcToDefault}
                      handlePayments={getPayments}
                      handleError={setErrorStatusResponse}
                      resetCc={setCcToDefault}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Button color="primary" className={classes.btPrimary} onClick={() => { setNewCreditCard(true) }}>
            <AddIcon />
            <Typography className={classes.txtBtAdd}>
              Adicionar cartão
            </Typography>
          </Button>
        </Card>
      }
      {(payments?.length === 0 || newCreditCard) &&
        <CreditCardForm submit={onSubmitCc} getBrand={getBrandCc} onChange={onChangeCc} revert={cancelNewCard} />
      }
      {loader &&
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 64px)" }}>
          <CircularProgress />
        </Grid>
      }
      <Backdrop
        sx={{ color: "#fff", zIndex: 100 }}
        open={loaderBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <CustomModal
        open={openModal}
        dispense={modalButtons[0]}
        confirm={typeModal === "Excluir" ? modalButtons[1] : modalButtons[2]}
        title={titleModal}
        size={typeModal === "Excluir" ? "medium" : "small"}
        loader={loaderModal}
      >
        {bodyModal()}
      </CustomModal>
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} message={errorMessageResponse} />
    </Grid>
  )
}

PaymentsCards.propTypes = {
  customer: PropTypes.any,
}

export default PaymentsCards