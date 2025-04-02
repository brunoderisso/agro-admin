import { EventEmitter } from "events"
import axios from "axios"

import sessionStore from "./SessionStore"
import { LocalConfig } from "../LocalConfig"
import { checkStatus } from "../helpers/helpers"
import errorHandlerWithCallback from "../helpers/errorHandler"


class CouponStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props
  }

  getListCoupons(cancelToken, pagination, callBackFunc) {
    const token = sessionStore.getToken()

    let params = ""

    if (pagination) {
      params = "?start=" + pagination.start + "&limit=" + pagination.limit
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/coupon/" + params, {
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

  archiveCoupon(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/coupon/" + id + "/archive", null, {
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

  postCoupon(cancelToken, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/coupon/", body, {
      cancelToken: cancelToken.token.token.token,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
      .then(checkStatus)
      .then(response => {
        if (typeof response.data !== "undefined") {
          callBackFunc({ id: cancelToken.id, data: { ...response.data, coupon: body } })
        } else {
          callBackFunc({ id: cancelToken.id, data: null })
        }
      })
      .catch(errorHandlerWithCallback(callBackFunc))
  }

  updateCoupon(cancelToken, objectid, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/coupon/" + objectid, body, {
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

const couponStore = new CouponStore()
export default couponStore