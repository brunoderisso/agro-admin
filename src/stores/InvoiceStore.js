import { EventEmitter } from "events"
import axios from "axios"

import sessionStore from "./SessionStore"
import { LocalConfig } from "../LocalConfig"
import { checkStatus } from "../helpers/helpers"
import errorHandlerWithCallback from "../helpers/errorHandler"


class InvoiceStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props
  }

  postRefundInvoice(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/invoice/" + id + "/refund", null, {
      cancelToken: cancelToken.token.token.token,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
      .then(checkStatus)
      .then(response => {
        if (typeof response.data !== "undefined") {
          callBackFunc({ id: cancelToken.id, data: response.data })
        } else {
          callBackFunc({ id: cancelToken.id, data: null })
        }
      })
      .catch(errorHandlerWithCallback(callBackFunc))
  }

  postCancelInvoice(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/invoice/" + id + "/cancel", null, {
      cancelToken: cancelToken.token.token.token,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
      .then(checkStatus)
      .then(response => {
        if (typeof response.data !== "undefined") {
          callBackFunc({ id: cancelToken.id, data: response.data })
        } else {
          callBackFunc({ id: cancelToken.id, data: null })
        }
      })
      .catch(errorHandlerWithCallback(callBackFunc))
  }

  postRefreshInvoice(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/invoice/" + id + "/refresh", null, {
      cancelToken: cancelToken.token.token.token,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
      .then(checkStatus)
      .then(response => {
        if (typeof response.data !== "undefined") {
          callBackFunc({ id: cancelToken.id, data: response.data })
        } else {
          callBackFunc({ id: cancelToken.id, data: null })
        }
      })
      .catch(errorHandlerWithCallback(callBackFunc))
  }
}

const invoiceStore = new InvoiceStore()
export default invoiceStore