import { useEffect, useState } from "react"

import { Avatar, Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/ActivateEditPerson"
import toolsUtils from "../../../../../../utils/ToolsUtils"
import PredizaModal from "../../../../../Common/PredizaModal"
import CustomCheckBox from "../../../../../Common/Themed/ThemedCheckBox"


const ActivateEditPerson = ({ handleUser, singleUser }) => {
  const { classes } = useStyles()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>("Contato principal já definido")
  const [textModal, setTextModal] = useState<string>("Essa propriedade já tem um contato principal definido. Se continuar, irá substituí-lo por este.")
  const [disableImportBt, setDisableImportBt] = useState<boolean>(false)

  const modalButtons = [
    { label: "VOLTAR", action: () => handleClose() },
    { label: "CONTINUAR", action: () => handleForward() },
  ]
  const [producerValue, setProducerValue] = useState({
    phoneNumber: "(54)99233-7377",
    email: "fazenda@prediza.io",
    annotation: "Melhores dias para ligações: segundas e terça-feiras. Gosta de vinho tinto seco Cabernet Sauvignon.",
    isowner: singleUser.isowner ? "Proprietário" : "Representante Comercial",
    name: `${singleUser.name} ${singleUser.surname}`
  })

  useEffect(() => {
    setDisableImportBt(false)
  }, [])

  useEffect(() => {
    setTitleModal("Contato principal já definido")
    setTextModal("Essa propriedade já tem um contato principal definido. Se continuar, irá substituí-lo por este.")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bodyModal = () => {
    return (
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2" className={classes.content}>
              {textModal}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const handleForward = () => {

  }

  const handleClose = (error = null) => {
    if (!error) {
      setOpenModal(false)
    }
  }

  const handleClickBackUser = (valueUser, singleUserValue) => {
    if (valueUser === "listPerson") {
      handleUser(valueUser, singleUserValue)
    }
    if (valueUser === "activateEditPerson") {

    }
  }

  const handleChangeProducerValue = (event, type) => {
    // CRIAR PAYLOAD DE SET AQUI
    let output = producerValue

    if (type === "phoneNumber") {
      output = {
        phoneNumber: event,
        email: producerValue.email,
        annotation: producerValue.annotation,
        isowner: producerValue.isowner,
        name: producerValue.name
      }
    }
    if (type === "email") {
      output = {
        phoneNumber: producerValue.phoneNumber,
        email: event,
        annotation: producerValue.annotation,
        isowner: producerValue.isowner,
        name: producerValue.name
      }
    }
    if (type === "annotation") {
      output = {
        phoneNumber: producerValue.phoneNumber,
        email: producerValue.email,
        annotation: event,
        isowner: producerValue.isowner,
        name: producerValue.name
      }
    }
    if (type === "isowner") {
      output = {
        phoneNumber: producerValue.phoneNumber,
        email: producerValue.email,
        annotation: producerValue.annotation,
        isowner: event,
        name: producerValue.name
      }
    }
    if (type === "name") {
      output = {
        phoneNumber: producerValue.phoneNumber,
        email: producerValue.email,
        annotation: producerValue.annotation,
        isowner: producerValue.isowner,
        name: event
      }
    }

    setProducerValue(output)
  }

  return (
    <Grid>
      <Grid className={classes.containerUser}>
        <IconButton aria-haspopup="true" color="inherit">
          <Avatar className={classes.avatar}>{toolsUtils.getAvatar(singleUser)}</Avatar>
        </IconButton>
        <Grid className={classes.textEditActive}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            value={producerValue.name}
            onChange={(e) => handleChangeProducerValue(e.target.value, "name")}
            slotProps={{ input: { readOnly: true } }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            value={producerValue.isowner}
            onChange={(e) => handleChangeProducerValue(e.target.value, "isowner")}
            slotProps={{ input: { readOnly: true } }}
          />
        </Grid>
      </Grid>
      <Grid className={classes.containerBoxUser}>
        <Typography className={classes.propertyTitleActivateDetail}>
          <CustomCheckBox />
          Contato principal
        </Typography>
        <Grid className={classes.propertyDetail}>
          <Grid className={classes.boxDetailPreferenceEdit}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Produtor/Empresa"
              defaultValue="Default Value"
              value={producerValue.phoneNumber}
              onChange={(e) => handleChangeProducerValue(e.target.value, "phoneNumber")}
            />
            <TextField
              id="outlined-basic"
              label="E-mail"
              defaultValue="Default Value"
              variant="outlined"
              value={producerValue.email}
              onChange={(e) => handleChangeProducerValue(e.target.value, "email")}
            />
          </Grid>
          <Grid className={classes.boxDetailButtonLeft}>
            <Button onClick={() => handleUser("addField")}>Adicionar Campo</Button>
          </Grid>
        </Grid>
        <Grid className={classes.boxDetailPreference}>
          <TextField
            className={classes.propertyInputValue}
            id="outlined-multiline-static"
            label="Nota"
            multiline
            defaultValue="Default Value"
            variant="outlined"
            value={producerValue.annotation}
            onChange={(e) => handleChangeProducerValue(e.target.value, "annotation")}
          />
        </Grid>
        <Grid className={classes.boxDetailButton}>
          <Button onClick={() => handleClickBackUser("listPerson", singleUser)}>Cancelar</Button>
          <Button onClick={() => setOpenModal(true)}>Salvar</Button>
        </Grid>
        <PredizaModal
          open={openModal}
          dispense={modalButtons[0]}
          confirm={modalButtons[1]}
          title={titleModal}
          disableConfirmBt={disableImportBt}
          size={"small"}
        >
          {bodyModal()}
        </PredizaModal>
      </Grid>
    </Grid>
  )
}

export default ActivateEditPerson