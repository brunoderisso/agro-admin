import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, FormControlLabel, Grid, IconButton, InputAdornment, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanAdditionalItems"
import CustomCheckBox from "../../../../Common/Themed/ThemedCheckBox"
import ThemedTextField from "../../../../Common/Themed/ThemedTextField"
import AddIcon from "../../../../../img/icons/addIcon.svg?react"


function PlanAdditionalItems(props) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const onChangeSubitemRecurrent = (index) => {
    if (typeof props.onChangeSubitemRecurrent === "function") {
      props.onChangeSubitemRecurrent(index)
    }
  }

  const handleChangeSubitemDescription = (event, index) => {
    if (typeof props.handleChangeSubitemDescription === "function") {
      props.handleChangeSubitemDescription(event, index)
    }
  }

  const handleChangeSubitemPriceCents = (event, index) => {
    if (typeof props.handleChangeSubitemPriceCents === "function") {
      props.handleChangeSubitemPriceCents(event, index)
    }
  }

  const handleDeleteSubitem = (index) => {
    if (typeof props.handleDeleteSubitem === "function") {
      props.handleDeleteSubitem(index)
    }
  }

  const addNewSubitem = () => {
    if (typeof props.addNewSubitem === "function") {
      props.addNewSubitem()
    }
  }

  return (
    <Grid item container sx={{ gap: "8px" }}>
      <Typography className={classes.subtitle}>
        {t("homePanel.plans.form.title7")}
      </Typography>

      {props.subitems.map((item, i) => {
        return (
          <Grid item xs={12} key={i}>
            <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>
              <Grid item>
                <FormControlLabel
                  key={"subitems-" + i}
                  className={classes.labelRadio}
                  control={<CustomCheckBox onChange={() => { onChangeSubitemRecurrent(i) }} checked={item.recurrent} />}
                  label={"Recorrente"}

                />
              </Grid>
              <Grid item xs={4}>
                <ThemedTextField
                  name="subitem_description"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={item.description === "area"}
                  value={item.description}
                  onChange={(e) => { handleChangeSubitemDescription(e, i) }}
                  label={t("homePanel.plans.form.inputDescription")}
                  placeholder={t("homePanel.plans.form.inputDescription")}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <ThemedTextField
                  name="subitem_price_cents"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      {t("general.coin")}
                    </InputAdornment>,
                  }}
                  className={classes.inputAdornment}
                  value={Number(item.price_cents / 100).toFixed(2)}
                  onChange={(e) => { handleChangeSubitemPriceCents(e, i) }}
                  label={"Valor"}
                  placeholder={"Valor"}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton className={classes.deleteIcon} onClick={() => { handleDeleteSubitem(i) }}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
      <Grid item xs={8}>
        <Button
          color="primary"
          className={classes.btPrimary}
          sx={{ width: "calc(50% - 4px)" }}
          onClick={addNewSubitem}
        >
          <AddIcon />
          <Typography className={classes.textBtn}>
            {"Adicionar Item"}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

PlanAdditionalItems.propTypes = {
  subitems: PropTypes.array.isRequired,
  onChangeSubitemRecurrent: PropTypes.func.isRequired,
  handleChangeSubitemDescription: PropTypes.func.isRequired,
  handleChangeSubitemPriceCents: PropTypes.func.isRequired,
  handleDeleteSubitem: PropTypes.func.isRequired,
  addNewSubitem: PropTypes.func.isRequired,
}

export default PlanAdditionalItems