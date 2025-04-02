import { useState, useEffect } from "react"
import PasswordStrengthBar from "react-password-strength-bar"
import { useNavigate } from "react-router-dom"

import { Button, FormControl, Grid, IconButton, InputAdornment, Link } from "@mui/material"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import PersonIcon from "@mui/icons-material/Person"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"

import useStyles from "../../../styles/Access/Active/ActiveForm"
import SessionStore from "../../../stores/SessionStore"
import useKeyPress from "../../../hook/useKeyPress"
import CustomInput from "../../Common/Themed/ThemedInput"
import CancelToken from "../../../helpers/cancelToken"


function ActiveForm(props) {
  const { classes } = useStyles()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [username, setUsername] = useState("")
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
    if (surname.length > 0 && name.length > 0) {
      suggestUsername()
    }
    setIsFailed(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, surname, username, password, password2])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const suggestUsername = () => {
    let suggest = (name + "." + surname).toLocaleLowerCase()
    setUsername(suggest)
  }

  const handleChangeValue = (e) => {
    let v = e.target.value

    if (e.target.name === "name") {
      setName(v)
      return
    }
    if (e.target.name === "surname") {
      setSurname(v)
      return
    }
    if (e.target.name === "username") {
      setUsername(v)
      return
    }
  }

  const isValid = () => {
    //Algum campo não foi preenchido
    if (name.length < 1 || surname.length < 1 || username.length < 1 || password.length < 1) {
      setMessage("Preencha todos os campos")
      setIsFailed(true)
      return false
    }

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

  const login = () => {
    SessionStore.login({ username: username, password: password }, CancelToken(), responseLogin)
  }

  const responseLogin = (resp) => {
    CancelToken().remove(resp.id)

    if (resp.data !== null) {
      navigate("/customer?start=0&limit=10")
      return
    }

    navigate("/login")
    SessionStore.emit("check_login")
  }

  const handleActive = () => {
    if (isValid()) {
      setDisabled(true)
      SessionStore.activeUser(CancelToken(), props.token, toData(), responsePutUser)
    }
  }

  const responsePutUser = (response) => {
    CancelToken().remove(response.id)

    if (response.data !== null) {
      login()
    }
  }


  const handleChangePassword = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value)
    } else {
      setPassword2(e.target.value)
    }
  }

  const toData = () => {
    let data = { name: name, surname: surname, username: username, password: password }
    return data
  }

  const getForm = () => {
    return (
      <Grid container className={classes.boxContainer}>
        <Grid item xs={12}>
          <Grid className={classes.formHeader}>
            Registre-se
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ color: "red" }}>
          {message.length > 0 && message + "*"}
        </Grid>
        <Grid item xs={12} className={classes.formControl}>
          <Grid container >
            <Grid item xs={12}>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth className={classes.margin}>
                    <CustomInput
                      className={classes.activeInputs}
                      classes={{ input: classes.placeHolder }}

                      id="input-with-icon-adornment"
                      placeholder="Nome"
                      name="name"
                      disabled={disabled}
                      value={name}
                      style={isFailed ? { border: "1px solid red" } : {}}
                      onKeyPress={(enter && handleActive) || null}
                      onChange={handleChangeValue}
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>

                  <FormControl fullWidth className={classes.margin}>
                    <CustomInput
                      required
                      className={classes.activeInputs}
                      classes={{ input: classes.placeHolder }}
                      id="input-with-icon-adornment"
                      placeholder="Sobrenome"
                      name="surname"
                      disabled={disabled}
                      value={surname}
                      style={isFailed ? { border: "1px solid red" } : {}}
                      onKeyPress={(enter && handleActive) || null}
                      onChange={handleChangeValue}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl fullWidth className={classes.margin}>
                <CustomInput
                  className={classes.activeInputs}
                  classes={{ input: classes.placeHolder }}

                  id="input-with-icon-adornment"
                  placeholder="Nome de usuário"
                  name="username"
                  disabled={disabled}
                  value={username}
                  style={isFailed ? { border: "1px solid red" } : {}}
                  onChange={handleChangeValue}
                  startAdornment={
                    <InputAdornment position="start">
                      <SpellcheckIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth className={classes.margin}>
                <CustomInput
                  className={classes.activeInputs}
                  classes={{ input: classes.placeHolder }}

                  id="input-with-icon-adornment2"
                  placeholder="Senha"
                  name="password"
                  disabled={disabled}
                  value={password}
                  onKeyPress={(enter && handleActive) || null}
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
                  onKeyPress={(enter && handleActive) || null}
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
            <Button className={classes.button} variant="contained" onClick={handleActive}>
              Criar Conta
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

export default ActiveForm