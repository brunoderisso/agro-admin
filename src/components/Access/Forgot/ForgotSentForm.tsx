import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Button, FormControl, Grid, InputAdornment, Link } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"

import useStyles from "../../../styles/Access/Forgot/ForgotSentForm"
import SessionStore from "../../../stores/SessionStore"
import useKeyPress from "../../../hook/useKeyPress"
import CustomInput from "../../Common/Themed/ThemedInput"
import CancelToken from "../../../helpers/cancelToken"


function ForgotSentForm() {
  const { classes } = useStyles()

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const enter = useKeyPress("Enter")

  const navigate = useNavigate()

  useEffect(() => {
    if (enter) {
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enter])

  const handleChangeValue = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    if (email !== "") {
      SessionStore.forgot({ to: email }, CancelToken(), responseForgot)
    }
  }

  const responseForgot = (resp) => {
    CancelToken().remove(resp.id)

    if (resp.data !== null) {
      setMessage("Um link foi enviado para o seu e-mail")
    }
  }

  const getForm = () => {
    return (
      <Grid container className={classes.boxContainer}>
        <Grid item xs={12}>
          <Grid className={classes.formHeader}>
            Recuperação de senha
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ color: "green" }}>
          {message.length > 0 && message + "*"}
        </Grid>
        <Grid item xs={12} className={classes.formControl}>
          <Grid container >
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <FormControl fullWidth className={classes.margin}>
                  <CustomInput
                    className={classes.activeInputs}
                    classes={{ input: classes.placeHolder }}

                    id="input-with-icon-adornment"
                    placeholder="E-mail"
                    name="email"
                    value={email}
                    onChange={handleChangeValue}
                    startAdornment={
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center", marginTop: "15px", marginBottom: "20px" }}>
                <Button className={classes.buttonForgot} variant="contained" color="primary" onClick={handleSubmit}>
                  Enviar
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.loginPosition}>
                {"Já possui uma conta? "}

                <Link className={classes.createAccount} href="#"
                  onClick={(e) => { navigate("/login"); e.preventDefault() }}
                  data-modal="loginUser">
                  {" Entre aqui"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12}>
        {getForm()}
      </Grid>
    </Grid>
  )
}

export default ForgotSentForm