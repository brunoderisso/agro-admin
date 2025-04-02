import { useState } from "react"

import PropTypes from "prop-types"

import { Button, Card, Grid, Typography } from "@mui/material"

import useStyles from "../../../../styles/Customer/CustomerProperties/NewPropertyCard"
import AddIcon from "../../../../img/icons/addIcon.svg?react"
import PropertyForm from "./PropertyForm"
import customerStore from "../../../../stores/CustomerStore"
import polygonUtils from "../../../../utils/PolygonUtils"
import CancelToken from "../../../../helpers/cancelToken"
import { PropertyType } from "../../../../interfaces/Customer/Property"


function NewPropertyCard(props) {
  const { classes } = useStyles()

  const [newProperty, setNewProperty] = useState<PropertyType>(null)
  const [showForm, setShowForm] = useState<boolean>(false)

  const onChangeProperty = (prop) => {
    setNewProperty(prop)
  }

  const cancelEditForm = () => {
    setShowForm(false)
    setNewProperty(null)
  }

  const confirmNewProperty = () => {
    // TODO: adicionar productiveSize no objeto
    const formattedNewProperty = {
      name: newProperty.name,
      area: polygonUtils.convertAreaToMeter(+newProperty.area),
      latitude: 0,
      longitude: 0
    }

    props.handleLoader(true)
    customerStore.postPropertyByCustomer(CancelToken(), props.customerId, formattedNewProperty, responseConfirmNewProperty)
  }

  const responseConfirmNewProperty = (response) => {
    CancelToken().remove(response.id)

    if (response.data) {
      props.handleError("200")
      props.callback()
    }

    if (response.status) {
      props.handleLoader(false)
      props.handleError(response.status.toString())
    }
  }

  return (
    <Grid item>
      <Card className={classes.cardContainer}>
        {!showForm &&
          <Button color="primary" className={classes.btPrimary} onClick={() => { setShowForm(true) }}>
            <AddIcon />
            <Typography className={classes.txtBtAdd}>
              Adicionar propriedade
            </Typography>
          </Button>
        }
        {showForm &&
          <PropertyForm
            index={props.index}
            environment={newProperty}
            onChange={onChangeProperty}
            onHandleCloseBt={cancelEditForm}
            onHandleDoneBt={confirmNewProperty}
          />
        }
      </Card>
    </Grid>
  )
}

NewPropertyCard.propTypes = {
  index: PropTypes.number.isRequired,
  handleLoader: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  customerId: PropTypes.string,
  callback: PropTypes.func.isRequired
}

export default NewPropertyCard