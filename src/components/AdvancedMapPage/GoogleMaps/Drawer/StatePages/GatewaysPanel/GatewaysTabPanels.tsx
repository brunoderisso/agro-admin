import { useEffect, useMemo, useState } from "react"

import PropTypes from "prop-types"

import { Accordion, AccordionDetails, AccordionSummary, Box, FormControlLabel, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import TabPanel from "../../../../../Common/TabPanel"
import CustomCheckBox from "../../../../../Common/Themed/ThemedCheckBox"
import Polygon from "../../../../../../img/AdvancedMapIcons/Polygon.svg?react"
import Inactive from "../../../../../../img/AdvancedMapIcons/Inactive.svg?react"
import SignalTower from "../../../../../../img/AdvancedMapIcons/SignalTower.svg?react"
import Alert from "../../../../../../img/AdvancedMapIcons/Alert.svg?react"
import Active from "../../../../../../img/AdvancedMapIcons/Active.svg?react"
import RowDrawerMap from "../CommonComponents/RowDrawerMap"
import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/GatewaysTabPanels"
import theme from "../../../../../../styles/Utils/Theme"
import GMapStore from "../../../../../../stores/GoogleMapStore"
import toolsUtils from "../../../../../../utils/ToolsUtils"


function GatewaysTabPanels(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)
  const [checkboxesGateways, setCheckboxesGateways] = useState(null)
  const [checkboxesMiddle, setCheckboxesMiddle] = useState(null)
  const [checkboxesNode, setCheckboxesNode] = useState(null)
  const [typeGroup, setTypeGroup] = useState<string>("market")
  const [flagOkStatus, setFlagOkStatus] = useState<boolean>(true)
  const [flagWarningStatus, setFlagWarningStatus] = useState<boolean>(true)
  const [flagUnknowStatus, setFlagUnknowStatus] = useState<boolean>(true)

  const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const displayedOptions = useMemo(
    () => {
      const markets = toolsUtils.unreferenceArray(props.markets)
      let countOkStatus = 0
      let countWarningStatus = 0
      let countUnknowStatus = 0

      markets.forEach((market, index) => {
        const gateways = market["gateways"].filter(gateway =>
          typeof gateway.name === "string" && containsText(gateway.name, props.searchText)
        )

        markets[index] = market
        markets[index]["gateways"] = gateways
      })

      markets.forEach(market => {
        market["gateways"].forEach(gateway => {
          switch (gateway.status) {
            case "OK":
              countOkStatus += 1

              break
            case "WARNING":
              countWarningStatus += 1

              break
            case "CRITICAL":
              countWarningStatus += 1

              break
            case "UNKNOW":
              countUnknowStatus += 1

              break
            default:
              break
          }
        })
      })

      setFlagOkStatus(countOkStatus > 0 ? true : false)
      setFlagWarningStatus(countWarningStatus > 0 ? true : false)
      setFlagUnknowStatus(countUnknowStatus > 0 ? true : false)

      return markets
    }, [props.searchText, props.markets]
  )

  useEffect(() => {
    fillCheckboxesGateways("market")
    bind()

    return clear
  }, [])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    if (checkboxesGateways) {
      const statusNodes = {}
      let statusCheck = {}

      // Criação do objeto de check para os 'middle', para usá-lo na variável 'statusNodes': um check para cada 'middle' dos 'node'
      Object.keys(GMapStore.getCheckboxGateways()).forEach((node, indexNode) => {
        statusCheck = { ...statusCheck }

        Object.keys(Object.values(GMapStore.getCheckboxGateways())[indexNode]).forEach((middle, indexMiddle) => {
          statusCheck[node] = { ...statusCheck[node] }

          let testMiddle = false

          Object.keys(Object.values(Object.values(GMapStore.getCheckboxGateways())[indexNode])[indexMiddle]).forEach((_, indexGateway) => {
            if (!testMiddle) {
              if (!Object.values(Object.values(Object.values(GMapStore.getCheckboxGateways())[indexNode])[indexMiddle])[indexGateway]) {
                statusCheck[node][middle] = false
                testMiddle = true

                return
              }

              statusCheck[node][middle] = true
            }
          })
        })
      })

      Object.keys(GMapStore.getCheckboxGateways()).forEach(node => {
        Object.keys(GMapStore.getCheckboxGateways()[node]).forEach(middle => {
          statusNodes[node] = { ...statusNodes[node], [middle]: statusCheck[node][middle] }
        })
      })

      setCheckboxesMiddle(statusNodes)

      const gatewaysObj = GMapStore.getGatewayReference().gateways.map((gateway, index) => {
        return {
          ...gateway.object,
          visible: checkboxesGateways[GMapStore.getGatewayReference().gateways[index].object.mac]
        }
      })

      GMapStore.emit("gateways_update", gatewaysObj)
    }
  }, [checkboxesGateways])

  useEffect(() => {
    if (checkboxesMiddle) {
      const nodesName = Object.keys(checkboxesMiddle).map(node => node)
      let nodeCheckboxes = {}

      nodesName.forEach(node => {
        let testNode = false

        Object.values(checkboxesMiddle[node]).forEach(middle => {
          if (!testNode) {
            if (!middle) {
              nodeCheckboxes[node] = false
              testNode = true

              return
            }

            nodeCheckboxes[node] = true
          }
        })
      })

      setCheckboxesNode(nodeCheckboxes)
    }
  }, [checkboxesMiddle])

  const bind = () => {
    GMapStore.addListener("checkboxGateways_update", fillCheckboxesGateways)
  }

  const clear = () => {
    GMapStore.removeListener("checkboxGateways_update", fillCheckboxesGateways)
  }

  const fillCheckboxesGateways = (type) => {
    setTypeGroup(type)
    GMapStore.storeTypeGroupGateways(type)

    let gatewaysCheck = {}

    Object.values(GMapStore.getCheckboxGateways()).forEach(object => {
      Object.values(object).forEach(gateways => {
        gatewaysCheck = { ...gatewaysCheck, ...gateways }
      })
    })

    setCheckboxesGateways(gatewaysCheck)
  }

  const handleCenterMap = (gateway) => {
    GMapStore.emit("googleMaps_center", [[gateway.coverage.point.x, gateway.coverage.point.y]])
  }

  const handleChangeCheckboxGateway = (event) => {
    const holdCheckboxesGateways = { ...checkboxesGateways, [event.target.name]: event.target.checked }
    const newCheckboxGateways = {}

    Object.keys(GMapStore.getCheckboxGateways()).forEach((node, indexNode) => {
      Object.keys(Object.values(GMapStore.getCheckboxGateways())[indexNode]).forEach((middle, indexMiddle) => {
        newCheckboxGateways[node] = { ...newCheckboxGateways[node] }

        Object.keys(Object.values(Object.values(GMapStore.getCheckboxGateways())[indexNode])[indexMiddle]).forEach((gateway, indexGateway) => {
          newCheckboxGateways[node][middle] = {
            ...newCheckboxGateways[node][middle],
            [gateway]: holdCheckboxesGateways[Object.keys(Object.values(Object.values(
              GMapStore.getCheckboxGateways()
            )[indexNode])[indexMiddle])[indexGateway]] // Pega o valor do checked do respectivo gateway
          }
        })
      })
    })

    GMapStore.storeCheckboxGateways(newCheckboxGateways)
    setCheckboxesGateways(holdCheckboxesGateways)
  }

  const handleChangeCheckboxMiddle = (event, node) => {
    // Atualiza o checkboxesGateways e a store deles, a atualização dos checkboxes dos 'middle' e 'node' são desencadeados
    // pelos useEffects do 'checkboxesGateways' e 'checkboxesMiddle'
    const newCheckboxesGateways = { ...checkboxesGateways }
    const storeCheckboxGateways = { ...GMapStore.getCheckboxGateways() }

    Object.keys(storeCheckboxGateways[node][event.target.name]).forEach(gateway => {
      if (storeCheckboxGateways[node][event.target.name][gateway] !== event.target.checked) {
        storeCheckboxGateways[node][event.target.name][gateway] = event.target.checked
        newCheckboxesGateways[gateway] = event.target.checked
      }
    })

    GMapStore.storeCheckboxGateways(storeCheckboxGateways)
    setCheckboxesGateways(newCheckboxesGateways)
  }

  const handleChangeCheckboxNode = (event) => {
    // Atualiza o checkboxesGateways e a store deles, a atualização dos checkboxes dos 'middle' e 'node' são desencadeados
    // pelos useEffects do 'checkboxesGateways' e 'checkboxesMiddle'
    const newCheckboxesGateways = { ...checkboxesGateways }
    const storeCheckboxGateways = { ...GMapStore.getCheckboxGateways() }

    Object.keys(storeCheckboxGateways[event.target.name]).forEach(middle => {
      Object.keys(storeCheckboxGateways[event.target.name][middle]).forEach(gateway => {
        if (storeCheckboxGateways[event.target.name][middle][gateway] !== event.target.checked) {
          storeCheckboxGateways[event.target.name][middle][gateway] = event.target.checked
          newCheckboxesGateways[gateway] = event.target.checked
        }
      })
    })

    GMapStore.storeCheckboxGateways(storeCheckboxGateways)
    setCheckboxesGateways(newCheckboxesGateways)
  }

  return (
    <>
      <TabPanel className={classes.rootMui} value={value} index={0}>
        {/* Mercado ACORDEON */}
        <Grid className={classes.root}>
          {checkboxesNode && checkboxesMiddle && displayedOptions.map((area, i) => (
            area.gateways.length > 0 && checkboxesMiddle[area.name] &&
            <Accordion defaultExpanded key={i} className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                {checkboxesNode[area.name] !== undefined &&
                  <FormControlLabel
                    aria-label="Gateways"
                    onClick={event => event.stopPropagation()}
                    onFocus={event => event.stopPropagation()}
                    control={
                      <>
                        <CustomCheckBox
                          checked={checkboxesNode[area.name]}
                          onChange={handleChangeCheckboxNode}
                          name={area.name}
                        />
                        <Grid sx={{ mr: "6px", mt: "6px" }}>
                          <Polygon />
                        </Grid>
                      </>
                    }
                    className={classes.titleCardDrawer}
                    label={` ${area.name} (${area.gateways.length})`}
                  />
                }
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="div">
                  <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                    <Typography component="li" color="textSecondary" style={{ listStyle: "none" }}>
                      {/* INATIVOS */}
                      {area.gateways.some(gateway => gateway.status === "UNKNOW") && (
                        <Grid>
                          <RowDrawerMap
                            key={1}
                            checkBox={<CustomCheckBox
                              checked={checkboxesMiddle[area.name]["UNKNOW"]}
                              onChange={(event) => handleChangeCheckboxMiddle(event, area.name)}
                              name={"UNKNOW"}
                            />}
                            svg={<Inactive />}
                            title={"Inativos"}
                          />
                          {area.gateways.map((gateway, index) => (
                            gateway.status === "UNKNOW" &&
                            <Grid key={index}>
                              <Typography component="div">
                                <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                                  <RowDrawerMap
                                    key={index}
                                    classStyle={classes.titleCardDrawer}
                                    checkBox={<CustomCheckBox
                                      checked={checkboxesGateways[gateway.mac]}
                                      onChange={handleChangeCheckboxGateway}
                                      name={gateway.mac}
                                    />}
                                    svg={<SignalTower />}
                                    title={gateway.name}
                                    click={() => handleCenterMap(gateway)}
                                  />
                                </Box>
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                      {/* EM ALERTA */}
                      {area.gateways.some(gateway => ["WARNING", "CRITICAL"].includes(gateway.status)) && (
                        <Grid>
                          <RowDrawerMap
                            key={1}
                            checkBox={<CustomCheckBox
                              checked={checkboxesMiddle[area.name]["WARNING"]}
                              onChange={(event) => handleChangeCheckboxMiddle(event, area.name)}
                              name={"WARNING"}
                            />}
                            svg={<Alert />}
                            title={"Em alerta"}
                          />
                          {area.gateways.map((gateway, index) => (
                            ["WARNING", "CRITICAL"].includes(gateway.status) &&
                            <Grid key={index}>
                              <Typography component="div">
                                <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                                  <RowDrawerMap
                                    key={index}
                                    classStyle={classes.titleCardDrawer}
                                    checkBox={<CustomCheckBox
                                      checked={checkboxesGateways[gateway.mac]}
                                      onChange={handleChangeCheckboxGateway}
                                      name={gateway.mac}
                                    />}
                                    svg={<SignalTower />}
                                    title={gateway.name}
                                    click={() => handleCenterMap(gateway)}
                                  />
                                </Box>
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                      {/* ATIVOS */}
                      {area.gateways.some(gateway => gateway.status === "OK") && (
                        <Grid>
                          <RowDrawerMap
                            key={1}
                            checkBox={<CustomCheckBox
                              checked={checkboxesMiddle[area.name]["OK"]}
                              onChange={(event) => handleChangeCheckboxMiddle(event, area.name)}
                              name={"OK"}
                            />}
                            svg={<Active />}
                            title={"Ativos"}
                          />
                          {area.gateways.map((gateway, index) => (
                            gateway.status === "OK" &&
                            <Grid key={index}>
                              <Typography component="div">
                                <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                                  <RowDrawerMap
                                    key={index}
                                    classStyle={classes.titleCardDrawer}
                                    checkBox={<CustomCheckBox
                                      checked={checkboxesGateways[gateway.mac]}
                                      onChange={handleChangeCheckboxGateway}
                                      name={gateway.mac}
                                    />}
                                    svg={<SignalTower />}
                                    title={gateway.name}
                                    click={() => handleCenterMap(gateway)}
                                  />
                                </Box>
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Typography>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel className={classes.rootMui} value={value} index={1}>
        {/* STATUS ACORDEON */}
        <Grid className={classes.root}>
          {checkboxesNode && checkboxesMiddle && displayedOptions.length > 0 && (
            <>
              {typeGroup === "status" && flagOkStatus &&
                <Accordion defaultExpanded className={classes.panelMuiAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    <>
                      {checkboxesNode["OK"] !== undefined &&
                        <FormControlLabel
                          aria-label="Acknowledge"
                          onClick={event => event.stopPropagation()}
                          onFocus={event => event.stopPropagation()}
                          control={<CustomCheckBox
                            checked={checkboxesNode["OK"]}
                            onChange={handleChangeCheckboxNode}
                            name={"OK"}
                          />}
                          className={classes.titleCardDrawer}
                          label="ATIVOS"
                        />
                      }
                    </>
                  </AccordionSummary>
                  {checkboxesMiddle["OK"] && displayedOptions.map((area, index) => (
                    <AccordionDetails key={index}>
                      <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                        {area.gateways.some(gateway => gateway.status === "OK") && (
                          <Grid key={index}>
                            <RowDrawerMap
                              key={index}
                              checkBox={<CustomCheckBox
                                checked={checkboxesMiddle["OK"][area.name]}
                                onChange={(event) => handleChangeCheckboxMiddle(event, "OK")}
                                name={area.name}
                              />}
                              svg={<Polygon />}
                              title={area.name}
                            />
                            {area.gateways.map((gateway, i) => (
                              <Box sx={{ backgroundColor: theme.colors.background }} component="ul" key={i}>
                                {gateway.status === "OK" && (
                                  <RowDrawerMap
                                    key={i}
                                    classStyle={classes.titleCardDrawer}
                                    checkBox={<CustomCheckBox
                                      checked={checkboxesGateways[gateway.mac]}
                                      onChange={handleChangeCheckboxGateway}
                                      name={gateway.mac}
                                    />}
                                    svg={<SignalTower />}
                                    title={gateway.name}
                                    click={() => handleCenterMap(gateway)}
                                  />
                                )}
                              </Box>
                            ))}
                          </Grid>
                        )}
                      </Box>
                    </AccordionDetails>
                  ))}
                </Accordion>
              }
              {typeGroup === "status" && flagWarningStatus &&
                <Accordion defaultExpanded className={classes.panelMuiAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    <>
                      {checkboxesNode["WARNING"] !== undefined &&
                        <FormControlLabel
                          aria-label="Acknowledge"
                          onClick={event => event.stopPropagation()}
                          onFocus={event => event.stopPropagation()}
                          control={<CustomCheckBox
                            checked={checkboxesNode["WARNING"]}
                            onChange={handleChangeCheckboxNode}
                            name={"WARNING"}
                          />}
                          className={classes.titleCardDrawer}
                          label="EM ALERTA"
                        />
                      }
                    </>
                  </AccordionSummary>
                  {checkboxesMiddle["WARNING"] && displayedOptions.map((area, index) => (
                    <AccordionDetails key={index}>
                      <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                        {area.gateways.some(gateway => ["WARNING", "CRITICAL"].includes(gateway.status)) && (
                          <Grid key={index}>
                            <RowDrawerMap
                              key={index}
                              checkBox={<CustomCheckBox
                                checked={checkboxesMiddle["WARNING"][area.name]}
                                onChange={(event) => handleChangeCheckboxMiddle(event, "WARNING")}
                                name={area.name}
                              />}
                              svg={<Polygon />}
                              title={area.name}
                            />
                            {area.gateways.map((gateway, i) => (
                              <Box sx={{ backgroundColor: theme.colors.background }} component="ul" key={i}>
                                {["WARNING", "CRITICAL"].includes(gateway.status) && (
                                  <RowDrawerMap
                                    key={index}
                                    classStyle={classes.titleCardDrawer}
                                    checkBox={<CustomCheckBox
                                      checked={checkboxesGateways[gateway.mac]}
                                      onChange={handleChangeCheckboxGateway}
                                      name={gateway.mac}
                                    />}
                                    svg={<SignalTower />}
                                    title={gateway.name}
                                    click={() => handleCenterMap(gateway)}
                                  />
                                )}
                              </Box>
                            ))}
                          </Grid>
                        )}
                      </Box>
                    </AccordionDetails>
                  ))}
                </Accordion>
              }
              {typeGroup === "status" && flagUnknowStatus &&
                <Accordion defaultExpanded className={classes.panelMuiAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    <>
                      {checkboxesNode["UNKNOW"] !== undefined &&
                        <FormControlLabel
                          aria-label="Acknowledge"
                          onClick={event => event.stopPropagation()}
                          onFocus={event => event.stopPropagation()}
                          control={<CustomCheckBox
                            checked={checkboxesNode["UNKNOW"]}
                            onChange={handleChangeCheckboxNode}
                            name={"UNKNOW"}
                          />}
                          className={classes.titleCardDrawer}
                          label="INATIVOS"
                        />
                      }
                    </>
                  </AccordionSummary>
                  {checkboxesMiddle["UNKNOW"] && displayedOptions.map((area, index) => (
                    <AccordionDetails key={index}>
                      <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                        {area.gateways.some(gateway => gateway.status === "UNKNOW") && (
                          <Grid key={index}>
                            <RowDrawerMap
                              key={index}
                              checkBox={<CustomCheckBox
                                checked={checkboxesMiddle["UNKNOW"][area.name]}
                                onChange={(event) => handleChangeCheckboxMiddle(event, "UNKNOW")}
                                name={area.name}
                              />}
                              svg={<Polygon />}
                              title={area.name}
                            />
                            {area.gateways.map((gateway, i) => (
                              <Box sx={{ backgroundColor: theme.colors.background }} component="ul" key={i}>
                                {gateway.status === "UNKNOW" && (
                                  <RowDrawerMap
                                    key={i}
                                    classStyle={classes.titleCardDrawer}
                                    checkBox={<CustomCheckBox
                                      checked={checkboxesGateways[gateway.mac]}
                                      onChange={handleChangeCheckboxGateway}
                                      name={gateway.mac}
                                    />}
                                    svg={<SignalTower />}
                                    title={gateway.name}
                                    click={() => handleCenterMap(gateway)}
                                  />
                                )}
                              </Box>
                            ))}
                          </Grid>
                        )}
                      </Box>
                    </AccordionDetails>
                  ))}
                </Accordion>
              }
            </>
          )}
        </Grid>
      </TabPanel>
    </>
  )
}

GatewaysTabPanels.propTypes = {
  value: PropTypes.number,
  markets: PropTypes.array,
  searchText: PropTypes.string
}

export default GatewaysTabPanels