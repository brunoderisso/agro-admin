import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Grid } from "@mui/material"

import useStyles from "../../styles/Access/AccessPage"
import LoginForm from "./Login/LoginForm"
import SigninForm from "./Signin/SigninForm"
import ActiveForm from "./Active/ActiveForm"
import ForgotSentForm from "./Forgot/ForgotSentForm"
import ForgotForm from "./Forgot/ForgotForm"


function AcessPage(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [page, setPage] = useState("")

  useEffect(() => {
    setPage(props.page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return (
    <Grid className={classes.container}>
      <Grid item xs={12}>
        <Grid container className={classes.body}>
          <Grid item xs={12} md={8} style={{ alignSelf: "center" }}>
            <Grid className={classes.infoArea}>
              {t("login.title")}
            </Grid>
          </Grid>
          {page !== "" &&
            <Grid item xs={12} md={4}>
              {page === "login" &&
                <LoginForm />
              }
              {page === "signin" &&
                <SigninForm />
              }
              {page === "active" &&
                <ActiveForm token={props.token} />
              }
              {page === "forgotsent" &&
                <ForgotSentForm />
              }
              {page === "forgot" &&
                <ForgotForm token={props.token} />
              }
            </Grid>
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AcessPage