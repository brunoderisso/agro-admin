import { useEffect, useMemo, useState } from "react"

import PropTypes from "prop-types"

import { Accordion, AccordionDetails, AccordionSummary, Box, FormControlLabel, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import TabPanel from "../../../../../Common/TabPanel"
import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/CollectorsTabPanels"
import RowDrawerMap from "../CommonComponents/RowDrawerMap"
import CustomCheckBox from "../../../../../Common/Themed/ThemedCheckBox"
import Active from "../../../../../../img/AdvancedMapIcons/Active.svg?react"
import Inactive from "../../../../../../img/AdvancedMapIcons/Inactive.svg?react"
import Alert from "../../../../../../img/AdvancedMapIcons/Alert.svg?react"
import Collectors from "../../../../../../img/AdvancedMapIcons/Collectors.svg?react"
import GMapStore from "../../../../../../stores/GoogleMapStore"
// import PredizaIcon from "../../../../../../img/AdvancedMapIcons/PredizaIcon.svg?react"
// import toolsUtils from "../../../../../../utils/ToolsUtils"


function CollectorsTabPanels(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)
  const [checkboxesCollectors, setCheckboxesCollectors] = useState(null)
  const [checkboxesNode, setCheckboxesNode] = useState(null)
  // const [checkboxesMiddle, setCheckboxesMiddle] = useState(null)

  const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const displayedOptions = useMemo(() => {
    const collectors = []

    props.markets.forEach(market => {
      collectors.push(...market["devices"].filter(device =>
        typeof device.tag === "string" && containsText(device.tag, props.searchText)
      ))
    })

    return collectors

    // return props.markets.filter(market =>
    //   typeof market.name === 'string' && containsText(market.name, props.searchText)
    // )

    // return props.markets.filter(market => {
    //   // Verifica se o nome do mercado corresponde ao texto de pesquisa
    //   const marketNameMatches = containsText(market.name, props.searchText)

    //   // Verifica se algum dispositivo em qualquer ambiente corresponde ao texto de pesquisa
    //   const hasMatchingDevice = market.environments.some(environment =>
    //     environment.devices.some(device =>
    //       containsText(device.name, props.searchText)
    //     )
    //   )

    //   // Verifica se algum ambiente corresponde ao texto de pesquisa
    //   const hasMatchingEnvironment = market.environments.some(environment =>
    //     containsText(environment.name, props.searchText)
    //   )

    //   // Retorna verdadeiro se o nome do mercado, algum ambiente ou algum dispositivo corresponder ao texto de pesquisa
    //   return marketNameMatches || hasMatchingEnvironment || hasMatchingDevice
    // })
  }, [props.searchText, props.markets])

  useEffect(() => {
    fillCheckboxesDevices()
  }, [])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    if (checkboxesCollectors) {
      const statusNodes = {}

      Object.keys(GMapStore.getCheckboxDevices()).forEach(node => {
        const checkNode = !Object.values(GMapStore.getCheckboxDevices()[node]).some(deviceCheck => !deviceCheck)

        statusNodes[node] = checkNode
      })

      setCheckboxesNode(statusNodes)

      const devicesObj = GMapStore.getDeviceReferences().map((device, index) => {
        return {
          ...device.object,
          visible: checkboxesCollectors[GMapStore.getDeviceReferences()[index].object.tag]
        }
      })

      GMapStore.emit("devices_update", devicesObj)
    }
  }, [checkboxesCollectors])

  const handleChangeCheckboxCollector = (event) => {
    const holdCheckboxesCollectors = { ...checkboxesCollectors, [event.target.name]: event.target.checked }
    const newCheckboxCollectors = {}

    Object.keys(GMapStore.getCheckboxDevices()).forEach((node, indexNode) => {
      Object.keys(GMapStore.getCheckboxDevices()[node]).forEach((device, indexDevice) => {
        newCheckboxCollectors[node] = {
          ...newCheckboxCollectors[node],
          [device]: holdCheckboxesCollectors[Object.keys(Object.values(GMapStore.getCheckboxDevices())[indexNode])[indexDevice]]
        }
      })
    })

    setCheckboxesCollectors(holdCheckboxesCollectors)
    GMapStore.storeCheckboxDevices(newCheckboxCollectors)
  }

  const handleChangeCheckboxNode = (event) => {
    const newCheckboxesCollectors = { ...checkboxesCollectors }
    const storeCheckboxCollectors = { ...GMapStore.getCheckboxDevices() }

    Object.keys(storeCheckboxCollectors[event.target.name]).forEach(collector => {
      if (storeCheckboxCollectors[event.target.name][collector] !== event.target.checked) {
        storeCheckboxCollectors[event.target.name][collector] = event.target.checked
        newCheckboxesCollectors[collector] = event.target.checked
      }
    })

    GMapStore.storeCheckboxDevices(storeCheckboxCollectors)
    setCheckboxesCollectors(newCheckboxesCollectors)
  }

  const fillCheckboxesDevices = () => {
    let devicesCheck: Record<string, any> = {}

    Object.values(GMapStore.getCheckboxDevices()).forEach(devices => {
      if (devices && typeof devices === "object") {
        devicesCheck = { ...devicesCheck, ...devices }
      }
    })

    setCheckboxesCollectors(devicesCheck)
  }

  const handleCenterMap = (device) => {
    GMapStore.emit("googleMaps_center", [[device.longitude, device.latitude]])
  }

  return (
    <>
      {/* Status ACORDEON */}
      <TabPanel className={classes.rootMui} value={value} index={0}>
        <Grid className={classes.root}>
          {checkboxesNode && GMapStore.getCheckboxDevices()["UNKNOW"] &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="inactive-devices-content"
                id="inactive-devices-header"
              >
                {checkboxesNode["UNKNOW"] !== undefined &&
                  <FormControlLabel
                    aria-label="Collectors"
                    onClick={event => event.stopPropagation()}
                    onFocus={event => event.stopPropagation()}
                    control={
                      <>
                        <CustomCheckBox
                          checked={checkboxesNode["UNKNOW"]}
                          onChange={handleChangeCheckboxNode}
                          name={"UNKNOW"}
                        />
                        <Grid sx={{ mr: "6px", mt: "6px" }}>
                          <Inactive />
                        </Grid>
                      </>
                    }
                    className={classes.titleCardDrawer}
                    label={` INATIVOS (${displayedOptions.reduce((total, device) => total + (
                      device.status === "UNKNOW" || device.status === null
                    ), 0)})`}
                  />
                }
              </AccordionSummary>
              <AccordionDetails>
                {displayedOptions.map((device, index) => (
                  (device.status === "UNKNOW" || device.status === null) &&
                  <Grid key={index}>
                    <Typography component="div">
                      <Box component="ul">
                        <RowDrawerMap
                          key={index}
                          classStyle={classes.titleCardDrawer}
                          checkBox={<CustomCheckBox
                            checked={checkboxesCollectors[device.tag]}
                            onChange={handleChangeCheckboxCollector}
                            name={device.tag}
                          />}
                          svg={<Collectors />}
                          title={device.tag}
                          click={() => handleCenterMap(device)}
                        />
                      </Box>
                    </Typography>
                  </Grid>
                ))}
              </AccordionDetails>
            </Accordion>
          }
          {checkboxesNode && GMapStore.getCheckboxDevices()["WARNING"] &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="inactive-devices-content"
                id="inactive-devices-header"
              >
                {checkboxesNode["WARNING"] !== undefined &&
                  <FormControlLabel
                    aria-label="Collectors"
                    onClick={event => event.stopPropagation()}
                    onFocus={event => event.stopPropagation()}
                    control={
                      <>
                        <CustomCheckBox
                          checked={checkboxesNode["WARNING"]}
                          onChange={handleChangeCheckboxNode}
                          name={"WARNING"}
                        />
                        <Grid sx={{ mr: "6px", mt: "6px" }}>
                          <Alert />
                        </Grid>
                      </>
                    }
                    className={classes.titleCardDrawer}
                    label={` EM ALERTA (${displayedOptions.reduce((total, device) => total + (
                      ["WARNING", "CRITICAL"].includes(device.status)
                    ), 0)})`}
                  />
                }
              </AccordionSummary>
              <AccordionDetails>
                {displayedOptions.map((device, index) => (
                  ["WARNING", "CRITICAL"].includes(device.status) &&
                  <Grid key={index}>
                    <Typography component="div">
                      <Box component="ul">
                        <RowDrawerMap
                          key={index}
                          classStyle={classes.titleCardDrawer}
                          checkBox={<CustomCheckBox
                            checked={checkboxesCollectors[device.tag]}
                            onChange={handleChangeCheckboxCollector}
                            name={device.tag}
                          />}
                          svg={<Collectors />}
                          title={device.tag}
                          click={() => handleCenterMap(device)}
                        />
                      </Box>
                    </Typography>
                  </Grid>
                ))}
              </AccordionDetails>
            </Accordion>
          }
          {checkboxesNode && GMapStore.getCheckboxDevices()["OK"] &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="inactive-devices-content"
                id="inactive-devices-header"
              >
                {checkboxesNode["OK"] !== undefined &&
                  <FormControlLabel
                    aria-label="Collectors"
                    onClick={event => event.stopPropagation()}
                    onFocus={event => event.stopPropagation()}
                    control={
                      <>
                        <CustomCheckBox
                          checked={checkboxesNode["OK"]}
                          onChange={handleChangeCheckboxNode}
                          name={"OK"}
                        />
                        <Grid sx={{ mr: "6px", mt: "6px" }}>
                          <Active />
                        </Grid>
                      </>
                    }
                    className={classes.titleCardDrawer}
                    label={` ATIVOS (${displayedOptions.reduce((total, device) => total + (
                      device.status === "OK"
                    ), 0)})`}
                  />
                }
              </AccordionSummary>
              <AccordionDetails>
                {displayedOptions.map((device, index) => (
                  device.status === "OK" &&
                  <Grid key={index}>
                    <Typography component="div">
                      <Box component="ul">
                        <RowDrawerMap
                          key={index}
                          classStyle={classes.titleCardDrawer}
                          checkBox={<CustomCheckBox
                            checked={checkboxesCollectors[device.tag]}
                            onChange={handleChangeCheckboxCollector}
                            name={device.tag}
                          />}
                          svg={<Collectors />}
                          title={device.tag}
                          click={() => handleCenterMap(device)}
                        />
                      </Box>
                    </Typography>
                  </Grid>
                ))}
              </AccordionDetails>
            </Accordion>
          }
        </Grid>
      </TabPanel>
      {/* Segunda fase: descomentar e corrigir */}
      {/* <TabPanel className={classes.rootMui} value={value} index={0}>
        <Grid className={classes.root}>
          <Accordion defaultExpanded className={classes.panelMuiAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="inactive-devices-content"
              id="inactive-devices-header"
              className={classes.titleCardDrawerCollectors}
            >
              <RowDrawerMap
                checkBox={<CustomCheckBox />}
                svg={<Inactive />}
                title={`INATIVOS (${displayedOptions.reduce((total, area) => total + (area.devices
                  ? area.devices.filter(device => device.status === "UNKNOW").length
                  : 0
                ), 0)})`}
              />
            </AccordionSummary>
            <AccordionDetails>
              {displayedOptions.map(area => (
                <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                  {area.devices && area.devices.map((environment) => (
                    environment.devices && environment.devices.length > 0 && (
                      <React.Fragment key={`${new Date().getTime()}_${Math.random()}`}>
                        {environment.devices.some(device => device.status === "inactive") && (
                          <Grid className={classes.envDevicesCollectors}>

                            <RowDrawerMap
                              checkBox={<CustomCheckBox />}
                              svg={<PredizaIcon />}
                              title={`${environment.name} (${environment.devices.filter(device => device.status === "inactive").length})`}
                            />
                            {environment.devices.map(device => (
                              <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                                {device.status === "inactive" && (
                                  <RowDrawerMap
                                    checkBox={<CustomCheckBox />}
                                    svg={<Collectors />}
                                    title={device.name}
                                  />
                                )}
                              </Box>
                            ))}
                          </Grid>
                        )}
                      </React.Fragment>
                    )
                  ))}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded className={classes.panelMuiAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              className={classes.titleCardDrawerCollectors}

              aria-controls="alert-devices-content"
              id="alert-devices-header"
            >
              <RowDrawerMap
                checkBox={<CustomCheckBox />}
                svg={<Alert />}
                title={`EM ALERTA (${displayedOptions.reduce((total, area) => total + (area.devices
                  ? area.devices.filter(device => ["WARNING", "CRITICAL"].includes(device.status)).length
                  : 0
                ), 0)})`}
              />
            </AccordionSummary>
            <AccordionDetails>
              {displayedOptions.map(area => (
                <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                  {area.environments && area.environments.map((environment) => (
                    environment.devices && environment.devices.length > 0 && (
                      <React.Fragment key={`${new Date().getTime()}_${Math.random()}`}>
                        {environment.devices.some(device => device.status === "alert") && (
                          <Grid className={classes.envDevicesCollectors}>
                            <RowDrawerMap
                              checkBox={<CustomCheckBox />}
                              svg={<PredizaIcon />}
                              title={`${environment.name} (${environment.devices.filter(device => device.status === "alert").length})`}
                            />
                            {environment.devices.map(device => (
                              <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                                {device.status === "alert" && (
                                  <RowDrawerMap
                                    checkBox={<CustomCheckBox />}
                                    svg={<Collectors />}
                                    title={device.name}
                                  />
                                )}
                              </Box>
                            ))}
                          </Grid>
                        )}
                      </React.Fragment>
                    )
                  ))}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded className={classes.panelMuiAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              className={classes.titleCardDrawerCollectors}
              aria-controls="active-devices-content"
              id="active-devices-header"
            >
              <RowDrawerMap
                checkBox={<CustomCheckBox />}
                svg={<Active />}
                title={`ATIVOS (${displayedOptions.reduce((total, area) => total + (area.devices
                  ? area.devices.filter(device => device.status === "OK").length
                  : 0
                ), 0)})`}
              />
            </AccordionSummary>
            <AccordionDetails>
              {displayedOptions.map(area => (
                <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                  {area.environments && area.environments.map((environment) => (
                    environment.devices && environment.devices.length > 0 && (
                      <React.Fragment key={`${new Date().getTime()}_${Math.random()}`}>
                        {environment.devices.some(device => device.status === "active") && (
                          <Grid className={classes.envDevicesCollectors}>
                            <RowDrawerMap
                              checkBox={<CustomCheckBox />}
                              svg={<PredizaIcon />}
                              title={`${environment.name} (${environment.devices.filter(device => device.status === "active").length})`}
                            />
                            {environment.devices.map(device => (
                              <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                                {device.status === "active" && (
                                  <RowDrawerMap
                                    checkBox={<CustomCheckBox />}
                                    svg={<Collectors />}
                                    title={device.name}
                                  />
                                )}
                              </Box>
                            ))}
                          </Grid>
                        )}
                      </React.Fragment>
                    )
                  ))}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </TabPanel> */}
      {/* Propriedade ACORDEON */}
      {/* <TabPanel className={classes.rootMui} value={value} index={1}>
        {displayedOptions.map(area => (
          area.environments && area.environments.map(environment => (
            environment.devices && environment.devices.length > 0 && (
              <Accordion key={`${new Date().getTime()}_${Math.random()}`} defaultExpanded className={classes.panelMuiAccordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.titleCardDrawerCollectors}
                  aria-label="Expand"
                  aria-controls="alert-devices-content"
                  id="alert-devices-header"
                >
                  <RowDrawerMap
                    checkBox={<CustomCheckBox />}
                    svg={<PredizaIcon />}
                    title={environment.name}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  {environment.devices.some(device => device.status === "inactive") && (
                    <Box bgcolor={theme.colors.background} component="ul">
                      <React.Fragment key={`${new Date().getTime()}_${Math.random()}`}>
                        <Grid className={classes.envDevicesCollectors}>
                          <RowDrawerMap
                            checkBox={<CustomCheckBox />}
                            svg={<Inactive />}
                            title={`Inativos (${environment.devices.length})`}
                          />
                          {environment.devices.map(device => (
                            <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                              {device.status === "inactive" && (
                                <RowDrawerMap
                                  checkBox={<CustomCheckBox />}
                                  svg={<Collectors />}
                                  title={device.name}
                                />
                              )}
                            </Box>
                          ))}
                        </Grid>
                      </React.Fragment>
                    </Box>
                  )}
                  {environment.devices.some(device => device.status === "alert") && (
                    <Box bgcolor={theme.colors.background} component="ul">
                      <React.Fragment key={`${new Date().getTime()}_${Math.random()}`}>
                        <Grid className={classes.envDevicesCollectors}>
                          <RowDrawerMap
                            checkBox={<CustomCheckBox />}
                            svg={<Alert />}
                            title={`Em alerta (${environment.devices.length})`}
                          />
                          {environment.devices.map(device => (
                            <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                              {device.status === "alert" && (
                                <RowDrawerMap
                                  checkBox={<CustomCheckBox />}
                                  svg={<Collectors />}
                                  title={device.name}
                                />
                              )}
                            </Box>
                          ))}
                        </Grid>
                      </React.Fragment>
                    </Box>
                  )}
                  {environment.devices.some(device => device.status === "active") && (
                    <Box bgcolor={theme.colors.background} component="ul">
                      <React.Fragment key={`${new Date().getTime()}_${Math.random()}`}>
                        <Grid className={classes.envDevicesCollectors}>
                          <RowDrawerMap
                            checkBox={<CustomCheckBox />}
                            svg={<Active />}
                            title={`Ativos (${environment.devices.length})`}
                          />
                          {environment.devices.map(device => (
                            <Box bgcolor={theme.colors.background} component="ul" key={`${new Date().getTime()}_${Math.random()}`}>
                              {device.status === "active" && (
                                <RowDrawerMap
                                  checkBox={<CustomCheckBox />}
                                  svg={<Collectors />}
                                  title={device.name}
                                />
                              )}
                            </Box>
                          ))}
                        </Grid>
                      </React.Fragment>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            )
          ))
        ))}
      </TabPanel> */}
    </>
  )
}

CollectorsTabPanels.propTypes = {
  value: PropTypes.number,
  markets: PropTypes.array,
  searchText: PropTypes.string
}

export default CollectorsTabPanels