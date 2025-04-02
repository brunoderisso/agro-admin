import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, Grid, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import InfoIcon from "@mui/icons-material/Info"

import useStyles from "../../../../styles/Customer/CustomerProperties/ItemPropertyCard"
import DeleteIcon from "../../../../img/icons/DeleteIcon.svg?react"
import CustomModal from "../../../Common/CustomModal"
import theme from "../../../../styles/Utils/Theme"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import polygonUtils from "../../../../utils/PolygonUtils"
import customerStore from "../../../../stores/CustomerStore"
import CancelToken from "../../../../helpers/cancelToken"
import { PropertyType } from "../../../../interfaces/Customer/Property"


function ItemPropertyCard(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [property, setProperty] = useState<PropertyType>(null)

  const removeModalButtons = [
    { label: t("general.modalCancelBtn"), action: (status) => handleModal(status) },
    { label: "Excluir", action: () => removeProperty(), color: theme.colors.error[40] }
  ]

  useEffect(() => {
    setProperty(props.property)
  }, [props.property])

  const removeProperty = () => {
    setLoader(true)
    customerStore.deletePropertyByCustomer(CancelToken(), props.customerId, property.objectid, responseRemoveProperty)
  }

  const responseRemoveProperty = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      handleModal(false)
      customerStore.emit("properties_feedback", "200")
      customerStore.emit("customers_reload", props.customerId)
    }

    if (response.status) {
      customerStore.emit("properties_feedback", response.status.toString())
    }
  }

  const handleModal = (status) => {
    setOpenModal(status)
  }

  const handleEditMode = () => {
    if (typeof props.handleEditMode === "function") {
      props.handleEditMode(props.index, property)
    }
  }

  const bodyModal = () => {
    return (
      <Grid>
        <Typography className={classes.textItemMenu}>
          Tem certeza que deseja remover a propriedade
          <span className={classes.boldText}> {property.name}</span>
          ? Não é possível desfazer essa ação.
        </Typography>
        <Grid container className={classes.contentWarningText}>
          <Grid item xs={1}>
            <InfoIcon className={classes.iconWarning} />
          </Grid>
          <Grid item xs={11}>
            <Typography className={classes.warningText}>
              Os dados coletados referentes a essa propriedade não ficarão mais disponíveis
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid item xs={12} sx={{ marginBottom: "24px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="overline" className={cx(classes.commonText, classes.titleText)}>
                {"Propriedade " + (props.index + 1)}
              </Typography>
            </Grid>
            <Grid item className={classes.btnContainer}>
              <Button className={classes.iconButton}>
                <DeleteIcon fontSize="small" className={classes.warningButton} onClick={() => { handleModal(true) }} />
              </Button>
              <Button className={classes.iconButton} onClick={handleEditMode}>
                <EditIcon fontSize="small" className={classes.colorButton} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ paddingLeft: "32px" }} spacing={2}>
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.textOutline}>
                Nome da Propriedade
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.commonText}>
                {property.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.textOutline}>
                Tamanho da Propriedade (ha.)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.commonText}>
                {(property.area !== null && property.area !== undefined)
                  ? polygonUtils.formatToHa(property.area)
                  : ConstantsUtils.NullFieldMask
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.textOutline}>
                Área Produtiva (ha.)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.commonText}>
                {ConstantsUtils.NullFieldMask}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CustomModal
        open={openModal}
        dispense={removeModalButtons[0]}
        confirm={removeModalButtons[1]}
        title={"Remover propriedade"}
        size={"medium"}
        loader={loader}
      >
        {bodyModal()}
      </CustomModal>
    </Grid>
  )
}

ItemPropertyCard.propTypes = {
  property: PropTypes.shape({
    objectid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    area: PropTypes.string,
    productiveSize: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleEditMode: PropTypes.func,
  loader: PropTypes.bool.isRequired,
  customerId: PropTypes.string
}

export default ItemPropertyCard