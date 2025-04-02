import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { Button, Collapse, FormControl, Grid, IconButton, InputAdornment, Link, Typography } from "@mui/material"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import PersonIcon from "@mui/icons-material/Person"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

import useStyles from "../../../styles/Access/Login/LoginForm"
import SocialLoginButton from "./SocialLoginButton"
import SessionStore from "../../../stores/SessionStore"
import ToolsUtils from "../../../utils/ToolsUtils"
import useKeyPress from "../../../hook/useKeyPress"
import CustomInput from "../../Common/Themed/ThemedInput"
import UserFeedback from "../../Common/UserFeedback"
import CancelToken from "../../../helpers/cancelToken"


function LoginForm() {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const enter = useKeyPress("Enter")
  const navigate = useNavigate()

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [isFailed, setIsFailed] = useState(true)
  const [errorStatusResponse, setErrorStatusResponse] = useState("")

  useEffect(() => {
    SessionStore.logout(() => { })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsFailed(false)
    setMessage("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login, password])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleGoogleLogin = () => {
    window.location.href = "https://api.prediza.io/api/oauth/google/login"
  }

  const handleMicrosoftLogin = () => {
    window.location.href = "https://api.prediza.io/api/oauth/microsoft/login"
  }

  const handleYahooLogin = () => {
    window.location.href = "https://api.prediza.io/api/oauth/yahoo/login"
  }

  const handlePredizaLogin = () => {
    if (!showForm) {
      setShowForm(true)
      return
    }
    handleLogin()
  }

  const handleChangeValue = (e) => {
    if (e.target.name === "login") {
      setLogin(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const isValid = () => {
    let f = !(ToolsUtils.isEmptyString(login) && ToolsUtils.isEmptyString(password))
    return f
  }

  const handleLogin = () => {
    setDisabled(true)
    if (isValid()) {
      SessionStore.login(toData(), CancelToken(), responseLogin)
    }
  }

  const catchError = (data) => {
    let error = data || null
    if (error) {
      if (error.status === 401) {
        setIsFailed(true)
        setMessage("Usuário ou senha incorretos")
      }
    }
  }

  const responseLogin = (response) => {
    CancelToken().remove(response.id)

    if (!ToolsUtils.isNullOrEmpty(response, "data")) {
      SessionStore.fetchPreference(navigate);

      if (response.data.isAxiosError) {
        catchError(response.data.toJSON())
        setDisabled(false)
        return
      }
      navigate("/customer?start=0&limit=10")
      SessionStore.emit("check_login")
      return
    }

    if (response.status) {
      setErrorStatusResponse(response.status.toString())
    }

    setDisabled(false)
  }

  const toData = () => {
    return {
      username: login,
      password: password
    }
  }

  const getForm = () => {
    return (
      <Grid container className={classes.boxContainer}>
        <Grid item xs={12}>
          <Grid className={classes.formHeader}>
            {t("login.label-btn")}
          </Grid>
        </Grid>
        {showForm &&
          <Grid item xs={12} className={classes.backButton}>
            <IconButton aria-label="back" onClick={() => { setShowForm(false) }}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
        }
        <Grid item xs={12} style={{ color: "red" }}>
          {message.length > 0 && message}
        </Grid>
        <Collapse in={showForm} style={{ width: "100%" }}>
          <Grid item xs={12} className={classes.formControl}>
            <Grid container >
              <Grid item xs={12}>

                <FormControl fullWidth className={classes.margin}>
                  <CustomInput
                    id="input-with-icon-adornment"
                    placeholder="Usuário ou e-mail"
                    name="login"
                    disabled={disabled}
                    value={login}
                    style={isFailed ? { border: "1px solid red" } : {}}
                    onKeyPress={(enter && handleLogin) || null}
                    onChange={handleChangeValue}
                    startAdornment={
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                  <CustomInput
                    id="input-with-icon-adornment2"
                    placeholder="Senha"
                    name="password"
                    disabled={disabled}
                    value={password}
                    onKeyPress={(enter && handleLogin) || null}
                    style={isFailed ? { border: "1px solid red", marginTop: "20px" } : { marginTop: "20px" }}
                    onChange={handleChangeValue}
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
            <Grid item xs={12} style={{ marginTop: "25px" }}>
              <Typography>
                <Link className={classes.missed} href="#" onClick={(e) => { navigate("/forgotsent"); e.preventDefault() }}>
                  {t("login.forgotPassword")}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "15px" }}>
              <Button className={classes.button} variant="contained" color="primary" onClick={handlePredizaLogin}>
                {t("login.label-btn")}
              </Button>
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={!showForm} className={classes.wrapperCollapseButtons}>
          <Grid container className={classes.buttonsContainer}>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
              <SocialLoginButton
                label={t("login.login-btn", { social: "Google" })}
                social={"google"}
                onClick={handleGoogleLogin}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
              <SocialLoginButton
                label={t("login.login-btn", { social: "Microsoft" })}
                social={"microsoft"}
                onClick={handleMicrosoftLogin}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
              <SocialLoginButton
                label={t("login.login-btn", { social: "Yahoo" })}
                social={"yahoo"}
                onClick={handleYahooLogin}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
              <SocialLoginButton social={"prediza"} onClick={handlePredizaLogin} />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    )
  }

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12}>
        {getForm()}
      </Grid>
      <Grid item xs={12} className={classes.createPosition}>
        {t("login.label-main")}

        <Link className={classes.createAccount} href="#"
          onClick={(e) => { navigate("/signin"); e.preventDefault() }}
          data-modal="registerUser"
        >
          {t("login.label-href")}
        </Link>
      </Grid>
      <UserFeedback error={errorStatusResponse} setError={setErrorStatusResponse} />
    </Grid>
  )
}

export default LoginForm
