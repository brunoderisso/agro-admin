import { useState, useEffect } from "react"
import PasswordStrengthBar from "react-password-strength-bar"
import { useNavigate } from "react-router-dom"

import { FormControl, Grid, IconButton, InputAdornment, Link } from "@mui/material"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import CheckIcon from "@mui/icons-material/Check"

import useStyles from "../../../styles/Access/Forgot/ForgotForm"
import SessionStore from "../../../stores/SessionStore"
import useKeyPress from "../../../hook/useKeyPress"
import CustomInput from "../../Common/Themed/ThemedInput"


function ForgotForm(props) {
  const { classes } = useStyles()

  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const enter = useKeyPress("Enter")
  const navigate = useNavigate()

  useEffect(() => {
    SessionStore.logout(() => { })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsFailed(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, password2])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const isValid = () => {
    //Algum campo não foi preenchido
    if (password !== password2) {
      setMessage("As senhas não coincidem")
      return false
    }

    if (password.length < 6) {
      setMessage("Senha muito fraca")
      return false
    }
    return true
  }

  const updatePassword = () => {
    setDisabled(true)
    if (isValid()) {

      SessionStore.password(props.token, password, (status) => {
        if (status === "sent") {
          navigate("/customer?start=0&limit=10")
          return
        }
        setDisabled(false)
        navigate("/login")
      })
    }
  }

  const handleChangePassword = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value)
    } else {
      setPassword2(e.target.value)
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
        <Grid item xs={12} style={{ color: "red" }}>
          {message.length > 0 && message + "*"}
        </Grid>
        <Grid item xs={12} className={classes.formControl}>
          <Grid container >
            <Grid item xs={12}>
              <FormControl fullWidth className={classes.margin}>
                <CustomInput
                  className={classes.activeInputs}
                  classes={{ input: classes.placeHolder }}

                  id="input-with-icon-adornment2"
                  placeholder="Senha"
                  name="password"
                  disabled={disabled}
                  value={password}
                  onKeyPress={(enter && updatePassword) || null}
                  style={isFailed ? { border: "1px solid red", marginTop: "20px" } : { marginTop: "20px" }}
                  onChange={handleChangePassword}
                  type={(!showPassword && "password") || "text"}
                  startAdornment={
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <PasswordStrengthBar shortScoreWord={"Muito pequena"} scoreWords={["Muito Fraca", "Fraca", "Média", "Boa", "Forte"]} password={password} />
              <FormControl fullWidth className={classes.margin}>
                <CustomInput
                  className={classes.activeInputs}
                  classes={{ input: classes.placeHolder }}

                  id="input-with-icon-adornment2"
                  placeholder="Repita a senha"

                  name="password2"
                  autoComplete="off"
                  disabled={disabled}
                  value={password2}
                  onKeyPress={(enter && updatePassword) || null}
                  style={isFailed ? { border: "1px solid red", marginTop: "20px" } : { marginTop: "20px" }}
                  onChange={handleChangePassword}
                  type={(!showPassword && "password") || "text"}
                  startAdornment={
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
            <IconButton className={classes.forgotButton} color="primary" onClick={updatePassword}>
              <CheckIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} className={classes.loginPosition}>
            <Link className={classes.createAccount} href="#"
              onClick={(e) => { navigate("/login"); e.preventDefault() }}
              data-modal="loginUser">
              {"Voltar ao login"}
            </Link>
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

export default ForgotForm