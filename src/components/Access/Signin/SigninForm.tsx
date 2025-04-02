import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button, FormControl, Grid, InputAdornment, Link } from "@mui/material"
import EmailIcon from "@mui/icons-material/AlternateEmail"

import useStyles from "../../../styles/Access/Signin/SigninForm"
import CustomInput from "../../Common/Themed/ThemedInput"
import ToolsUtils from "../../../utils/ToolsUtils"
import SessionStore from "../../../stores/SessionStore"
import CancelToken from "../../../helpers/cancelToken"


function SigninForm() {
  const { classes } = useStyles()

  const [signin, setSignin] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [sent, setSent] = useState(false)

  const navigate = useNavigate()

  const handleChangeValue = (e) => {
    setSignin(e.target.value)
  }

  const isValid = () => {
    let f = !(ToolsUtils.isEmptyString(signin))
    return f
  }

  const toData = () => {
    return {
      to: signin
    }
  }

  const handleSignin = () => {
    setDisabled(true)
    if (isValid()) {
      SessionStore.signin(toData(), CancelToken(), responseSignin)
    }
  }

  const responseSignin = (response) => {
    CancelToken().remove(response.id)

    if (!ToolsUtils.isNullOrEmpty(response, "data")) {
      setSent(true)
    }
    setDisabled(false)
  }

  const getForm = () => {
    return (
      <Grid container className={classes.boxContainer}>
        <Grid item xs={12}>
          <Grid className={classes.formHeader}>
            Registre-se
          </Grid>
        </Grid>
        {!sent &&
          <Grid item xs={12} className={classes.formControl}>
            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.margin}>
                  <CustomInput
                    id="input-with-icon-adornment"
                    placeholder="E-mail"
                    name="email"
                    disabled={disabled}
                    value={signin}
                    onChange={handleChangeValue}
                    startAdornment={
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.alignButton}>
                <Button className={classes.button} variant="contained" onClick={handleSignin}>
                  Criar conta
                </Button>
              </Grid>
            </Grid>
          </Grid>
        }
        {sent &&
          <Grid item xs={12} style={{ textAlign: "center", fontSize: "18px" }}>
            {"Um e-mail foi enviado para o endereço informado."}
          </Grid>
        }
      </Grid>
    )
  }

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12}>
        {getForm()}
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
  )
}

export default SigninForm