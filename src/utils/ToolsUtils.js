import moment from "moment"

import PoligonStore from "../stores/PoligonStore"
import SessionStore from "../stores/SessionStore"
import CustomerStore from "../stores/CustomerStore"
import DeviceStore from "../stores/DeviceStore"
import GoogleMapStore from "../stores/GoogleMapStore"

class Tools {
  resetAllRequests() {
    CustomerStore.clear()
    DeviceStore.clear()
    GoogleMapStore.clear()
    PoligonStore.clear()
    SessionStore.clear()
  }


  isEmptyString(val) {
    if (val === undefined || val === null) {
      return true
    }

    return val.length === 0 || val === ""
  }

  isNullOrEmpty(obj, way) {
    let arr = way.split(".")
    let o = obj || {}
    for (let i = 0; i < arr.length; i++) {
      if (o !== undefined && o !== null && o[arr[i]] !== null && o[arr[i]] !== undefined) {
        o = o[arr[i]]
      } else {
        return true
      }

    }
    return false
  }

  getAvatar(user) {
    if (!this.isNullOrEmpty(user, "name") && !this.isNullOrEmpty(user, "surname")) {
      return user.name.slice(0, 1).toUpperCase() + (user.surname.slice(0, 1)).toUpperCase()
    }
    if (!this.isNullOrEmpty(user, "email")) {
      return user.email[0].toUpperCase() + user.email[1].toUpperCase()
    }
  }

  orderDates(dates) {
    dates.sort((a, b) => {
      if (moment(a, 'DD MM YYYY').format('x') > moment(b, 'DD MM YYYY').format('x')) {
        return 1
      } else if (moment(a, 'DD MM YYYY').format('x') < moment(b, 'DD MM YYYY').format('x')) {
        return -1
      } else {
        return 0
      }
    })

    return dates
  }

  isCpf(doc) {
    let strCPF = doc.replace(/\D/g, '')
    let sum, remainder, i
    sum = 0
    if (strCPF === "00000000000") return false

    for (i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
    remainder = (sum * 10) % 11

    if ((remainder === 10) || (remainder === 11)) remainder = 0
    if (remainder !== parseInt(strCPF.substring(9, 10))) return false

    sum = 0
    for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
    remainder = (sum * 10) % 11

    if ((remainder === 10) || (remainder === 11)) remainder = 0
    if (remainder !== parseInt(strCPF.substring(10, 11))) return false

    return true
  }

  isCnpj(doc) {
    const cleanCnpj = doc.replace(/\D/g, '') // Remove qualquer caractere não-numérico

    if (cleanCnpj.length !== 14) {
      return false // CNPJ deve ter 14 dígitos
    }

    const digits = cleanCnpj.split('').map(d => parseInt(d))
    const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0

    for (let i = 0; i < 12; i++) {
      sum += digits[i] * weights[i]
    }

    let remainder = sum % 11
    const firstDigit = (remainder < 2) ? 0 : (11 - remainder)

    if (digits[12] !== firstDigit) {
      return false
    }

    weights.unshift(6)
    sum = 0

    for (let i = 0; i < 13; i++) {
      sum += digits[i] * weights[i]
    }

    remainder = sum % 11
    const secondDigit = (remainder < 2) ? 0 : (11 - remainder)

    if (digits[13] !== secondDigit) {
      return false
    }

    return true
  }

  isValidDate(date) {
    const pattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/g

    return pattern.test(date)
  }

  isValidCurrency(value) {
    const pattern = /^([0-9]|,)*$/g

    return pattern.test(value)
  }

  getDeviceName(device) {
    if (device !== null &&
      device !== undefined) {
      if (!this.isNullOrEmpty(device, "description") && device.description !== "") {
        return device.description.toUpperCase()
      } else if (!this.isNullOrEmpty(device, "tag") && device.tag !== "") {
        return device.tag.toUpperCase()
      } else if (!this.isNullOrEmpty(device, "deveui") && device.deveui !== "") {
        return device.deveui.toUpperCase()
      } else {
        return ""
      }
    } else {
      return ""
    }
  }

  getCompleteDeviceName(device) {
    if (!this.isNullOrEmpty(device, "description") && device.description !== "") {
      if (!this.isNullOrEmpty(device, "tag") && device.tag !== "") {
        return device.description + "(" + device.tag + ")"
      } else {
        return device.description
      }
    } else {
      if (device.CD_ESTACAO && device.DC_NOME) {
        return device.CD_ESTACAO + " - " + device.DC_NOME + "/" + device.SG_ESTADO
      }
      return "Device: " + device.deveui
    }
  }

  getMeasureName(measure) {
    if (measure === null) {
      return ""
    }

    if (!this.isNullOrEmpty(measure, "meta.title") && measure.meta.title !== "") {
      return measure.meta.title
    } else {
      return measure.name
    }
  }

  getMeasureLegend(measure) {
    if (!this.isNullOrEmpty(measure, "meta.ylegend") && measure.meta.ylegend !== "") {
      return measure.meta.ylegend
    } else {
      return ""
    }
  }

  isEquals(obj1, obj2) {
    const key1 = Object.keys(obj1)
    const key2 = Object.keys(obj2)

    if (key1.length !== key2.length) {
      return false
    }

    const nameequals = key1.filter((value, index) => {
      return value === key2[index]
    })

    if (nameequals.length !== key1.length) {
      return false
    }

    const values = key1.filter((value, index) => {
      return typeof (obj1[value]) === typeof (obj2[key2[index]])
    })

    if (values.length !== key1.length) {
      return false
    }

    return true
  }

  decodeArrayString(array) {
    if (array === null)
      return []
    else
      return array
  }

  unreferenceArray(array) {
    return JSON.parse(JSON.stringify(array))
  }

  getInitials(fullName) {
    const nameParts = fullName.trim().split(' ');

    if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase() + nameParts[0][1].toUpperCase();
    }

    const firstInitial = nameParts[0][0].toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase();

    return `${firstInitial}${lastInitial}`;
  }
}

const toolsUtils = new Tools()
export default toolsUtils