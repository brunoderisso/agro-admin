import { useState, useEffect } from "react"

import Grid from "@mui/material/Grid"

import useStyles from "../../../styles/Access/NotFound/NotFoundPage"


function NotFoundPage(props) {
  const { classes } = useStyles()

  const [page, setPage] = useState("")

  useEffect(() => {
    setPage(props.page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return (
    <Grid className={classes.containerNotFound}>
      <Grid container>
        <Grid className={classes.codeError} item xs={12}>
          404
        </Grid>
        <Grid item xs={12} className={classes.textError}>
          A página {page} não foi encontrada!
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NotFoundPage