import { useContext, useEffect, useRef, useState } from "react"
import GoogleMapReact from "google-map-react"
import { useLocation } from "react-router-dom"

import PropTypes from "prop-types"

import { Button, ButtonGroup, Grid, IconButton } from "@mui/material"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"

import { LocalConfig } from "../../../LocalConfig"
import useStyles from "../../../styles/AdvancedMapPage/GoogleMaps/GoogleMaps"
import GoogleMapStore from "../../../stores/GoogleMapStore"
import ZoomInIcon from "../../../img/AdvancedMapIcons/ZoomInIcon.svg?react"
import ZoomOutIcon from "../../../img/AdvancedMapIcons/ZoomOutIcon.svg?react"
import GatewayIcon from "../../../img/pins/Gateway.png"
import PredizaPin from "../../../img/pins/BluePin.png"
import PredizaPinLight from "../../../img/AdvancedMapIcons/pin_light_unshadow.svg"
import { ContextMarkets } from "../ProviderAdvancedMap"
import theme from "../../../styles/Utils/Theme"
import poligonStore from "../../../stores/PoligonStore"
import InfoCard from "./InfoCard"
import GMapStore from "../../../stores/GoogleMapStore"
import { DeviceType, DrawedPolygonType, environmentBoundsType, GatewayType, PolygonType } from "../../../interfaces/AdvancedMapPage/GoogleMaps"


interface DocumentWithFullscreenEvents extends Document {
  onwebkitfullscreenchange?: (this: Document, ev: Event) => any;
  onmsfullscreenchange?: (this: Document, ev: Event) => any;
  onmozfullscreenchange?: (this: Document, ev: Event) => any;
}

const doc = document as DocumentWithFullscreenEvents

const defaultCenter = {
  lat: -8.680201329794073,
  lng: -39.16103292721983
}

const defaultZoom = 1

function GoogleMaps(props) {
  const { classes } = useStyles()
  const { search } = useLocation()

  const { markets } = useContext(ContextMarkets)

  const [apiLoaded, setApiLoaded] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const [environmentBounds, setEnvironmentBounds] = useState<environmentBoundsType>(null)
  const [polygons, setPolygons] = useState<PolygonType[]>([])
  const [devices, setDevices] = useState<DeviceType[]>([])
  const [areas, setAreas] = useState([])
  const [gateways, setGateways] = useState<GatewayType[]>([])

  //CARDS DO MAPA
  const [deviceProps, setDeviceProps] = useState(null)
  const [gatewayProps, setGatewayProps] = useState(null)

  const [isDrawed, setIsDrawed] = useState<DrawedPolygonType>({
    areas: false, devices: false, environmentBounds: false, polygons: false
  })

  const mapsReference = useRef(null)

  useEffect(() => {
    bind()
    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (props.environmentBounds) {
      setEnvironmentBounds({ bounds: poligonStore.stringToArray(props.environmentBounds), isEnvironment: true })
    }

    if (props.polygons) {
      setPolygons(props.polygons)
    }

    if (props.areas) {
      setAreas(props.areas)
    }

    if (props.devices) {
      setDevices(props.devices)
    }

    if (props.gateways) {
      setGateways(props.gateways)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    if (mapsReference.current) {
      if (areas.length > 0 && !isDrawed.areas) {
        drawPolygons(areas)
        setIsDrawed((prevState) => ({
          ...prevState,
          areas: true
        }))
      }

      if (polygons.length > 0) {
        GoogleMapStore.resetEnvironmentReference()
        drawPolygons(polygons)
        GoogleMapStore.showOnMap("environments")
      }

      if (environmentBounds && !isDrawed.environmentBounds) {
        drawPolygons([environmentBounds])
        setIsDrawed((prevState) => ({
          ...prevState,
          environmentBounds: true
        }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polygons, areas, environmentBounds])

  useEffect(() => {
    GoogleMapStore.resetGatewayReference()

    if (gateways.length > 0) {
      drawGateways(gateways)
      GoogleMapStore.showOnMap("gateways")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gateways])

  useEffect(() => {
    GoogleMapStore.resetDeviceReference()

    if (devices.length > 0) {
      drawDevices(devices)
      GoogleMapStore.showOnMap("devices")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devices])

  useEffect(() => {
    GoogleMapStore.resetMarketReference()

    if (markets.length > 0) {
      drawPolygons(markets)

      const bounds = []

      markets.forEach(market => {
        bounds.push(...market.bounds)
      })

      centerMapPoints(bounds)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markets])

  useEffect(() => {
    if (apiLoaded) {
      if (environmentBounds?.polygon) {
        drawPolygons([environmentBounds])
        setIsDrawed((prevState) => ({
          ...prevState,
          environmentBounds: true,
        }))
      }

      //Desenha os Polygons (talhões)
      if (polygons.length > 0) {
        drawPolygons(polygons)
        setIsDrawed((prevState) => ({
          ...prevState,
          polygons: true,
        }))
      }

      //Desenha as Áreas
      if (areas.length > 0) {
        drawPolygons(areas)
        setIsDrawed((prevState) => ({
          ...prevState,
          areas: true,
        }))
      }

      //Desenha os Devices
      if (devices.length > 0) {
        drawDevices(devices)
        setIsDrawed((prevState) => ({
          ...prevState,
          devices: true,
        }))
      }

      //Insere os componentes do mapa avançado na interface do google maps.
      if (props.advancedMapControls) {
        attachAdvancedMapControls()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiLoaded])

  useEffect(() => {
    if (search.length > 0) {
      const paramURL = search.split("=")[0].split("?")[1]
      const mac = search.split("=")[1]

      if (paramURL === "gateway") {
        const selectedGateway = gateways.filter(gateway => gateway.mac === mac)[0]

        if (selectedGateway?.coverage?.point) {
          centerMapPoints([[selectedGateway.coverage.point.x, selectedGateway.coverage.point.y]])
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, gateways])

  const bind = () => {
    GoogleMapStore.addListener("MapType_change", mapTypeChange)
    GoogleMapStore.addListener("gateways_update", setGateways)
    GoogleMapStore.addListener("devices_update", setDevices)
    GoogleMapStore.addListener("googleMaps_center", (points) => centerMapPoints(points, true))
  }

  const clear = () => {
    GoogleMapStore.removeListener("MapType_change", mapTypeChange)
    GoogleMapStore.removeListener("gateways_update", setGateways)
    GoogleMapStore.removeListener("devices_update", setDevices)
    GoogleMapStore.removeListener("googleMaps_center", (points) => centerMapPoints(points, true))
  }

  const mapTypeChange = (value) => {
    if (value) {
      mapsReference.current.map.setMapTypeId("hybrid")
    } else {
      mapsReference.current.map.setMapTypeId("satellite")
    }
  }

  const centerMapPoints = (points, direct = false) => {
    if ((apiLoaded || direct) && points) {
      let bounds = new mapsReference.current.maps.LatLngBounds()

      points.forEach(point => {
        bounds.extend({ lat: point[1], lng: point[0] })
      })
      mapsReference.current.map.fitBounds(bounds)
    }
  }

  const drawDevices = (devices) => {
    const maps = mapsReference.current?.maps
    const map = mapsReference.current?.map

    if (devices.length > 0 && maps) {
      devices.forEach(device => {
        const marker_image = {
          url: PredizaPin,
          scaledSize: new maps.Size(16, 16),
          origin: new maps.Point(0, 0),  // The origin for my image is 0,0.
          anchor: new maps.Point(8, 8)  // The center of the image is 50,50 (my image is a circle with 100,100)
        }
        const pin = new maps.Marker({
          position: { lat: device.latitude, lng: device.longitude },
          icon: marker_image,
          zIndex: 3,
        })

        pin.setMap(map)

        GoogleMapStore.storeDeviceReference(device, pin)
        onClickDevice(pin, device)
        attachPinListener(pin, PredizaPin, PredizaPinLight)
      })
    }
  }

  const onClickDevice = (pin, device) => {
    const maps = mapsReference.current.maps

    maps.event.addListener(pin, "click", function () {

      if (device.latitude === GMapStore.getDeviceProps()?.latitude && device.longitude === GMapStore.getDeviceProps()?.longitude) {
        setDeviceProps(null)
        GMapStore.storeDeviceProps(null)
      } else {
        const newDevice = {
          tag: device.tag,
          latitude: device.latitude,
          longitude: device.longitude
        }

        setGatewayProps(null)
        GMapStore.storeGatewayProps(null)

        setDeviceProps(newDevice)
        GMapStore.storeDeviceProps(newDevice)
      }
    })
  }

  const onClickGateway = (pin, gateway) => {
    const maps = mapsReference.current.maps

    maps.event.addListener(pin, "click", function () {
      if (gateway.latitude === GMapStore.getGatewayProps()?.latitude && gateway.longitude === GMapStore.getGatewayProps()?.longitude) {
        setGatewayProps(null)
        GMapStore.storeGatewayProps(null)
      } else {
        const newGateway = {
          name: gateway.name,
          latitude: gateway.latitude,
          longitude: gateway.longitude
        }

        setDeviceProps(null)
        GMapStore.storeDeviceProps(null)

        setGatewayProps(newGateway)
        GMapStore.storeGatewayProps(newGateway)
      }
    })
  }

  const attachPinListener = (pin, icon, hoverIcon) => {
    const maps = mapsReference.current.maps

    maps.event.addListener(pin, "mouseover", function () {
      pin.setIcon({
        url: hoverIcon,
        scaledSize: new maps.Size(16, 16),
        origin: new maps.Point(0, 0),
        anchor: new maps.Point(8, 8)
      })
    })

    maps.event.addListener(pin, "mouseout", function () {
      pin.setIcon({
        url: icon,
        scaledSize: new maps.Size(16, 16),
        origin: new maps.Point(0, 0),
        anchor: new maps.Point(8, 8)
      })
    })
  }

  const drawGateways = (gateways) => {
    const maps = mapsReference.current?.maps
    const map = mapsReference.current?.map

    if (gateways.length > 0 && maps) {
      gateways.forEach(gateway => {
        if (gateway.coverage?.point?.x && gateway.coverage?.point?.y) {
          const marker_image = new maps.MarkerImage(
            GatewayIcon,
            new maps.Size(20, 20),
            new maps.Point(0, 0),
            new maps.Point(10, 10)
          )
          const pin = new maps.Marker({
            position: { lat: gateway.coverage.point.y, lng: gateway.coverage.point.x },
            icon: marker_image,
            zIndex: 3
          })
          pin.setMap(map)

          const newCircle = new maps.Circle({
            strokeColor: theme.colors.error[40],
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: theme.colors.error[40],
            fillOpacity: 0.2,
            map: map,
            center: { lat: gateway.coverage.point.y, lng: gateway.coverage.point.x },
            radius: gateway.coverage?.radius || GoogleMapStore.getGatewayRadiusKm() * 1000,
            clickable: false
          })

          GoogleMapStore.storeGatewayReference(gateway, pin, newCircle)
          onClickGateway(pin, gateway)

          hoverStatusPolygon(
            pin,
            { fillOpacity: 0.2, strokeOpacity: 0.9 },
            { fillOpacity: 0.1, strokeOpacity: 0.6 },
            newCircle
          )
        }
      })
    }
  }

  const hoverStatusPolygon = (polygon, styleOver, styleOut, objEffect = null) => {
    const maps = mapsReference.current.maps

    maps.event.addListener(polygon, "mouseover", function () {
      if (objEffect) {
        objEffect.setOptions(styleOver)
      } else {
        polygon.setOptions(styleOver)
      }
    })

    maps.event.addListener(polygon, "mouseout", function () {
      if (objEffect) {
        objEffect.setOptions(styleOut)
      } else {
        polygon.setOptions(styleOut)
      }
    })
  }

  // Função genérica que desenha os poligonos passados por parametro em um array.
  const drawPolygons = (polygons) => {
    if (polygons?.length > 0) {
      polygons.forEach(polygon => {
        if (polygon?.bounds || polygon?.polygon) {
          getNewPolygon(polygon)
        }
      })
    }
  }

  const getNewPolygon = (polygon) => {
    const map = mapsReference.current?.map
    const maps = mapsReference.current?.maps

    if (polygon.market && maps) {
      const points = GoogleMapStore.convertPointsToLatLng(polygon.bounds, maps)

      if (points?.length > 1) {
        const newPolygon = new maps.Polygon({
          paths: points,
          strokeColor: theme.colors.onPrimaryContainer,
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: theme.colors.opaqueBlue,
          fillOpacity: 0,
          zIndex: 0
        })

        if (newPolygon?.setMap) {
          newPolygon.setMap(map)
        }

        GoogleMapStore.storeMarketReference(polygon, newPolygon)
        hoverStatusPolygon(
          newPolygon,
          { fillOpacity: 0.2, strokeOpacity: 0.9 },
          { fillOpacity: 0, strokeOpacity: 0.5 }
        )

        return newPolygon
      }
      // Se tem centroid é um poligono talhão
    } else if (polygon?.hasOwnProperty("centroid") && maps) {
      const points = GoogleMapStore.convertPointsToLatLng(polygon.polygon, maps)

      if (points && points.length > 2) { // POLIGONO
        const newPolygon = new maps.Polygon({
          paths: points,
          strokeColor: theme.colors.primary[40],
          strokeOpacity: 0.6,
          strokeWeight: 2,
          fillColor: theme.colors.primaryContainer,
          fillOpacity: 0.25,
          zIndex: 2
        })

        if (newPolygon?.setMap) {
          newPolygon.setMap(map)
        }

        GoogleMapStore.storeEnvironmentReference(polygon, newPolygon)
        hoverStatusPolygon(
          newPolygon,
          { fillOpacity: 0.45, strokeOpacity: 0.9 },
          { fillOpacity: 0.25, strokeOpacity: 0.6 }
        )

        return newPolygon
      } else if (points && points.length === 2) { // CIRCULO
        const rad = maps.geometry.spherical.computeDistanceBetween(points[0], points[1]) / 2
        const newPolygon = new maps.Circle({
          strokeColor: theme.colors.primary[40],
          strokeOpacity: 0.6,
          strokeWeight: 2,
          fillColor: theme.colors.primaryContainer,
          fillOpacity: 0.25,
          map: mapsReference.current.map,
          center: GoogleMapStore.getCenterCircle(points),
          radius: rad,
          zIndex: 2
        })

        if (newPolygon?.setMap) {
          newPolygon.setMap(map)
        }

        GoogleMapStore.storePolygonReference(polygon, newPolygon)
        hoverStatusPolygon(
          newPolygon,
          { fillOpacity: 0.45, strokeOpacity: 0.9 },
          { fillOpacity: 0.25, strokeOpacity: 0.6 }
        )

        return newPolygon
      }

      // Se tem a flag isEnvironment é o poligono de ambiente (nós garantimos isso na implementação, não vem do back)
    } else if (polygon?.isEnvironment && maps) {
      const newPolygon = new maps.Polygon({
        paths: GoogleMapStore.convertPointsToLatLng(polygon.polygon, maps),
        strokeColor: theme.colors.primaryContainer,
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: theme.colors.primaryContainer,
        fillOpacity: 0.05,
        zIndex: 1
      })

      if (newPolygon?.setMap) {
        newPolygon.setMap(map)
      }

      GoogleMapStore.storePolygonReference(polygon, newPolygon)
      hoverStatusPolygon(
        newPolygon,
        { fillOpacity: 0.15, strokeOpacity: 0.9 },
        { fillOpacity: 0.05, strokeOpacity: 0.6 }
      )

      return newPolygon
      // Se tem placemarks, é uma área
    } else if (polygon?.hasOwnProperty("placemarks") && maps) {
      const newPolygon = new maps.Polygon({
        paths: GoogleMapStore.convertPointsToLatLng(polygon.polygon, maps),
        strokeColor: theme.colors.onPrimaryContainer,
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: theme.colors.onResting,
        fillOpacity: 0.2,
        zIndex: 0
      })

      if (newPolygon?.setMap) {
        newPolygon.setMap(map)
      }

      GoogleMapStore.storeAreaReference(polygon, newPolygon)
      hoverStatusPolygon(
        newPolygon,
        { fillOpacity: 0.6, strokeOpacity: 0.9 },
        { fillOpacity: 0.2, strokeOpacity: 0.5 }
      )

      return newPolygon
    }
  }

  //Função invocada pelo Google Maps quando ele terminar de carregar todas as dependências.
  const handleApiLoaded = (map, maps) => {
    mapsReference.current = { map, maps }
    setApiLoaded(true)
    /*  fitBounds(google.maps.LatLngBounds[, padding]) */
  }

  //Função que retorna como o mapa vai ser iniciado, as opções dizem se vai ou não ter controle de zoom, fullScreen, se
  //o mapa vai ser com imagem sattelite ou apenas ruas e lotes.
  const mapOptionsCreator = (map) => {
    return {
      disableDefaultUI: true,
      mapTypeId: map.MapTypeId.HYBRID,
      mapId: "DEMO_MAP_ID"
    }
  }

  const handleOpenDrawerMap = () => {
    if (isFullscreen) {
      GoogleMapStore.emit("DrawerButton_click", "FullScreenDrawerClick")
    } else {
      GoogleMapStore.emit("DrawerButton_click", "DrawerClick")
    }
  }

  const AdvancedMapButtonDrawer = () => {
    return (
      <Grid id="AdvancedMapButtonDrawer">
        <Button
          className={classes.buttonDrawer}
          onClick={handleOpenDrawerMap}
        >
          PAINEL ADMINISTRATIVO
        </Button>
      </Grid>
    )
  }

  const AdvancedMapControlsZoom = () => {
    return (
      <ButtonGroup
        id="AdvancedMapControlsZoom"
        orientation="vertical"
        variant="contained"
        size="medium"
        className={classes.zoomControls}
      >
        <IconButton id="AdvancedMapControlsZoomIn">
          <ZoomInIcon className={classes.controlIcons} />
        </IconButton>
        <IconButton id="AdvancedMapControlsZoomOut">
          <ZoomOutIcon className={classes.controlIcons} />
        </IconButton>
      </ButtonGroup>
    )
  }

  const AdvancedMapControlsFullscreen = () => {
    return (
      <ButtonGroup
        id="AdvancedMapControlsFullscreen"
        orientation="vertical"
        variant="text"
        size="medium"
        className={classes.fullscreenControls}
      >
        <IconButton className={classes.controlIconsButon} id="AdvancedMapControlsFullscreenButton">
          {
            isFullscreen
              ? <FullscreenExitIcon className={classes.controlIcons} />
              : <FullscreenIcon className={classes.controlIcons} />
          }
        </IconButton>
      </ButtonGroup>
    )
  }

  const attachAdvancedMapControls = () => {
    let map = mapsReference.current.map
    let maps = mapsReference.current.maps

    //Insere os componentes de zoomIn e ZoomOut personalizados
    const fullscreenControl = document.getElementById("AdvancedMapControlsFullscreen")
    map.controls[maps.ControlPosition.TOP_RIGHT].push(fullscreenControl)
    const zoomControl = document.getElementById("AdvancedMapControlsZoom")
    map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(zoomControl)
    const buttonOpenDrawer = document.getElementById("AdvancedMapButtonDrawer")
    map.controls[maps.ControlPosition.TOP_LEFT].push(buttonOpenDrawer)

    const fullscreenButton = document.getElementById("AdvancedMapControlsFullscreenButton")
    const elementToSendFullscreen = document.body
    const rootComponent = document.getElementById("root")
    const mapsContainerRootChild = document.getElementById("mapsContainerRootChild")
    const headerMenuBar = document.getElementById("headerMenuBar")

    //Vincula no onClick desses elementos as funções para dar zoom no google maps, e maximizar a tela
    document.getElementById("AdvancedMapControlsZoomIn").addEventListener("click", function () {
      map.setZoom(map.getZoom() + 1)
    })
    document.getElementById("AdvancedMapControlsZoomOut").addEventListener("click", function () {
      map.setZoom(map.getZoom() - 1)
    })

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        // Aqui você pode colocar a ação que deseja executar
        GoogleMapStore.emit("closeDrawer", "closeDrawer")

      }
    })

    // Utilizado para executar Button para fullScreen custom

    fullscreenButton.addEventListener("click", function () {
      if (GoogleMapStore.isFullscreen(elementToSendFullscreen)) {
        headerMenuBar.style.display = "block"
        mapsContainerRootChild.style.height = "calc(100vh - 64px)"
        rootComponent.style.gap = "64px"

        GoogleMapStore.emit("closeDrawer", "closeDrawer")

        GoogleMapStore.exitFullscreen()

        setIsFullscreen(false)
      } else {
        rootComponent.style.gap = "0"
        mapsContainerRootChild.style.height = "calc(100vh)"
        headerMenuBar.style.display = "none"
        GoogleMapStore.emit("closeDrawer", "closeDrawer")

        GoogleMapStore.requestFullscreen(elementToSendFullscreen)
        setIsFullscreen(true)
      }
    })

    // Adicionando um ouvinte de evento para detectar a tecla "Esc"
    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {
        // Verificar se o navegador está em modo de tela cheia
        // Reverter as alterações de estilo
        headerMenuBar.style.display = "block"
        mapsContainerRootChild.style.height = "calc(100vh - 64px)"
        rootComponent.style.gap = "64px"
      }
    })

    doc.onwebkitfullscreenchange =
      doc.onmsfullscreenchange =
      doc.onmozfullscreenchange =
      doc.onfullscreenchange =
      function () {
        if (GoogleMapStore.isFullscreen(elementToSendFullscreen)) {
          fullscreenButton.classList.add("is-fullscreen")
        } else {
          fullscreenButton.classList.remove("is-fullscreen")
        }
      }
  }

  return (
    <>
      <Grid id="mapsContainerRootChild" className={classes.googleMapsContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{
            libraries: ["visualization", "geometry", "marker"],
            key: LocalConfig.googleMapsTokenDev,
          }}
          yesIWantToUseGoogleMapApiInternals={true}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          /*  center={defaultProps.center} */
          options={mapOptionsCreator}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {/* Renderização dos cards para os coletores */}
          {deviceProps &&
            <InfoCard
              style={{ transform: `translate(-50%, 20%)` }}
              lat={deviceProps.latitude}
              lng={deviceProps.longitude}
              name={deviceProps.tag}
            />
          }
          {/* Renderização dos cards para os gateways */}
          {gatewayProps &&
            <InfoCard
              style={{ transform: `translate(-50%, 20%)` }}
              lat={gatewayProps.latitude}
              lng={gatewayProps.longitude}
              name={gatewayProps.name}
            />
          }
        </GoogleMapReact>

        {props.advancedMapControls &&
          AdvancedMapControlsZoom()
        }
        {props.advancedMapControls &&
          AdvancedMapControlsFullscreen()
        }
        {props.advancedMapControls &&
          AdvancedMapButtonDrawer()
        }
      </Grid>
    </>
  )
}

GoogleMaps.propTypes = {
  environment: PropTypes.object.isRequired,
  environmentBounds: PropTypes.array,
  devices: PropTypes.array,
  areas: PropTypes.array,
  polygons: PropTypes.array,
  gateways: PropTypes.array,
  advancedMapControls: PropTypes.bool,
  disableDefaultControls: PropTypes.bool,
}

export default GoogleMaps