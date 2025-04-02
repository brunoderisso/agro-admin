import { EventEmitter } from "events"
import axios from "axios"

import sessionStore from "./SessionStore"
import { LocalConfig } from "../LocalConfig"
import { checkStatus } from "../helpers/helpers"
import errorHandlerWithCallback from "../helpers/errorHandler"


class PlanStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props
    this.errorStatus = ""
    this.checkboxServicesFeatures = null
    this.valueServicesFeatures = null
    this.servicesId = null
    this.featuresByPlan = []
    this.fullServices = []
  }

  storeCheckboxServicesFeatures(items) {
    this.checkboxServicesFeatures = items
  }

  getCheckboxServicesFeatures() {
    return this.checkboxServicesFeatures
  }

  storeValueServicesFeatures(items) {
    this.valueServicesFeatures = items
  }

  getValueServicesFeatures() {
    return this.valueServicesFeatures
  }

  storeFeaturesByPlan(items) {
    this.featuresByPlan = items
  }

  getFeaturesByPlan() {
    return this.featuresByPlan
  }

  storeServicesId(items) {
    this.servicesId = items
  }

  getServicesId() {
    return this.servicesId
  }

  storeFullServices(items) {
    this.fullServices = items
  }

  getFullServices() {
    return this.fullServices
  }

  setErrorStatus(errorStatus) {
    this.errorStatus = errorStatus
  }

  getErrorStatus() {
    return this.errorStatus
  }

  getListPlans(cancelToken, pagination, callBackFunc) {
    const token = sessionStore.getToken()

    let params = ""

    if (pagination) {
      params = "?start=" + pagination.start + "&limit=" + pagination.limit
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/plan/" + params, {
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

  getPlan(cancelToken, objectid, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/plan/" + objectid, {
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

  updatePlan(cancelToken, objectid, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/plan/" + objectid, body, {
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

  postPlan(cancelToken, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/plan/", body, {
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

  archivePlan(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/plan/" + id + "/archive", null, {
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

  getListServices(cancelToken, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.get(LocalConfig.apiURL + "/api/admin/service/", {
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

  getListFeaturesByPlan(cancelToken, planId, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/plan/" + planId + "/feature/", {
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

  postFeatureByPlan(cancelToken, planId, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/plan/" + planId + "/feature/", body, {
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

  deleteFeatureByPlan(cancelToken, planId, featureId, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.delete(LocalConfig.apiURL + "/api/billing/plan/" + planId + "/feature/" + featureId, {
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

  updateFeatureByPlan(cancelToken, planId, featureId, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/plan/" + planId + "/feature/" + featureId, body, {
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

  postSubitemPlan(cancelToken, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/subitem/", body, {
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

  updateSubitemPlan(cancelToken, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/subitem/"+body.objectid, body, {
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

  deleteSubitemPlan(cancelToken, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.delete(LocalConfig.apiURL + "/api/billing/subitem/"+body.objectid, {
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

  postSubscription(cancelToken, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/subscription/", body, {
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

  putSubscription(cancelToken, id, body, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.put(LocalConfig.apiURL + "/api/billing/subscription/" + id, body, {
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

  postSuspendSubscription(cancelToken, id, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/subscription/" + id + "/suspend", null, {
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

const planStore = new PlanStore()
export default planStore