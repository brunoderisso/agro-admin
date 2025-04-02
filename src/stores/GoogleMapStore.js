import { EventEmitter } from "events"
import axios from "axios"

import SessionStore from "./SessionStore"
import { LocalConfig } from "../LocalConfig"
import { checkStatus } from "../helpers/helpers"
import errorHandlerWithCallback from "../helpers/errorHandler"

EventEmitter.EventEmitter.defaultMaxListeners = 0


class GoogleMapsStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props

    this.polygonReferences = []
    this.marketReferences = []
    this.environmentReferences = []
    this.areaReferences = []
    this.deviceReferences = []
    this.gatewayRadiusKm = 20
    this.gatewayReferences = { gateways: [] }
    this.inmetReferences = { radiusReference: null, stations: [] }
    this.inmetRadiusKm = 40
    this.featuresAdvancedMap = []
    this.totalMarkets = []
    this.checkboxGateways = {}
    this.typeGroupGateways = "market"
    this.deviceProps = {}
    this.gatewayProps = {}
    this.checkboxDevices = {}
    this.checkboxEnvironments = {}
  }

  storeDeviceProps(device) {
    this.deviceProps = device
  }

  storeGatewayProps(gateway) {
    this.gatewayProps = gateway
  }

  storeGatewayReference(obj, pin, radius) {
    this.gatewayReferences.gateways.push({ object: obj, reference: { pin, radius } })
  }

  storeGatewayRadiusKm(radius) {
    this.gatewayRadiusKm = radius
  }

  storePolygonReference(obj, reference) {
    this.polygonReferences.push({ object: obj, reference })
  }

  storeMarketReference(obj, reference) {
    this.marketReferences.push({ object: obj, reference })
  }

  storeEnvironmentReference(obj, reference) {
    this.environmentReferences.push({ object: obj, reference })
  }

  storeAreaReference(obj, reference) {
    this.areaReferences.push({ object: obj, reference })
  }

  storeDeviceReference(obj, reference) {
    this.deviceReferences.push({ object: obj, reference })
  }

  // Depois que armazenar todos os mercados, não deve mais alterar essa variável
  storeTotalMarkets(markets) {
    this.totalMarkets = markets
  }

  storeCheckboxGateways(items) {
    this.checkboxGateways = items
  }

  storeCheckboxDevices(items) {
    this.checkboxDevices = items
  }

  storeCheckboxEnvironments(items) {
    this.checkboxEnvironments = items
  }

  storeTypeGroupGateways(type) {
    this.typeGroupGateways = type
  }

  getDeviceProps() {
    return this.deviceProps
  }

  getGatewayProps() {
    return this.gatewayProps
  }

  getTypeGroupGateways() {
    return this.typeGroupGateways
  }

  getCheckboxGateways() {
    return this.checkboxGateways
  }

  getCheckboxDevices() {
    return this.checkboxDevices
  }

  getCheckboxEnvironments() {
    return this.checkboxEnvironments
  }

  getTotalMarkets() {
    return this.totalMarkets
  }

  getPolygonReferences() {
    return this.polygonReferences
  }

  getMarketReferences() {
    return this.marketReferences
  }

  getEnvironmentReferences() {
    return this.environmentReferences
  }

  getAreaReferences() {
    return this.areaReferences
  }

  getDeviceReferences() {
    return this.deviceReferences
  }

  getGatewayReference() {
    return this.gatewayReferences
  }

  getGatewayRadiusKm() {
    return this.gatewayRadiusKm
  }

  getInmetReferences() {
    return this.inmetReferences
  }

  resetGatewayReference() {
    this.gatewayReferences.gateways.forEach(gateway => {
      gateway.reference.pin.setMap(null)
      gateway.reference.radius.setMap(null)
    })

    this.gatewayReferences.gateways = []
  }

  resetDeviceReference() {
    this.deviceReferences.forEach(device => {
      device.reference.setMap(null)
    })

    this.deviceReferences = []
  }

  resetPolygonReference() {
    this.polygonReferences.forEach(polygon => {
      polygon.reference.setMap(null)
    })

    this.polygonReferences = []
  }

  resetMarketReference() {
    this.marketReferences.forEach(market => {
      market.reference.setMap(null)
    })

    this.marketReferences = []
  }
  resetEnvironmentReference() {
    this.environmentReferences.forEach(environment => {
      environment.reference.setMap(null)
    })

    this.environmentReferences = []
  }

  isFullscreen(element) {
    return (
      (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) === element
    )
  }

  requestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullScreen) {
      element.msRequestFullScreen()
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  convertPointsToLatLng(coordinates, maps) {
    if (coordinates?.length > 0 && maps) {
      return coordinates.map(coord => new maps.LatLng(coord[1], coord[0]))
    }

    return []
  }

  //Calcula o centro de um polygono composto por 2 pontos (Circulo)
  getCenterCircle(points) {
    let lat = (points[0].lat + points[1].lat) / 2
    let lng = (points[0].lng + points[1].lng) / 2

    return { lat, lng }
  }

  getFeaturesByEnvironment(cancelToken, id, callbackFunc) {
    const token = SessionStore.getToken()

    this.axios = axios.get(LocalConfig.apiURL + "/api/account/environment/" + id + "/feature/", {
      cancelToken: cancelToken.token.token.token,
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Bearer " + token,
      }
    })
      .then(checkStatus)
      .then((responseData) => {
        if (typeof (responseData) === "undefined") {
          callbackFunc({ data: null, id: cancelToken.id })
        } else {
          callbackFunc({ data: responseData.data, id: cancelToken.id })
        }
      })
      .catch(errorHandlerWithCallback(callbackFunc))
  }

  getMarketsRequest(cancelToken, callBackFunc) {
    const token = SessionStore.getToken()

    if (token === null) {
      return
    }

    this.axios = axios.get(LocalConfig.apiURL + "/api/billing/market/", {
      cancelToken: cancelToken.token.token.token,
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Bearer " + token,
      },
    })
      .then(checkStatus)
      .then(response => {
        if (typeof response.data !== "undefined") {
          callBackFunc({ id: cancelToken.id, data: response.data })
        }
      })
      .catch(errorHandlerWithCallback(callBackFunc))
  }

  filterMarkets(cancelToken, marketQuery, callBackFunc) {
    const token = SessionStore.getToken()

    if (token === null) {
      return
    }

    this.axios = axios.post(LocalConfig.apiURL + "/api/billing/panel", { markets: marketQuery }, {
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

  showOnMap(value) {
    // Se nenhum valor for passado, execute todas as renderizações
    if (!value) {
      this.showDevices()
      this.showEnvironments()
      this.showArea()
      this.showEnvironmentBounds()
      this.showMarkets()
      this.showGateways()
    } else {
      // Caso contrário, execute conforme o valor passado
      switch (value) {
        case "devices":
          this.showDevices()

          break
        case "environments":
          this.showEnvironments()

          break
        case "areas":
          this.showArea()

          break
        case "environmentBounds":
          this.showEnvironmentBounds()

          break
        case "markets":
          this.showMarkets()

          break
        case "gateways":
          this.showGateways()

          break
        case "inmet":
          this.showInmet()

          break
        default:
          break
      }
    }
  }

  showDevices() {
    const deviceReferences = this.getDeviceReferences()

    deviceReferences.forEach(element => {
      if (element?.object && element?.reference) {
        const object = element.object

        if (object.hasOwnProperty("deveui")) {
          const reference = element.reference

          if (object.visible) {
            reference.setVisible(true)
          } else {
            reference.setVisible(false)
          }
        }
      }
    })
  }

  showEnvironments() {
    const environmentReferences = this.getEnvironmentReferences()

    environmentReferences.forEach(element => {
      if (element?.object && element?.reference) {
        const object = element.object

        if (object.hasOwnProperty("centroid")) {
          const reference = element.reference

          if (object.visible) {
            reference.setVisible(true)
          } else {
            reference.setVisible(false)
          }
        }
      }
    })
  }

  showArea() {
    const areaReferences = this.getAreaReferences()

    areaReferences.forEach(element => {
      if (element?.object && element?.reference) {
        const object = element.object

        if (object.hasOwnProperty("placemarks")) {
          const reference = element.reference
          reference.setVisible(!reference.getVisible())
        }
      }
    })
  }

  showEnvironmentBounds() {
    const polygonReferences = this.getPolygonReferences()

    polygonReferences.forEach(element => {
      if (element?.object && element?.reference) {
        const object = element.object

        if (object.isEnvironment) {
          const reference = element.reference
          reference.setVisible(!reference.getVisible())
        }
      }
    })
  }

  showMarkets() {
    const polygonReferences = this.getMarketReferences()

    polygonReferences.forEach(element => {
      if (element?.object && element?.reference) {
        const object = element.object

        if (object.market) {
          const reference = element.reference
          reference.setVisible(!reference.getVisible())
        }
      }
    })
  }

  showGateways() {
    const gatewayReferences = this.getGatewayReference()

    gatewayReferences.gateways.forEach(element => {
      if (element?.object && element?.reference) {
        const object = element.object

        if (object.hasOwnProperty("mac")) {
          const pin = element.reference.pin
          const radius = element.reference.radius

          if (object.visible) {
            pin.setVisible(true)
            radius.setVisible(true)
          } else {
            pin.setVisible(false)
            radius.setVisible(false)
          }
        }
      }
    })
  }

  showInmet() {
    const inmetReferences = this.getInmetReferences()
    const radius = inmetReferences.radiusReference

    radius.setVisible(!radius.getVisible())
    inmetReferences.stations.forEach(station => {
      const reference = station.reference
      reference.setVisible(!reference.getVisible())
    })
  }

  updateMarketsObject(value) {
    const allNode = []
    let checkboxGatewaysByNode = {}

    Object.values(this.getCheckboxGateways()).forEach(nodeObject => {
      Object.keys(nodeObject).forEach(node => {
        let testNode = false

        if (allNode.length === 0) {
          allNode.push(node)
        } else {
          testNode = allNode.some(item => item === node && !testNode)

          if (!testNode) {
            allNode.push(node)
          }
        }
      })
    })

    allNode.forEach(node => {
      Object.keys(this.getCheckboxGateways()).forEach(middle => {
        checkboxGatewaysByNode = { ...checkboxGatewaysByNode }

        Object.keys(this.getCheckboxGateways()[middle]).forEach(nodeKey => {
          if (nodeKey === node) {
            checkboxGatewaysByNode[nodeKey] = { ...checkboxGatewaysByNode[nodeKey] }
            checkboxGatewaysByNode[nodeKey][middle] = { ...this.getCheckboxGateways()[middle][nodeKey] }
          }
        })
      })
    })

    this.storeCheckboxGateways(checkboxGatewaysByNode)
    this.emit("checkboxGateways_update", value === 0 ? "market" : "status")
  }

  selectGroupByEnvironment(area) {
    if (area && area <= 50000) {
      return "group1" // 1 a 50 ha
    } else if (area && area > 50000 && area <= 100000) {
      return "group2" // 51 a 100 ha
    } else if (area && area > 100000) {
      return "group3" // 101 ha ou +
    } else {
      return "group4" // indefinido
    }
  }
}

const GMapStore = new GoogleMapsStore()

export default GMapStore