import { useEffect, useMemo, useState } from "react"

import PropTypes from "prop-types"

import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, FormControlLabel, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import TabPanel from "../../../../../Common/TabPanel"
import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/PropertiesTabPanels"
import CustomCheckBox from "../../../../../Common/Themed/ThemedCheckBox"
import theme from "../../../../../../styles/Utils/Theme"
import RowDrawerMap from "../CommonComponents/RowDrawerMap"
import Polygon from "../../../../../../img/AdvancedMapIcons/Polygon.svg?react"
import PredizaIcon from "../../../../../../img/AdvancedMapIcons/PredizaIcon.svg?react"
import GMapStore from "../../../../../../stores/GoogleMapStore"


function PropertiesTabPanels(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)
  const [checkboxesEnvironments, setCheckboxesEnvironments] = useState(null)
  const [checkboxesNode, setCheckboxesNode] = useState(null)
  // const [checkboxesMiddle, setCheckboxesMiddle] = useState(null)

  const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const displayedOptions = useMemo(() => {
    const environments = []

    props.markets.forEach(market => {
      environments.push(...market["environments"].filter(environment =>
        typeof environment.name === "string" && containsText(environment.name, props.searchText)
      ))
    })

    return environments

    // return props.environmentsList.filter((market) => {
    //   // Verifica se algum ambiente corresponde ao texto de pesquisa
    //   const hasMatchingEnvironment = market.environments.some(environment => {
    //     return (
    //       containsText(environment.name, props.searchText) ||
    //       containsText(environment.size.toString(), props.searchText) ||
    //       containsText(environment.crop, props.searchText)
    //     )
    //   })

    //   // Retorna verdadeiro se algum ambiente corresponder ao texto de pesquisa
    //   return hasMatchingEnvironment
    // })
  }, [props.searchText, props.markets])

  useEffect(() => {
    fillCheckboxesEnvironments()
  }, [])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    if (checkboxesNode) {
      console.log(checkboxesNode)
    }
  }, [checkboxesNode])

  useEffect(() => {
    if (checkboxesEnvironments) {
      console.log(checkboxesEnvironments);

      const statusNodes = {}

      Object.keys(GMapStore.getCheckboxEnvironments()).forEach(node => {
        const checkNode = !Object.values(GMapStore.getCheckboxEnvironments()[node]).some(environmentCheck => !environmentCheck)

        statusNodes[node] = checkNode
      })

      setCheckboxesNode(statusNodes)

      const environmentsObj = GMapStore.getEnvironmentReferences().map(environment => {
        return {
          ...environment.object,
          visible: checkboxesEnvironments[environment.object.objectid]
        }
      })

      GMapStore.emit("environments_update", environmentsObj)
    }
  }, [checkboxesEnvironments])

  // const separateEnvironmentsByCropAndSize = (marketsData) => {
  //   const environmentsByCropAndSize = {}

  //   marketsData.forEach(market => {
  //     if (!market.environments) return
  //     console.log(market);

  //     market.environments.forEach(environment => {
  //       const crop = environment.crop.toLowerCase()
  //       const size = environment.size

  //       if (!environmentsByCropAndSize.hasOwnProperty(crop)) {
  //         environmentsByCropAndSize[crop] = {
  //           "group1": [],
  //           "group2": [],
  //           "group3": [],
  //           "group4": []
  //         }
  //       }

  //       if (size <= 51000) {
  //         environmentsByCropAndSize[crop]["group1"].push(environment)
  //       } else if (size <= 100000) {
  //         environmentsByCropAndSize[crop]["group2"].push(environment)
  //       } else if (size <= 150000) {
  //         environmentsByCropAndSize[crop]["group3"].push(environment)
  //       } else {
  //         environmentsByCropAndSize[crop]["group4"].push(environment)
  //       }
  //     })
  //   })

  //   return environmentsByCropAndSize
  // }

  const fillCheckboxesEnvironments = () => {
    let environmentsCheck: Record<string, any> = {}

    Object.values(GMapStore.getCheckboxEnvironments()).forEach(environments => {
      if (environments && typeof environments === "object") {
        environmentsCheck = { ...environmentsCheck, ...environments }
      }
    })

    setCheckboxesEnvironments(environmentsCheck)
  }

  const handleChangeCheckboxEnvironments = (event) => {
    const holdCheckboxesEnvironments = { ...checkboxesEnvironments, [event.target.name]: event.target.checked }
    const newCheckboxEnvironments = {}

    Object.keys(GMapStore.getCheckboxEnvironments()).forEach((node, indexNode) => {
      Object.keys(GMapStore.getCheckboxEnvironments()[node]).forEach((environment, indexEnvironment) => {
        newCheckboxEnvironments[node] = {
          ...newCheckboxEnvironments[node],
          [environment]: holdCheckboxesEnvironments[Object.keys(Object.values(GMapStore.getCheckboxEnvironments())[indexNode])[indexEnvironment]]
        }
      })
    })

    setCheckboxesEnvironments(holdCheckboxesEnvironments)
    GMapStore.storeCheckboxEnvironments(newCheckboxEnvironments)
  }

  const handleChangeCheckboxNode = (event) => {
    const newCheckboxesEnvironments = { ...checkboxesEnvironments }
    const storeCheckboxEnvironments = { ...GMapStore.getCheckboxEnvironments() }

    Object.keys(storeCheckboxEnvironments[event.target.name]).forEach(environment => {
      if (storeCheckboxEnvironments[event.target.name][environment] !== event.target.checked) {
        storeCheckboxEnvironments[event.target.name][environment] = event.target.checked
        newCheckboxesEnvironments[environment] = event.target.checked
      }
    })

    GMapStore.storeCheckboxEnvironments(storeCheckboxEnvironments)
    setCheckboxesEnvironments(newCheckboxesEnvironments)
  }

  const separateEnvironments = (environmentsData) => {
    const environmentsByGroup = {
      group1: null,
      group2: null,
      group3: null,
      group4: null
    }

    environmentsData.forEach(environment => {
      const group = GMapStore.selectGroupByEnvironment(environment.area)

      if (!environmentsByGroup[group]) {
        environmentsByGroup[group] = []
      }

      environmentsByGroup[group].push(environment)
    })

    return environmentsByGroup
  }

  const handleStateEnvironment = (environment) => {
    props.handleStateDrawer("propertiesDetails", environment)
    GMapStore.emit("googleMaps_center", environment.polygon)
  }

  const labelEnvironmentCheckbox = (group, quantity) => {
    let label = ""

    if (group === "group1") {
      label = "1 a 50"
    } else if (group === "group2") {
      label = "51 a 100"
    } else if (group === "group3") {
      label = "101 ou +"
    } else if (group === "group4") {
      label = "indefinido"
    }

    label += ` (${quantity})`

    return label
  }

  const renderEnvironmentsBySize = () => {
    if (displayedOptions.length === 0) {
      return (
        <Grid className={classes.loadRoot}>
          <CircularProgress />
        </Grid>
      )
    }

    const environmentsSeparatedBySize = separateEnvironments(displayedOptions)
    console.log(environmentsSeparatedBySize);

    return Object.entries(environmentsSeparatedBySize).map(([group, environments]) => (
      environments?.length > 0 &&
      <Grid key={group} className={classes.root}>
        {checkboxesNode && GMapStore.getCheckboxEnvironments()[group] &&
          <Accordion defaultExpanded className={classes.panelMuiAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              {checkboxesNode[group] !== undefined &&
                <FormControlLabel
                  aria-label="Environments"
                  onClick={event => event.stopPropagation()}
                  onFocus={event => event.stopPropagation()}
                  control={
                    <>
                      <CustomCheckBox
                        checked={checkboxesNode[group]}
                        onChange={handleChangeCheckboxNode}
                        name={group}
                      />
                      <Grid sx={{ mr: "6px", mt: "6px" }}>
                        <Polygon />
                      </Grid>
                    </>
                  }
                  className={classes.titleCardDrawer}
                  label={labelEnvironmentCheckbox(group, environments.length)}
                />
              }
            </AccordionSummary>
            <AccordionDetails>
              <Grid className={classes.listEnvironment}>
                {environments.map((environment, index) => (
                  <Grid key={index}>
                    <Typography component="div">
                      <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                        <RowDrawerMap
                          key={index}
                          classStyle={classes.titleCardDrawer}
                          checkBox={<CustomCheckBox
                            checked={checkboxesEnvironments[environment.objectid]}
                            onChange={handleChangeCheckboxEnvironments}
                            name={environment.objectid}
                          />}
                          svg={<PredizaIcon />}
                          title={environment.name}
                          click={() => handleStateEnvironment(environment)}
                        />
                      </Box>
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        }
      </Grid>
    ))
  }

  // const renderEnvironmentsBySizeAndCrop = () => {
  //   if (displayedOptions.length === 0) {
  //     return (
  //       <Grid className={classes.loadRoot}>
  //         <CircularProgress />
  //       </Grid>
  //     )
  //   }

  //   const environmentsSeparatedByCropAndSize = separateEnvironments(displayedOptions)

  //   return Object.entries(environmentsSeparatedByCropAndSize).map(([group, crops]) => (
  //     Object.values(crops).reduce((acc, curr) => acc + curr.length, 0) > 0 &&
  //     <Grid key={group} className={classes.root}>
  //       <Accordion defaultExpanded className={classes.panelMuiAccordion}>
  //         <AccordionSummary
  //           expandIcon={<ExpandMoreIcon />}
  //           aria-label="Expand"
  //           aria-controls="additional-actions1-content"
  //           id="additional-actions1-header"
  //         >
  //           <Typography className={classes.titleCardDrawer}>
  //             <CustomCheckBox />
  //             {group === "group1" && "1 a 50 ha."}
  //             {group === "group2" && "51 a 100 ha."}
  //             {group === "group3" && "101 a 150 ha."}
  //             {group === "group4" && "151+ ha."}
  //             {" "}
  //             ({Object.values(crops).reduce((acc, curr) => acc + curr.length, 0)})
  //           </Typography>

  //         </AccordionSummary>
  //         <AccordionDetails>
  //           {Object.entries(crops).map(([crop, environments]) => (
  //             environments.length > 0 && (
  //               <Box key={crop} bg={theme.colors.background} component="ul" style={{ listStyle: "none" }}>
  //                 <Box component="li">
  //                   <Typography style={{ textTransform: "capitalize" }} variant="subtitle1">
  //                     <RowDrawerMap
  //                       checkBox={<CustomCheckBox />}
  //                       svg={<Polygon />}
  //                       title={crop}
  //                     />
  //                   </Typography>
  //                   <Grid className={classes.listEnvironment}>
  //                     {environments.map(environment => (
  //                       <Box bg={theme.colors.background} component="ul" key={environment.name}>
  //                         <RowDrawerMap
  //                           checkBox={<CustomCheckBox />}
  //                           svg={<PredizaIcon />}
  //                           title={environment.name}
  //                           click={() => props.handleStateDrawer("propertiesDetails", environment)}
  //                         />
  //                       </Box>
  //                     ))}
  //                   </Grid>
  //                 </Box>
  //               </Box>
  //             )
  //           ))}
  //         </AccordionDetails>
  //       </Accordion>
  //     </Grid>
  //   ))
  // }

  // Função para separar os environments por crop e por tamanho
  // const renderEnvironmentsByCropAndSize = () => {
  //   if (displayedOptions.length === 0) {
  //     return (
  //       <Grid className={classes.loadRoot}>
  //         <CircularProgress />
  //       </Grid>
  //     )
  //   }

  //   const environmentsSeparatedByCropAndSize = separateEnvironmentsByCropAndSize(displayedOptions)

  //   return Object.entries(environmentsSeparatedByCropAndSize).map(([crop, groups]) => (
  //     <Grid key={crop} className={classes.root}>
  //       <Accordion defaultExpanded className={classes.panelMuiAccordion}>
  //         <AccordionSummary
  //           expandIcon={<ExpandMoreIcon />}
  //           aria-label="Expand"
  //           aria-controls="additional-actions1-content"
  //           id="additional-actions1-header"
  //         >
  //           <Typography style={{ textTransform: "capitalize" }} className={classes.titleCardDrawer}>
  //             <CustomCheckBox />
  //             {crop}
  //             {" "}
  //             ({Object.values(groups).reduce((acc, curr) => acc + curr.length, 0)})
  //           </Typography>
  //         </AccordionSummary>
  //         <AccordionDetails>
  //           <Box bg={theme.colors.background} component="ul">
  //             {Object.entries(groups).map(([group, environments]) => (
  //               // Adiciona verificação para renderizar somente grupos não vazios

  //               environments.length > 0 && (
  //                 <Grid key={group}>
  //                   {group === "group1" && (
  //                     <Typography variant="subtitle1">
  //                       <RowDrawerMap
  //                         checkBox={<CustomCheckBox />}
  //                         svg={<Polygon />}
  //                         title={"1 a 51 ha."}
  //                       />
  //                     </Typography>
  //                   )}
  //                   {group === "group2" && (
  //                     <Typography variant="subtitle1">
  //                       <RowDrawerMap
  //                         checkBox={<CustomCheckBox />}
  //                         svg={<Polygon />}
  //                         title={"101 a 150 ha."}
  //                       />
  //                     </Typography>
  //                   )}
  //                   {group === "group3" && (
  //                     <Typography variant="subtitle1">
  //                       <RowDrawerMap
  //                         checkBox={<CustomCheckBox />}
  //                         svg={<Polygon />}
  //                         title={"101 a 150 ha."}
  //                       />
  //                     </Typography>
  //                   )}
  //                   {group === "group4" && (
  //                     <Typography variant="subtitle1">
  //                       <RowDrawerMap
  //                         checkBox={<CustomCheckBox />}
  //                         svg={<Polygon />}
  //                         title={"Maior que 151 ha."}
  //                       />
  //                     </Typography>
  //                   )}
  //                   <Grid className={classes.listEnvironment}>
  //                     {environments.map(environment => (
  //                       <Box key={environment.name} bg={theme.colors.background} component="ul">
  //                         <RowDrawerMap
  //                           checkBox={<CustomCheckBox />}
  //                           svg={<PredizaIcon />}
  //                           title={environment.name}
  //                           click={() => props.handleStateDrawer("propertiesDetails", environment)}
  //                         />
  //                       </Box>
  //                     ))}
  //                   </Grid>
  //                 </Grid>
  //               )
  //             ))}
  //           </Box>
  //         </AccordionDetails>
  //       </Accordion>
  //     </Grid>
  //   ))
  // }



  return (
    <>
      <TabPanel className={classes.rootMui} value={value} index={0}>
        {renderEnvironmentsBySize()}
      </TabPanel>
      {/* <TabPanel className={classes.rootMui} value={value} index={1}>
        {renderEnvironmentsByCropAndSize()}
      </TabPanel> */}
    </>
  )
}

PropertiesTabPanels.propTypes = {
  value: PropTypes.number,
  searchText: PropTypes.string,
  handleStateDrawer: PropTypes.func,
  markets: PropTypes.array,
  // environmentsList: PropTypes.array,
}

export default PropertiesTabPanels