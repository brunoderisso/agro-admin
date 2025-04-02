import { useState, useEffect, useRef } from "react"

import { Grid } from "@mui/material"

import InfoDrawer from "./GoogleMaps/Drawer/InfoDrawer"
import GoogleMaps from "./GoogleMaps/GoogleMaps"
import toolsUtils from "../../utils/ToolsUtils"
import AdministrativeStore from "../../stores/AdministrativeStore"
import GMapStore from "../../stores/GoogleMapStore"
import UserFeedback from "../Common/UserFeedback"
import { ProviderMarkets } from "./ProviderAdvancedMap"
import stringsUtils from "../../utils/StringUtils"
import CancelToken from "../../helpers/cancelToken"
import { DeviceType, EnvironmentType, GatewayType, MarketObjectType, PolygonType } from "../../interfaces/AdvancedMapPage/GoogleMaps"
import { ApiResponseType } from "../../interfaces/Utils"


function AdvancedMapPage(props) {
  const [environment, setEnvironment] = useState<EnvironmentType | {}>({})
  const [environmentBounds, setEnvironmentBounds] = useState([])
  const [outputMarkets, setOutputMarkets] = useState<MarketObjectType[]>([])
  const [allowedExecuteMarkets, setAllowedExecuteMarkets] = useState<boolean>(false)
  const [devices, setDevices] = useState<DeviceType[]>([])
  const [polygons, setPolygons] = useState<PolygonType[]>([])
  // const [areas, setAreas] = useState([])
  const [gateways, setGateways] = useState<GatewayType[]>([])
  const [errorStatusResponse, setErrorStatusResponse] = useState<string>("")

  const polygonsRef = useRef<PolygonType[]>([])

  useEffect(() => {
    bind()

    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let env = AdministrativeStore.getEnvironment()
    let bounds = env.bounds

    setEnvironmentBounds(bounds)
    setEnvironment(env)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    if (outputMarkets.length > 0) {
      const newGateways: GatewayType[] = []
      const newDevices: DeviceType[] = []
      const newPolygons: PolygonType[] = []

      outputMarkets.forEach(market => {
        market.gateways.forEach(gateway => {
          const newGateway = {
            ...gateway,
            market: stringsUtils.patternMarketName(market.name),
            visible: true
          }

          newGateways.push(newGateway)
        })

        market.devices.forEach(device => {
          const newDevice = {
            ...device,
            visible: true
          }

          newDevices.push(newDevice)
        })

        market.environments.forEach(polygon => {
          const newPolygon = {
            ...polygon,
            centroid: true,
            visible: true
          }

          newPolygons.push(newPolygon)
        })
      })

      setGateways(newGateways)
      setDevices(newDevices)
      setPolygons(newPolygons)
      polygonsRef.current = newPolygons
    } else {
      setGateways([])
      setDevices([])
      setPolygons([])
      polygonsRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputMarkets])

  const bind = () => {
    GMapStore.addListener("mapMarkets_load", getMarkets)
    GMapStore.addListener("environments_update", updateEnvironments)
  }

  const clear = () => {
    GMapStore.removeListener("mapMarkets_load", getMarkets)
    GMapStore.removeListener("environments_update", updateEnvironments)
  }

  const getMarkets = (markets) => {
    if (markets.length > 0) {
      filterMarkets(markets)
    } else if (allowedExecuteMarkets) {
      setOutputMarkets([])
    } else {
      setAllowedExecuteMarkets(true)
      setOutputMarkets([])
    }

    if (markets.error) {
      setErrorStatusResponse(markets.error)
    }
  }

  const filterMarkets = (marketsList) => {
    const marketsId = marketsList.map(market => market.objectid)

    GMapStore.filterMarkets(CancelToken(), marketsId, responseFilterMarkets)
  }

  const responseFilterMarkets = (response: ApiResponseType<MarketObjectType>) => {
    CancelToken().remove(response.id)

    if (response.data) {
      let gatewayCheckboxes = {}
      const deviceCheckboxes = {}
      const environmentCheckboxes = {}

      const newOutputMarkets = Object.entries(response.data).map(([name, market]) => {
        const marketName = stringsUtils.patternMarketName(name)
        const statusGateway = []
        let gatewaysObject = {}

        const statusDevice = []

        gatewayCheckboxes = { ...gatewayCheckboxes, [marketName]: {} }
        market.gateways.forEach(gateway => {
          let status = ""

          if (["WARNING", "CRITICAL"].includes(gateway.status)) {
            status = "WARNING"
          } else {
            status = gateway.status
          }

          if (!statusGateway.some(statusGat => statusGat === status)) {
            statusGateway.push(status)
            gatewaysObject = { ...gatewaysObject, [status]: {} }
          }
          gatewaysObject[status] = { ...gatewaysObject[status], [gateway.mac]: true }
        })
        gatewayCheckboxes[marketName] = gatewaysObject

        market.devices.forEach(device => {
          let status = ""

          if (["WARNING", "CRITICAL"].includes(device.status)) {
            status = "WARNING"
          } else if (device.status === null) {
            status = "UNKNOW"
          } else {
            status = device.status
          }

          if (!statusDevice.some(statusDev => statusDev === status)) {
            statusDevice.push(status)
          }

          deviceCheckboxes[status] = { ...deviceCheckboxes[status], [device.tag]: true }
        })

        market.environments.forEach(environment => {
          let group = GMapStore.selectGroupByEnvironment(environment.area)

          environmentCheckboxes[group] = { ...environmentCheckboxes[group], [environment.objectid]: true }
        })

        return {
          ...market,
          name: marketName
        }
      })

      setOutputMarkets(newOutputMarkets)
      GMapStore.storeCheckboxGateways(gatewayCheckboxes)
      GMapStore.storeCheckboxDevices(deviceCheckboxes)
      GMapStore.storeCheckboxEnvironments(environmentCheckboxes)
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }
  }

  const updateEnvironments = (environments) => {
    const newPolygons = [...polygonsRef.current]

    environments.forEach(environment => {
      const indexEnv = newPolygons.findIndex(polygon => polygon.objectid === environment.objectid)

      if (indexEnv > -1) {
        newPolygons[indexEnv] = environment
      }
    })

    setPolygons(newPolygons)
    polygonsRef.current = newPolygons
  }

  return (
    <Grid container>
      <ProviderMarkets>
        {!toolsUtils.isNullOrEmpty(environment, "latitude") &&
          <GoogleMaps
            environment={environment}
            environmentBounds={environmentBounds}
            polygons={polygons}
            // areas={areas}
            devices={devices}
            gateways={gateways}
            advancedMapControls
            disableDefaultControls
          />
        }
        <InfoDrawer outputMarkets={outputMarkets} />
      </ProviderMarkets>
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </Grid>
  )
}

export default AdvancedMapPage