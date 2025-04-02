import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, Drawer, Grid, IconButton, Skeleton, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/DrawerNewProperty"
// import CancelTokenList from "../../../../../../stores/CancelTokenList"
import ThemedTextField from "../../../../../Common/Themed/ThemedTextField"
import PredizaModal from "../../../../../Common/PredizaModal"
import polygonUtils from "../../../../../../utils/PolygonUtils"
import PolygonStore from "../../../../../../stores/PoligonStore"
import GeoFileImporter from "../../../../../Common/GeoFileImporter"
import SelectPolygonSet from "../../../../../Common/SelectPolygonSet"


function DrawerNewProperty({ open, handleOpen/*, handleErrorStatus*/ }) {
  const { classes } = useStyles()
  const { t } = useTranslation()
  // const tokenList = new CancelTokenList()

  const initData = () => {
    return { name: "", size: "", area: "" }
  }

  const [loading/*, setLoading*/] = useState<boolean>(false)
  const [property, setProperty] = useState(initData())
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [showPolygons, setShowPolygons] = useState<boolean>(false)
  const [polygons, setPolygons] = useState([])
  const [selectedPolygon, setSelectedPolygon] = useState(null)
  const [disableConfirm, setDisableConfirm] = useState<boolean>(true)

  const modalButtons = [
    { label: t("general.close"), action: () => handleClose() },
    { label: t("general.next"), action: () => handleShowPolygons() },
    { label: t("general.toSelect"), action: () => handleSelectPolygon() },
  ]

  useEffect(() => {
    if (polygons.length > 0) {
      setDisableConfirm(false)
    } else {
      setDisableConfirm(true)
    }
  }, [polygons])

  useEffect(() => {
    if (showPolygons) {
      setDisableConfirm(true)
    }
  }, [showPolygons])

  useEffect(() => {
    if (selectedPolygon) {
      setDisableConfirm(false)
    }
  }, [selectedPolygon])

  const handleClose = () => {
    setOpenModal(false)
    setShowPolygons(false)
    setPolygons([])
  }

  const handleShowPolygons = () => {
    setShowPolygons(true)
  }

  const handleSelectPolygon = () => {
    handleClose()
    setProperty(prev => ({
      ...prev,
      name: selectedPolygon.name,
      size: polygonUtils.convertAreaToHa(
        PolygonStore.computeAreaGauss(selectedPolygon.path)
      ).replace(".", ",")
    }))
  }

  const onClose = () => {
    if (typeof handleOpen === "function") {
      handleOpen(false)
    }
  }

  const createProperty = () => {

  }

  const importProperty = () => {
    setOpenModal(true)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setProperty((prev) => ({ ...prev, [name]: value }))
  }

  const onUpload = (data) => {
    setPolygons(data)
  }

  const bodyModal = () => {
    return (
      <Grid>
        {showPolygons
          ? <SelectPolygonSet polygons={polygons} isRadio={true} handleSelectedPolygon={setSelectedPolygon} />
          : <GeoFileImporter onChange={onUpload} />
        }
      </Grid>
    )
  }

  return (
    <>
      <Drawer
        open={open}
        anchor="right"
        classes={{ paper: classes.wrapperPaper }}
      >
        <Grid container className={classes.container}>
          <Grid item container>
            <Typography variant="h5" className={classes.title}>
              {t("homePanel.subscriptions.newProperty")}
            </Typography>
            <Grid className={classes.buttonContainer}>
              <IconButton size="small" className={classes.icon} onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className={classes.icon} onClick={createProperty} disabled={loading}>
                <DoneIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item className={classes.subHeader}>
            <Typography variant="overline" className={classes.subtitle}>
              {`${t("homePanel.subscriptions.property")} 1`}
            </Typography>
            <Grid className={classes.wrapperBtn}>
              <Button color="primary" className={classes.primaryBt} onClick={importProperty}>
                <Typography className={classes.primaryText}>
                  {t("general.import")}
                </Typography>
              </Button>
              <Button color="primary" className={classes.primaryBt} onClick={() => setProperty(initData)}>
                <Typography className={classes.primaryText}>
                  {t("general.filterClean")}
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid item container className={classes.formContainer}>
            {loading
              ? <>
                {Array.from({ length: 3 }).map((_, index) => {
                  return <Skeleton key={index} variant="rounded" width={"100%"} height={39} />
                })}
              </>
              : <>
                <Grid item>
                  <ThemedTextField
                    name="name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={property.name}
                    onChange={handleChange}
                    placeholder={t("homePanel.subscriptions.propertyName")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <ThemedTextField
                    name="size"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={property.size}
                    onChange={handleChange}
                    placeholder={t("homePanel.subscriptions.propertySize")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <ThemedTextField
                    name="area"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={property.area}
                    onChange={handleChange}
                    placeholder={t("homePanel.subscriptions.productiveArea")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </>
            }
          </Grid>
          <Grid item sx={{ padding: "24px 0" }}>
            <Typography variant="caption" className={classes.text}>
              {t("homePanel.subscriptions.propertyDrawerDescription")}
            </Typography>
          </Grid>
        </Grid>
      </Drawer>
      <PredizaModal
        open={openModal}
        dispense={modalButtons[0]}
        confirm={showPolygons ? modalButtons[2] : modalButtons[1]}
        title={t("homePanel.subscriptions.importProperty")}
        disableConfirmBt={disableConfirm}
        customSize={"650"}
      >
        {bodyModal()}
      </PredizaModal>
    </>
  )
}

DrawerNewProperty.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  // handleErrorStatus: PropTypes.func.isRequired,
}

export default DrawerNewProperty