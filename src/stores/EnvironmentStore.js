import { EventEmitter } from "events"
import axios from "axios"

import { LocalConfig } from "../LocalConfig"
import errorHandlerWithCallback from "../helpers/errorHandler"
import sessionStore from "./SessionStore"
import { checkStatus } from "../helpers/helpers"


class EnvironmentStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props
  }

  getEnvironmentList(cancelToken, callBackFunc) {
    const token = sessionStore.getToken()

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/environment/", {
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

const environmentStore = new EnvironmentStore()
export default environmentStore