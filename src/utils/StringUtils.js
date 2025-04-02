class Strings {
  getParameterByName(name, url = window.location.href) {
    name = name.replace(/[[\]]/g, "\\$&")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ""
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  }

  toCapitalize(str) {
    const lowerString = str.toLowerCase()
    const arr = lowerString.split(" ")

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }

    return arr.join(" ")
  }

  getNameAndSurname(fullName) {
    if (!fullName) {
      return ""
    }

    const newName = fullName.split(" ")

    return [newName[0], newName[newName.length - 1]]
  }

  formatValidityDateCc(month, year) {
    let date = month?.length === 1 ? "0" + month : month;

    date += "/" + year?.substr(2, 3)

    return date
  }

  slugURL(string) {
    if (!string) return ""

    return string.toLowerCase()
      .replace(/[àÀáÁâÂãäÄÅåª]+/g, "a")       // Special Characters #1
      .replace(/[èÈéÉêÊëË]+/g, "e")       	// Special Characters #2
      .replace(/[ìÌíÍîÎïÏ]+/g, "i")       	// Special Characters #3
      .replace(/[òÒóÓôÔõÕöÖº]+/g, "o")       	// Special Characters #4
      .replace(/[ùÙúÚûÛüÜ]+/g, "u")       	// Special Characters #5
      .replace(/[ýÝÿŸ]+/g, "y")       		// Special Characters #6
      .replace(/[ñÑ]+/g, "n")       			// Special Characters #7
      .replace(/[çÇ]+/g, "c")       			// Special Characters #8
      .replace(/[ß]+/g, "ss")       			// Special Characters #9
      .replace(/[Ææ]+/g, "ae")       			// Special Characters #10
      .replace(/[Øøœ]+/g, "oe")       		// Special Characters #11
      .replace(/[%]+/g, "pct")       			// Special Characters #12
      .replace(/[_]+/g, "-")       			// Special Characters #12
      .replace(/\s+/g, "-")           		// Replace spaces with -
      .replace(/[^\w-]+/g, "")       		    // Remove all non-word chars
      .replace(/--+/g, "-")         		    // Replace multiple - with single -
      .replace(/^-+/, "")             		// Trim - from start of text
      .replace(/-+$/, "")                    // Trim - from end of text
  }

  // Substitui hífens, pontos e underlines por espaços
  patternMarketName(name) {
    return name.replace(/[-._]/g, ' ').toLowerCase()
  }
}

const stringsUtils = new Strings()
export default stringsUtils