import axios from "axios"
import toolsUtils from "../utils/ToolsUtils"


export function checkStatus(response) {
  if (axios.isCancel(response)) {
    console.error("Request canceled", "checkStatus")
  } else {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      throw response.json()
    }
  }
}

export function errorHandlerIgnoreNotFoundWithCallback(callbackFunc) {
  return function (error) {
    if (axios.isCancel(error)) {
      console.error('Request canceled', error.message);
    } else {
      if (!toolsUtils.isNullOrEmpty(error, "response.data.status") && error.response.data.status === 404) {
        callbackFunc("404");
      } else {
        errorHandlerIgnoreNotFound(error);
      }
    }
  }
}

export function errorHandler(error) {
  if (axios.isCancel(error)) {
    console.error('Request canceled', "errorHandler");
    return error
  } else {
    if (error.response === undefined) {
    console.error("Error: ", error)
    } else {
      if (error.response.status === 401) {
        console.error("Error: ", error.response.status)

      } else {
        console.error("Error: ")
      }
    }
  }
}

export function errorHandlerIgnoreNotFound(error) {
  if (axios.isCancel(error)) {
    console.error('Request canceled', "errorHandlerIgnoreNotFound");
  } else {
    if (error.response === undefined) {
      console.error(error.message)
    }
  }


}

export function errorHandlerIgnoreErrorsWithCallback(callbackFunc) {
  return function (error) {
    if (axios.isCancel(error)) {
      console.error('Request canceled', error.message);
    } else {
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        (error.response.data.status === 400 || error.response.data.status === 404 || error.response.data.status === 504)
      ) {
        callbackFunc(error.response.data || null);
      } else {
        errorHandlerIgnoreNotFound(error);
      }
    }
  }
}