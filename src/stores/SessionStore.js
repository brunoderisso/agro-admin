import { EventEmitter } from "events"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

import { LocalConfig } from "../LocalConfig"
import { checkStatus } from "../helpers/helpers"
import errorHandlerWithCallback from "../helpers/errorHandler"


class SessionStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.view = ""
  }

  setToken(token) {
    if (token !== "") {
      localStorage.setItem("token", token)
      return true
    }

    return false
  }


  getToken(navigate) {
    const token = localStorage.getItem("token")

    if (token !== null) {
      const decodedToken = jwtDecode(token)

      if (decodedToken !== null) {
        const dateNow = new Date()

        if (decodedToken.Expire * 1000 < dateNow.getTime() && typeof navigate === "function") {
          this.logout(() => {
            navigate("/login")
          })
        }
        return token
      }
    }

    this.logout(() => {
      if (!window.location.hash.includes("active") && !window.location.hash.includes("forgot") && typeof navigate === "function") {
        navigate("/login")
      }
    })
    return null
  }

  login(login, tokenLogin, callBackFunc) {
    this.axios = axios.post(LocalConfig.apiURL + "/api/login", login, {
      cancelToken: tokenLogin.token.token.token,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(response => {
        if (typeof (response.data.token) !== "undefined") {
          if (this.setToken(response.data.token)) {
            callBackFunc({ id: tokenLogin.id, data: response.data })
          }
        }
      })
      .catch(errorHandlerWithCallback(callBackFunc))
  }

  logout(callBackFunc) {
    localStorage.clear()
    sessionStorage.clear()
    window.localStorage.clear()

    if (typeof (callBackFunc) !== "undefined") {
      callBackFunc()
      this.emit("check_login")
    }
  }

  signin(email, tokenLogin, callBackFunc) {
    this.axios = axios.post(LocalConfig.apiURL + "/api/signin", email, {
      cancelToken: tokenLogin.token.token.token,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(response => {
        if (typeof response.data !== "undefined") {
          callBackFunc({ id: tokenLogin.id, data: response.data })
        } else {
          callBackFunc({ id: tokenLogin.id, data: null })
        }
      })
      .catch(errorHandlerWithCallback(callBackFunc))
  }

  fetchPreference(navigate) {
    const token = this.getToken(navigate)

    this.axios = axios.get(LocalConfig.apiURL + "/api/account/preference", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then(checkStatus)
      .then(response => {
        if (typeof response.data !== "undefined") {
          this.setPreference(response.data)
          this.emit("fetch_preference");
        }
      })
  }

  setPreference(p) {
    if (p !== "") {
      localStorage.setItem("preference", JSON.stringify(p))

      return true
    }

    return false
  }

  getPreference() {
    const preference = JSON.parse(localStorage.getItem("preference"))

    if (preference !== "" && preference) {
      return preference
    }

    return null
  }
}

const sessionStore = new SessionStore()
export default sessionStore