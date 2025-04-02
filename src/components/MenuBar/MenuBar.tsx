import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactGA from "react-ga"
import { useTranslation } from "react-i18next"

import { AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material"

import useStyles from "../../styles/MenuBar/MenuBar"
import logo from "../../img/prediza_logo_branco.png"
import toolsUtils from "../../utils/ToolsUtils"
import SessionStore from "../../stores/SessionStore"

function MenuBar() {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [anchors, setAnchors] = useState({
    anchorEl: null,
    mobileMoreAnchorEl: null
  })
  const [showProfile, setShowProfile] = useState<boolean>(false)
  const [preference, setPreference] = useState(null)

  const { anchorEl } = anchors
  const isMenuOpen = Boolean(anchorEl)

  useEffect(() => {
    bind()
    getToken()
    setPreference(SessionStore.getPreference())
    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bind = () => {
    SessionStore.addListener("check_login", getToken)
  }

  const clear = () => {
    SessionStore.removeListener("check_login", getToken)
  }

  const getToken = () => {
    const token = localStorage.getItem("token")

    if (token) {
      setShowProfile(true)
    } else {
      setShowProfile(false)
    }
  }

  const handleProfileMenuOpen = event => {
    setAnchors({ ...anchors, anchorEl: event.currentTarget })
  }

  const handleMenuClose = () => {
    setAnchors({ ...anchors, anchorEl: null, mobileMoreAnchorEl: null })
  }

  const handleLogout = () => {
    ReactGA.event({
      category: "navigation",
      action: "/click/menu/exit",
    })
    SessionStore.logout(() => {
      navigate("/login")
    })

    handleMenuClose()
  }

  return (
    <Grid id="headerMenuBar">
      <AppBar position="fixed" className={classes.appBar}>
        <Grid container alignItems="center" className={classes.wrapperContent}>
          <Grid item>
            <a href={"/finance/"}>
              <img alt="Logo Prediza" src={logo} className={classes.logo} />
            </a>
          </Grid>
          <Grid item>
            <Typography className={classes.subtitle}>{t("menuBar.title")}</Typography>
          </Grid>
          {showProfile &&
            <Grid item className={classes.iconProfile}>
              <Grid container justifyContent="flex-end" alignItems="center">
                <IconButton
                  aria-owns={isMenuOpen ? "material-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {preference?.picture
                    ? <Avatar src={preference.picture} alt={`${preference.name} ${preference.surname}`} />
                    : <Avatar>{toolsUtils.getAvatar(preference)}</Avatar>
                  }
                </IconButton>
              </Grid>
            </Grid>
          }
        </Grid>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem className={classes.menuText} onClick={handleLogout}>
          {t("menuBar.logout")}
        </MenuItem>
      </Menu>
    </Grid>
  )
}

export default MenuBar