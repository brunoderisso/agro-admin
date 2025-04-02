import { EventEmitter } from "events"
import axios from "axios"

import { LocalConfig } from "../LocalConfig"
import { checkStatus } from "../helpers/helpers"
import errorHandlerWithCallback from "../helpers/errorHandler"
import sessionStore from "./SessionStore"


class CustomerStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props
  }

  getCustomers(){
    return localStorage.getItem("customers") ? JSON.parse(localStorage.getItem("customers")) : []
  }

  getListCustomers(cancelToken, pagination, callBackFunc) {
    const token = sessionStore.getToken()

    let params = ""

    if (pagination) {
      params = "?start=" + pagination.start + "&limit=" + pagination.limit
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/customer/" + params, {
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

  getCustomer(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/customer/" + id, {
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

  updateCustomer(cancelToken, id, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/customer/" + id, body, {
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

  postSuspendCustomer(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/customer/" + id + "/suspend", {}, {
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

  getPropertiesByCustomer(cancelToken, id, pagination, callBackFunc) {
    const token = sessionStore.getToken()

    let params = ""

    if (pagination) {
      params = "?start=" + pagination.start + "&limit=" + pagination.limit
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/customer/" + id + "/environment/" + params, {
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

  updatePropertyByCustomer(cancelToken, customerId, envId, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/customer/" + customerId + "/environment/" + envId, body, {
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

  postPropertyByCustomer(cancelToken, customerId, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/customer/" + customerId + "/environment/", body, {
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

  postCustomer(cancelToken, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/customer/", body, {
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

  deletePropertyByCustomer(cancelToken, customerId, envId, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.delete(LocalConfig.apiURL + "/api/billing/customer/" + customerId + "/environment/" + envId, {
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

  getSubscriptionsByCustomer(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/customer/" + id + "/subscription/", {
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

  getInvoicesByCustomer(cancelToken, id, pagination, callBackFunc) {
    const token = sessionStore.getToken()

    let params = ""

    if (pagination) {
      params = "?start=" + pagination.start + "&limit=" + pagination.limit
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/customer/" + id + "/invoice/" + params, {
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

  getPaymentsByCustomer(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/customer/" + id + "/payment_method/", {
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

  setDefaultPaymentByCustomer(cancelToken, customerId, paymentId, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/customer/" + customerId + "/payment_method/" + paymentId + "/set_default", null, {
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

  updatePaymentByCustomer(cancelToken, customerId, payment, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/customer/" + customerId + "/payment_method/" + payment.objectid, payment, {
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

  postPaymentByCustomer(cancelToken, customerId, payment, description, callBackFunc) {
    const token = sessionStore.getToken()

    const body = {
      set_as_default: "true",
      token: payment.id,
      description: description || "Meu Cartão"
    }

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/customer/" + customerId + "/payment_method/", body, {
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

  deletePaymentByCustomer(cancelToken, customerId, paymentId, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.delete(LocalConfig.apiURL + "/api/billing/customer/" + customerId + "/payment_method/" + paymentId, {
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

  getListCouponsByCustomer(cancelToken, id, pagination, callBackFunc) {
    const token = sessionStore.getToken()

    let params = ""

    if (pagination) {
      params = "?start=" + pagination.start + "&limit=" + pagination.limit
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/customer/" + id + "/coupon/" + params, {
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

const customerStore = new CustomerStore()
export default customerStore