import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { FormControl, Grid, InputAdornment, TextField, Typography } from "@mui/material"

import ThemedTextField from "../../../../Common/Themed/ThemedTextField"
import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanMainInformation"


function PlanMainInformation(props) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const handleChangeInput = (event) => {
    if (event.target.name === "name" && typeof props.handleName === "function") {
      props.handleName(event.target.value);
    } else if (event.target.name === "price" && typeof props.handlePrice === "function") {
      let value = event.target.value.replace(/\D/g, '')

      if (value === "") {
        value = 0
      }

      props.handlePrice(parseInt(value))
    } else if (event.target.name === "description" && typeof props.handleDescription === "function") {
      props.handleDescription(event.target.value)
    } else if (event.target.name === "notes" && typeof props.handleNotes === "function") {
      props.handleNotes(event.target.value)
    }
  }

  return (
    <Grid item container>
      <Typography className={classes.subtitle} sx={{ marginBottom: "16px" }}>
        {t("homePanel.plans.form.title1")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <FormControl fullWidth>
            <ThemedTextField
              name="name"
              InputLabelProps={{
                shrink: true,
              }}
              value={props.name}
              onChange={handleChangeInput}
              label={t("homePanel.plans.form.inputName")}
              placeholder={t("homePanel.plans.form.placeholderName")}
              variant="outlined"
              size="small"
              error={props.flagNameError}
              helperText={props.textNameError}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <ThemedTextField
              name="price"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  {t("general.coin")}
                </InputAdornment>,
              }}
              className={classes.inputAdornment}
              value={Number(props.price / 100).toFixed(2)}
              onChange={handleChangeInput}
              label={t("homePanel.plans.form.inputPrice")}
              variant="outlined"
              size="small"
              error={props.flagPriceError}
              helperText={props.textPriceError}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "36px" }}>
          <FormControl fullWidth>
            <TextField
              name="description"
              InputLabelProps={{
                shrink: true,
              }}
              value={props.description}
              className={classes.inputs}
              onChange={handleChangeInput}
              label={t("homePanel.plans.form.inputDescription")}
              placeholder={t("homePanel.plans.form.placeholderDescription")}
              variant="outlined"
              size="small"
              helperText={props.flagDescriptionError ? props.textDescriptionError : t("homePanel.plans.form.helperText", { number: "100" })}
              error={props.flagDescriptionError}
              multiline
              maxRows={2}
              rows={2}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "36px" }}>
          <FormControl fullWidth>
            <TextField
              name="notes"
              InputLabelProps={{
                shrink: true,
              }}
              value={props.notes}
              className={classes.inputs}
              onChange={handleChangeInput}
              label={t("homePanel.plans.form.inputNotes")}
              placeholder={t("homePanel.plans.form.placeholderNotes")}
              variant="outlined"
              size="small"
              helperText={t("homePanel.plans.form.helperText", { number: "90" })}
              multiline
              rows={2}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  )
}

PlanMainInformation.propTypes = {
  flagNameError: PropTypes.bool.isRequired,
  textNameError: PropTypes.string.isRequired,
  flagPriceError: PropTypes.bool.isRequired,
  textPriceError: PropTypes.string.isRequired,
  flagDescriptionError: PropTypes.bool.isRequired,
  textDescriptionError: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleName: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  handlePrice: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleDescription: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  handleNotes: PropTypes.func.isRequired,
}

export default PlanMainInformation