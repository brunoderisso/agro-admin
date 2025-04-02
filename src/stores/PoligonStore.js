import { EventEmitter } from "events"


EventEmitter.EventEmitter.defaultMaxListeners = 0

class PoligonStore extends EventEmitter {
  constructor() {
    super()
    this.poligons = []
    this.allPoligons = null
    this.selectedPolygon = null
  }

  // Usar pro GET de polígono
  stringToArray(string) {
    if (typeof string !== "string") {
      return string
    }

    let coordinates = string.match(/\((-?\d+\.\d+),(-?\d+\.\d+)\)/g)
    if (!coordinates) {
      coordinates = string.match(/\((-?\d+\.\d+), (-?\d+\.\d+)\)/g)
      if (!coordinates) {
        return []
      }
    }

    const coordArray = coordinates.map(coord => {
      const [lat, lng] = coord
        .substring(1, coord.length - 1)
        .split(",")
        .map(parseFloat)
      return { lat, lng }
    })
    return coordArray
  }

  //FUNÇÃO QUE CALCULA A ÁREA "APROXIMADA" DE UM POLÍGONO NA SUPERFICIE DA TERRA PELO MÉTODO GAUSSIANO
  computeAreaGauss(points) {
    const EarthRadius = 6371000 //Raio médio da Terra em metros

    let totalArea = 0

    for (let i = 0; i < points.length; i++) {
      const p1 = points[i]
      const p2 = points[(i + 1) % points.length]

      const lat1 = (p1[1] * Math.PI) / 180
      const lon1 = (p1[0] * Math.PI) / 180
      const lat2 = (p2[1] * Math.PI) / 180
      const lon2 = (p2[0] * Math.PI) / 180

      const deltaLon = lon2 - lon1

      const x = deltaLon * Math.cos((lat1 + lat2) / 2)
      const y = lat2 - lat1

      const partialArea = x * y

      totalArea += partialArea
    }

    // A área obtida fica em "radianos ao quadrado"
    // Conversão para M²
    const areaSquareMeters = Math.abs(totalArea) * (EarthRadius ** 2)

    return areaSquareMeters
  }

  // Converte área de metros para hectares
  convertAreaToHa(area) {
    let finalArea = ""

    if (area) {
      finalArea = (area / 10000).toFixed(2)
    } else {
      finalArea = "0"
    }

    return finalArea
  }
}

const poligonStore = new PoligonStore()

export default poligonStore