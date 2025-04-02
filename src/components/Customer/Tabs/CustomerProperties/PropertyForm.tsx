import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, FormControl, Grid, Typography } from "@mui/material"
import DoneIcon from "@mui/icons-material/Done"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from "../../../../styles/Customer/CustomerProperties/PropertyForm"
import ThemedTextField from "../../../Common/Themed/ThemedTextField"


function PropertyForm(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [name, setName] = useState<string>("")
  const [area, setArea] = useState<string>("")
  const [productiveSize, setProductiveSize] = useState<string>("")
  const [flagNameError, setFlagNameError] = useState<boolean>(false)
  const [textNameError, setTextNameError] = useState<string>("")
  const [flagSizeError, setFlagSizeError] = useState<boolean>(false)
  const [textSizeError, setTextSizeError] = useState<string>("")

  useEffect(() => {
    if (props.environment) {
      setName(props.environment.name)
      setArea(props.environment.area)
      setProductiveSize(props.environment.productiveSize)
    }
  }, [props.environment])

  useEffect(() => {
    if (name.length > 0) {
      setFlagNameError(false)
      setTextNameError("")
    }

    if (area.length > 0) {
      setFlagSizeError(false)
      setTextSizeError("")
    }

    if (typeof props.onChange === "function") {
      const environment = {
        name: name,
        area: area,
        productiveSize: productiveSize
      }

      props.onChange(environment, props.index)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, area, productiveSize])

  const handleChangeValue = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value)
    }
    if (e.target.name === "area") {
      setArea(e.target.value)
    }
    if (e.target.name === "productiveSize") {
      setProductiveSize(e.target.value)
    }
  }

  const handleCloseBt = () => {
    props.onHandleCloseBt()
  }

  const handleDoneBt = () => {
    if (name.length > 0 && area.toString().length > 0) {
      props.onHandleDoneBt()
    }

    handleFieldsError([name.length, area.length])
  }

  const handleFieldsError = (lengthFields) => {
    if (lengthFields[0] === 0) {
      setFlagNameError(true)
      setTextNameError(t("general.errorMessage1"))
    }

    if (lengthFields[1] === 0) {
      setFlagSizeError(true)
      setTextSizeError(t("general.errorMessage1"))
    }
  }

  return (
    <Grid style={{ marginBottom: "15px" }}>
      <Grid item xs={12} className={classes.margin}>
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Typography variant="overline" className={classes.subTitle}>
              {"PROPRIEDADE " + parseInt(props.index + 1)}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.contentConfirmIcon}>
            <Button onClick={handleDoneBt} className={classes.iconButton}>
              <DoneIcon fontSize="small" className={classes.iconProp} />
            </Button>
            <Button onClick={handleCloseBt} className={classes.iconButton}>
              <CloseIcon fontSize="small" className={classes.iconProp} />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <FormControl fullWidth className={classes.margin}>
        <ThemedTextField
          id="name"
          name="name"
          InputLabelProps={{
            shrink: true,
          }}
          value={name}
          onChange={handleChangeValue}
          label="Nome da Propriedade"
          variant="outlined"
          placeholder="Como será identificada na plataforma"
          size="small"
          error={flagNameError}
          helperText={textNameError}
        />
      </FormControl>

      <FormControl fullWidth className={classes.margin}>
        <ThemedTextField
          id="area"
          name="area"
          InputLabelProps={{
            shrink: true,
          }}
          value={area}
          onChange={handleChangeValue}
          label="Tamanho da Propriedade (ha.)"
          variant="outlined"
          placeholder="Tamanho total / limite da propriedade"
          size="small"
          type="number"
          error={flagSizeError}
          helperText={textSizeError}
        />
      </FormControl>

      <FormControl fullWidth>
        <ThemedTextField
          id="productiveSize"
          name="productiveSize"
          InputLabelProps={{
            shrink: true,
          }}
          value={productiveSize}
          onChange={handleChangeValue}
          label="Área Produtiva (ha.)"
          variant="outlined"
          placeholder="Total de área(s) produtiva(s) de sua propriedade"
          size="small"
          disabled={true} // TODO: temporário
        />
      </FormControl>
    </Grid>
  )
}

PropertyForm.propTypes = {
  environment: PropTypes.shape({
    name: PropTypes.string,
    area: PropTypes.string,
    productiveSize: PropTypes.string
  }),
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onHandleCloseBt: PropTypes.func.isRequired,
  onHandleDoneBt: PropTypes.func.isRequired,
}

export default PropertyForm