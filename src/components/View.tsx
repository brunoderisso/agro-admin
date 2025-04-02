import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { Box, CircularProgress, Grid, Grow } from "@mui/material"

import SessionStore from "../stores/SessionStore"
import useStyles from "../styles/View"

function View(props) {
  const { classes } = useStyles()

  const [preferenceFetched, setPreferenceFetched] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    SessionStore.getToken(navigate)

    SessionStore.addListener("fetch_preference", onFetchPreference)
    initPreference(SessionStore.getPreference() !== null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    SessionStore.getToken(navigate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const onFetchPreference = () => {
    initPreference(true)
  }

  const initPreference = (flag) => {
    setTimeout(() => {
      setPreferenceFetched(flag)
    }, 500)
  }

  return (
    <Grid>
      <Grow in={!preferenceFetched} mountOnEnter unmountOnExit>
        <Grid className={classes.center}>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </Grid>
      </Grow>

      <Grow in={preferenceFetched} mountOnEnter unmountOnExit>
        <Grid>
          {props.children}
        </Grid>
      </Grow>

    </Grid>
  )
}

export default View