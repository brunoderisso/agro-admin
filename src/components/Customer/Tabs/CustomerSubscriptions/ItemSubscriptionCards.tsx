import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import {
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material"
import DoneIcon from "@mui/icons-material/Done"
import CloseIcon from "@mui/icons-material/Close"

import ThemedTextField from "../../../Common/Themed/ThemedTextField"
import customerStore from "../../../../stores/CustomerStore"
import useStyles from "../../../../styles/Customer/CustomerSubscriptions/ItemSubscriptionCards"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import masksUtils from "../../../../utils/MasksUtils"
import stringsUtils from "../../../../utils/StringUtils"
import PixIcon from "../../../../img/icons/pixIcon_light.svg?react"
import { SubscriptionDataType } from "../../../../interfaces/Customer/Subscription"
import { CouponType } from "../../../../interfaces/Coupons"


function ItemSubscriptionCards(props) {
  const { classes, cx } = useStyles()

  const [total, setTotal] = useState<number>(null)
  const [subscription, setSubscription] = useState<SubscriptionDataType>(null)
  const [coupon, setCoupon] = useState<CouponType>(null)

  useEffect(() => {
    if (props.subscription) {
      setSubscription(props.subscription)

      if (props.subscription.coupon) {
        setCoupon(props.subscription.coupon)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.subscription])

  useEffect(() => {
    if (subscription?.price) {
      let total = subscription.price + subscription.additionalPrice;
      subscription?.additionalItems.forEach(item => {
        total += item.value
      });
      setTotal(total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscription])

  const changePaymentMethod = () => {
    customerStore.emit("tab_handle", 3)
  }

  const redirectToInvoices = () => {
    customerStore.emit("tab_handle", 4)
  }

  const changePlan = () => {
    if (typeof props.handleSubscriptions === "function") {
      props.handleSubscriptions(subscription)
    }
  }

  const contentCoupon = () => {
    return (
      <TableContainer component={Grid}>
        <Table>
          <TableBody>
            {coupon &&
              <TableRow>
                <TableCell sx={{ maxWidth: "240px", width: "240px" }} align="left">
                  <Typography className={classes.text}>
                    Cupom de desconto
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600 }} className={classes.statusT}>
                    {coupon.discount && subscription?.price
                      ? `- ${masksUtils.currencyFormatToReal(coupon.discount * subscription?.price)} (${coupon.discount * 100}%)`
                      : ConstantsUtils.NullFieldMask}
                  </Typography>
                  <Typography className={classes.statusT}>
                    {coupon.name}
                  </Typography>
                </TableCell>
              </TableRow>
            }
            {!coupon &&
              <TableRow>
                <TableCell className={classes.couponCell}>
                  <Grid container spacing={3}>
                    <Grid item xs={9}>
                      <ThemedTextField
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        label="Cupom de desconto"
                        placeholder="Insira o código do cupom"
                      />
                    </Grid>
                    <Grid container item xs={3} alignSelf={"center"} justifyContent={"end"} spacing={2}>
                      <Grid item>
                        <Button size="small" className={classes.iconButton}>
                          <CloseIcon className={classes.iconColor} />
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button size="small" className={classes.iconButton}>
                          <DoneIcon className={classes.iconColor} />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const PlanCard = () => {
    return (
      <Grid item sx={{ maxWidth: "448px" }}>
        <Card className={classes.cardContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.planName}>
                {subscription?.identifier ? subscription.identifier.toUpperCase() : ConstantsUtils.NullFieldMask}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" className={classes.planValue}>
                    {masksUtils.currencyFormatToReal(subscription?.price) || ConstantsUtils.NullFieldMask}
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign={"end"}>
                  <Typography className={classes.planPeriod}>
                    *cobrança mensal
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Grid}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ maxWidth: "240px", width: "240px" }} align="left">
                        <Typography variant="caption" className={classes.text}>
                          Subtotal Produtos
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={classes.textBold}>
                          {masksUtils.currencyFormatToReal(subscription?.price) || ConstantsUtils.NullFieldMask}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {subscription?.additionalPrice !== 0 &&
                      <TableRow>
                        <TableCell sx={{ maxWidth: "240px" }} align="left">
                          <Typography className={classes.text}>
                            Custo adicional por hectare
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography>
                            <span className={classes.textBold}>
                              {masksUtils.currencyFormatToReal(subscription?.additionalPrice) || ConstantsUtils.NullFieldMask}
                            </span>&nbsp;
                            <span className={classes.value}>{`(${(subscription?.hectare !== 0 && subscription?.hectare) || ConstantsUtils.NullFieldMask} ha)`}</span>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    }
                    {subscription?.additionalItems.length > 0 &&
                      subscription.additionalItems.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell sx={{ maxWidth: "240px" }} align="left">
                              <Typography className={classes.text}>
                                {item.description}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography>
                                <span className={classes.textBold}>
                                  {masksUtils.currencyFormatToReal(item.value) || ConstantsUtils.NullFieldMask}
                                </span>&nbsp;
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              {contentCoupon()}
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.text}>
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" className={classes.total}>
                    {masksUtils.currencyFormatToReal(total) || ConstantsUtils.NullFieldMask}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container sx={{ gap: "8px" }}>
                <Button className={classes.suspendButton} onClick={() => { props.handleModal(true, subscription.objectid) }}>
                  Suspender
                </Button>
                <Button fullWidth variant="outlined" className={classes.mainButton} onClick={changePlan}>
                  Alterar assinatura
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }

  const InvoiceCard = () => {
    return (
      <Grid item sx={{ maxWidth: "448px" }}>
        <Card className={classes.cardContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="overline" className={cx(classes.text, classes.subtitle)}>
                DADOS DE COBRANÇA
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Grid}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">
                        <Typography className={classes.text}>
                          Status do pedido
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={subscription?.flagStatus ? classes.statusT : classes.statusF}>
                          {subscription?.textStatus}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography className={classes.text}>
                          Próxima cobrança
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={classes.text}>
                          {subscription?.expiresAt || ConstantsUtils.NullFieldMask}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography className={classes.text}>
                          Parcela
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography className={classes.text}>
                          {subscription?.totalPortion || ConstantsUtils.NullFieldMask}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className={classes.text}>
                              Meio de pagamento
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              sx={{ padding: 0, position: "relative", left: "-7px" }}
                              className={classes.changeButton}
                              onClick={changePaymentMethod}
                            >
                              <Typography className={classes.textButton}>
                                ALTERAR
                              </Typography>
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="left">
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className={classes.textBold}>
                              {subscription?.paymentMethod === "iugu_credit_card" ? "Crédito" : "Outro método"}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item>
                                <Typography className={classes.text}>
                                  {subscription?.ccBrand
                                    ? stringsUtils.toCapitalize(subscription.ccBrand)
                                    : ""
                                  }
                                </Typography>
                              </Grid>
                              <Grid item>

                                <Typography className={classes.textBold}>
                                  {subscription?.ccFinalNumber
                                    ? `**** ${subscription?.ccFinalNumber}`
                                    : ConstantsUtils.NullFieldMask
                                  }
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ margin: "16px 0px", height: "40px" }}
                variant="outlined"
                fullWidth
                className={classes.changeButton}
                href={subscription?.pixQrCode}
                target="_blank"
              >
                <PixIcon />
                <Typography sx={{ marginLeft: "8px" }}>
                  GERAR PAGAMENTO
                </Typography>
              </Button>
            </Grid>
            <Grid container item justifyContent={"center"}>
              <Button sx={{ marginTop: "8px", height: "40px" }} className={classes.changeButton} onClick={redirectToInvoices}>
                <Typography>
                  HISTÓRICO DE COBRANÇA
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }

  return (
    <Grid container spacing={3} sx={{ marginBottom: "24px" }}>
      <PlanCard />
      <InvoiceCard />
    </Grid>
  )
}

ItemSubscriptionCards.propTypes = {
  subscription: PropTypes.shape({
    objectid: PropTypes.string.isRequired,
    identifier: PropTypes.string,
    price: PropTypes.number,
    additionalPrice: PropTypes.number,
    activationPrice: PropTypes.number,
    hectare: PropTypes.number,
    expiresAt: PropTypes.string,
    totalPortion: PropTypes.string,
    flagStatus: PropTypes.bool.isRequired,
    textStatus: PropTypes.string.isRequired,
    coupon: PropTypes.shape({
      objectid: PropTypes.string,
      discount: PropTypes.number,
      name: PropTypes.string
    }),
    pixQrCode: PropTypes.string,
    paymentMethod: PropTypes.string,
    ccBrand: PropTypes.string,
    ccFinalNumber: PropTypes.string,
  }).isRequired,
  customerId: PropTypes.string,
  handleModal: PropTypes.func.isRequired,
  handleSubscriptions: PropTypes.func.isRequired,
}

export default ItemSubscriptionCards