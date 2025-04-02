import toolsUtils from "./ToolsUtils";

class Masks {
  currencyFormat(num) {
    if (!num)
      return

    return `${"R$ " + num.toFixed(2).replace(".", ",")}`
  }

  currencyFormatToReal(num) {
    if (num === null || num === undefined)
      return

    return `${"R$ " + (num / 100).toFixed(2).replace(".", ",")}`
  }

  formatNumber(num) {
    if (!num)
      return

    return num.toFixed(2).replace(".", ",")
  }

  maskCpfCnpj(doc) {
    if (doc.length === 11 && toolsUtils.isCpf(doc)) {
      return '999.999.999-99';
    }

    if (doc.length >= 11 && !toolsUtils.isCpf(doc)) {
      return '99.999.999/9999-99';
    }

    if (doc.length < 11) {
      return '99999999999';
    }
  }

  unMaskCpfCnpj(doc) {
    return doc.replaceAll(".", "").replaceAll("-", "").replaceAll("/", "").replaceAll("_", "");
  }

  formatCpfCnpj(doc) {
    if (doc.length === 11 && toolsUtils.isCpf(doc)) {
      return doc.substring(0, 3) + '.' + doc.substring(3, 6) + '.' + doc.substring(6, 9) + '-' + doc.substring(9);
    }

    if (doc.length >= 11 && !toolsUtils.isCpf(doc)) {
      return doc.substring(0, 2)
        + '.' + doc.substring(2, 5)
        + '.' + doc.substring(5, 8)
        + '/' + doc.substring(8, 12)
        + '-' + doc.substring(12);
    }
  }

  maskPhone(phone) {
    if ((phone[5] && phone[5] === '9') || ((phone.length === 12 || phone.length === 11) && phone[3] === '9')) {
      return '(99) 99999-9999';
    } else {
      return '(99) 9999-9999';
    }
  }

  formatPhone(phone) {
    if (!phone) {
      return ""
    }

    if (phone.length === 11) {
      return "(" + phone.substring(0, 2) + ") " + phone.substring(2, 7) + "-" + phone.substring(7)
    } else {
      return "(" + phone.substring(0, 2) + ") " + phone.substring(2, 6) + "-" + phone.substring(6)
    }
  }

  unformatPhone(phone) {
    if (!phone) {
      return ""
    }

    return phone.replace(/[\s()+_]/g, "").replace("-", "")
  }

  percentNumber(value) {
    if (typeof value === "number") {
      return value / 100
    }
  }
}

const masksUtils = new Masks()
export default masksUtils