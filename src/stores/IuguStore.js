import { EventEmitter } from "events"


class IuguStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props
  }

  createTokenIugu(creditCard, iugu, tokenResponseHandler) {
    const first_name = creditCard.full_name.split(" ")[0]
    const last_name = creditCard.full_name.split(" ")[creditCard.full_name.split(" ").length - 1]
    const mouth = creditCard.expiration.split("/")[0]
    const year = creditCard.expiration.split("/")[1]

    const cc = iugu.CreditCard(creditCard.number, mouth, year, first_name, last_name, creditCard.verification_value)

    iugu.createPaymentToken(cc, tokenResponseHandler)
  }

  getBrandCreditCard(n, iugu) {
    const number = n.replace(" ", "")

    if (iugu) {
      const brand = iugu.utils.getBrandByCreditCardNumber(number)
      return brand
    }
    return false
  }
}

const iuguStore = new IuguStore()
export default iuguStore