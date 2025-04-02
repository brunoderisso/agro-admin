import { useTranslation } from "react-i18next"

import { ButtonBase, Grid } from "@mui/material"

import useStyles from "../../../styles/Access/Login/SocialLoginButton"
import GoogleIcon from "../../../img/icons/icons_google.svg?react"
import MicrosoftIcon from "../../../img/icons/icons_microsoft.svg?react"
import YahooIcon from "../../../img/icons/icons_yahoo.svg?react"
import PredizaIcon from "../../../img/PA_logo_azul_claro.svg?react"
import { SocialLoginButtonProps } from "../../../interfaces/Access/Login"


function SocialLoginButton(props: SocialLoginButtonProps) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const getSocialClassName = () => {
    switch (props.social) {
      case "google":
        return classes.containerGoogle;
      case "microsoft":
        return classes.containerMicrosoft;
      case "yahoo":
        return classes.containerYahoo;
      case "prediza":
        return classes.containerPrediza;
      default:
        return "";
    }

    // if (props.social === "google") {
    //   return classes.containerGoogle
    // }
    // if (props.social === "microsoft") {
    //   return classes.containerMicrosoft
    // }
    // if (props.social === "yahoo") {
    //   return classes.containerYahoo
    // }
    // if (props.social === "prediza") {
    //   return classes.containerPrediza
    // }
  }

  return (
    <Grid>
      <ButtonBase style={{ width: "-webkit-fill-available" }} onClick={props.onClick}>
        <Grid container className={getSocialClassName()}>
          <Grid item xs={3} className={classes.googleIconContainer}>
            {props.social === "google" &&
              <GoogleIcon className={classes.icon} />
            }
            {props.social === "microsoft" &&
              <MicrosoftIcon className={classes.icon} />
            }
            {props.social === "yahoo" &&
              <YahooIcon className={classes.icon} />
            }
            {props.social === "prediza" &&
              <PredizaIcon className={classes.icon} />
            }
          </Grid>

          <Grid item xs={9} style={{ color: "white" }}>
            {props.label || ((props.social === "google" && "Sign In With Google") ||
              (props.social === "yahoo" && "Sign In With Yahoo") ||
              (props.social === "prediza" && t("login.login-btn", { social: "Prediza" })) ||
              (props.social === "microsoft" && "Sign In With Microsoft"))}
          </Grid>
        </Grid>
      </ButtonBase>
    </Grid>
  )
}

export default SocialLoginButton