import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  List,
  Typography
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanFeaturesDrawer"
import PredizaScrollBar from "../../../../Common/PredizaScrollBar"
import InputSearch from "../../../../Common/InputSearch"
import planStore from "../../../../../stores/PlanStore"
import CustomCheckBox from "../../../../Common/Themed/ThemedCheckBox"
import RowDrawerMap from "../../../../AdvancedMapPage/GoogleMaps/Drawer/StatePages/CommonComponents/RowDrawerMap"
import ThemedTextField from "../../../../Common/Themed/ThemedTextField"
import CancelToken from "../../../../../helpers/cancelToken"
import { PlanFeatureType, ServicesType } from "../../../../../interfaces/Plans"


function PlanFeaturesDrawer(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()
  const { id } = useParams()

  const servicesRef = useRef([])

  const [services, setServices] = useState<ServicesType[]>([])
  const [checkboxesFeatures, setCheckboxesFeatures] = useState(null)
  const [checkboxesServices, setCheckboxesServices] = useState(null)
  const [valuesFeatures, setValuesFeatures] = useState(null)
  const [searchText, setSearchText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const displayedOptions = useMemo(() => {
    const newServices = []

    services.forEach(service => {
      const newFeatures = []

      newFeatures.push(...service.features.filter(feature =>
        typeof feature.name === "string" && containsText(feature.name, searchText)
      ))

      if (newFeatures.length > 0) {
        newServices.push({ name: service.name, features: newFeatures })
      }
    })

    return newServices
  }, [searchText, services])

  useEffect(() => {
    if (props.openDrawer) {
      // Não chama as requisições de novo, caso fecha e abre a drawer no mesmo plano
      if (planStore.getCheckboxServicesFeatures()) {
        fillCheckboxesFeatures()
      } else {
        getServices()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openDrawer])

  useEffect(() => {
    if (valuesFeatures) {
      sumValuesFeatures()
      planStore.storeValueServicesFeatures(valuesFeatures)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesFeatures])

  useEffect(() => {
    if (checkboxesFeatures) {
      const statusServices = {}

      Object.keys(planStore.getCheckboxServicesFeatures()).forEach(service => {
        const checkService = !Object.values(planStore.getCheckboxServicesFeatures()[service]).some(featureCheck => !featureCheck)

        statusServices[service] = checkService
      })

      setCheckboxesServices(statusServices)
      sumValuesFeatures()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxesFeatures])

  const sumValuesFeatures = () => {
    let checkboxServicesFeatures: Record<string, any> = {}

    Object.values(planStore.getCheckboxServicesFeatures()).forEach(checkbox => {
      if (checkbox && typeof checkbox === "object") {
        checkboxServicesFeatures = { ...checkboxServicesFeatures, ...checkbox }
      }
    })

    if (valuesFeatures && typeof props.totalValuesFeatures === "function") {
      let totalValues = 0

      Object.entries(valuesFeatures).forEach(([objectid, value]) => {
        if (typeof value === "string" && value.length > 0 && checkboxServicesFeatures[objectid]) {
          totalValues += +value
        }
      })
      props.totalValuesFeatures(totalValues)
    }
  }

  const handleOpenDrawer = () => {
    if (typeof props.handleOpenDrawer === "function") {
      props.handleOpenDrawer(false)
    }
  }

  const fillCheckboxesFeatures = () => {
    let featuresCheck: Record<string, any> = {}

    Object.values(planStore.getCheckboxServicesFeatures()).forEach(features => {
      if (features && typeof features === "object") {
        featuresCheck = { ...featuresCheck, ...features }
      }
    })

    setCheckboxesFeatures(featuresCheck)
  }

  const getServices = () => {
    setLoading(true)
    planStore.getListServices(CancelToken(), responseGetServices)
  }

  const responseGetServices = (response) => {
    CancelToken().remove(response.id)

    if (response.data?.length > 0) {
      const servicesId = {}

      response.data.forEach(service => {
        servicesId[service.name] = service.objectid
      })

      planStore.storeServicesId(servicesId)
      planStore.storeFullServices(response.data)
      servicesRef.current = response.data
      getFeaturesByPlan()
    }
  }

  const getFeaturesByPlan = () => {
    planStore.getListFeaturesByPlan(CancelToken(), id, responseGetFeaturesByPlan)
  }

  const responseGetFeaturesByPlan = (response) => {
    CancelToken().remove(response.id)
    setLoading(false)

    if (response.data) {
      const newFeatureCheckboxes = {}
      const featuresValue = {}

      // Preenche os checkboxes com as features do plano
      servicesRef.current.forEach(service => {
        service.features?.forEach(feature => {
          if (response.data.some(feat => feat.objectid === feature.objectid)) {
            newFeatureCheckboxes[service.name] = { ...newFeatureCheckboxes[service.name], [feature.objectid]: true }
          } else {
            newFeatureCheckboxes[service.name] = { ...newFeatureCheckboxes[service.name], [feature.objectid]: false }
            featuresValue[feature.objectid] = ""
          }
        })
      })

      response.data.forEach(feature => {
        featuresValue[feature.objectid] = feature.value ? feature.value.toString() : ""
      })

      planStore.storeCheckboxServicesFeatures(newFeatureCheckboxes)
      fillCheckboxesFeatures()

      setValuesFeatures(featuresValue)
      setServices(servicesRef.current)
      planStore.storeFeaturesByPlan(response.data)
    }
  }

  const handleChangeCheckboxService = (event) => {
    const newCheckboxesFeatures = { ...checkboxesFeatures }
    const storeCheckboxFeatures = { ...planStore.getCheckboxServicesFeatures() }

    Object.keys(storeCheckboxFeatures[event.target.name]).forEach(feature => {
      if (storeCheckboxFeatures[event.target.name][feature] !== event.target.checked) {
        storeCheckboxFeatures[event.target.name][feature] = event.target.checked
        newCheckboxesFeatures[feature] = event.target.checked
      }
    })

    planStore.storeCheckboxServicesFeatures(storeCheckboxFeatures)
    setCheckboxesFeatures(newCheckboxesFeatures)
  }

  const handleChangeCheckboxFeatures = (event) => {
    const holdCheckboxesFeatures = { ...checkboxesFeatures, [event.target.name]: event.target.checked }
    const newCheckboxFeatures = {}

    Object.keys(planStore.getCheckboxServicesFeatures()).forEach((service, indexService) => {
      Object.keys(planStore.getCheckboxServicesFeatures()[service]).forEach((feature, indexFeature) => {
        newCheckboxFeatures[service] = {
          ...newCheckboxFeatures[service],
          [feature]: holdCheckboxesFeatures[Object.keys(Object.values(planStore.getCheckboxServicesFeatures())[indexService])[indexFeature]]
        }
      })
    })

    setCheckboxesFeatures(holdCheckboxesFeatures)
    planStore.storeCheckboxServicesFeatures(newCheckboxFeatures)
  }

  const handleChangeValue = (event) => {
    const value = event.target.value.replace(/\D/g, "")
    const newValuesFeatures = { ...valuesFeatures }
    const featureId = Object.keys(valuesFeatures).find(feature => feature === event.target.name)

    if (featureId) {
      newValuesFeatures[featureId] = value
      setValuesFeatures(newValuesFeatures)
    }
  }

  const renderCheckboxesBlock = () => {
    const featuresByService = {}

    displayedOptions.forEach(service => {
      if (service.name) {
        featuresByService[service.name] = [...service.features]
      }
    })

    return Object.entries(featuresByService).map(([service, features]) => (
      <Grid key={service} item>
        <Accordion defaultExpanded className={classes.muiAccordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            {checkboxesServices && checkboxesServices[service] !== undefined &&
              <FormControlLabel
                aria-label="Environments"
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                control={
                  <CustomCheckBox
                    checked={checkboxesServices[service]}
                    onChange={handleChangeCheckboxService}
                    name={service}
                  />
                }
                className={classes.titleCardDrawer}
                label={service}
              />
            }
          </AccordionSummary>
          <AccordionDetails>
            <Grid className={classes.listFeatures}>
              {(features as PlanFeatureType[]).map((feature, index) => (
                <Grid container key={index}>
                  <Grid item xs={9}>
                    <Typography component="div">
                      <RowDrawerMap
                        key={index}
                        classStyle={classes.titleCardDrawer}
                        checkBox={<CustomCheckBox
                          checked={checkboxesFeatures[feature.objectid]}
                          onChange={handleChangeCheckboxFeatures}
                          name={feature.objectid}
                        />}
                        title={feature.name}
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={3} container alignItems="center">
                    <ThemedTextField
                      name={feature.objectid}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: valuesFeatures[feature.objectid].length > 0
                          ? <InputAdornment position="start">
                            {t("general.coin")}
                          </InputAdornment>
                          : null,
                      }}
                      className={classes.inputAdornment}
                      value={valuesFeatures[feature.objectid].length > 0 ? Number(valuesFeatures[feature.objectid] / 100).toFixed(2) : ""}
                      onChange={handleChangeValue}
                      variant="standard"
                      size="small"
                      placeholder="R$ 0,00"
                      disabled={!checkboxesFeatures[feature.objectid]}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    ))
  }

  return (
    <Box
      id="DrawerID"
      sx={{ width: 370 }}
      role="presentation"
    >
      <PredizaScrollBar customHeight={"calc(100vh - 88px)"}>
        <Grid className={classes.boxContMaxWidth}>
          <List className={classes.containerFlexPages}>
            <Grid item style={{ textAlign: "right" }}>
              <IconButton size="small" role="presentation" onClick={handleOpenDrawer}>
                <CloseIcon className={classes.mainColor} fontSize="small" />
              </IconButton>
            </Grid>
            <Typography className={cx(classes.mainColor, classes.title)} variant="h5">{t("homePanel.plans.form.title3")}</Typography>
          </List>
          <InputSearch
            setSearchText={setSearchText}
            placeholder={"Busque a funcionalidade"}
          />
          {loading
            ? <Grid container justifyContent="center" className={classes.loaderConfig}>
              <CircularProgress />
            </Grid>
            : <>{renderCheckboxesBlock()}</>
          }
        </Grid>
      </PredizaScrollBar>
    </Box>
  )
}

PlanFeaturesDrawer.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  handleOpenDrawer: PropTypes.func.isRequired,
  totalValuesFeatures: PropTypes.func.isRequired,
}

export default PlanFeaturesDrawer