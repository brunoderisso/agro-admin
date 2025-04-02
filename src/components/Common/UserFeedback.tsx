import { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { Alert, Grid, Snackbar } from "@mui/material"


function UserFeedback(props) {
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setError(props.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleClose = (_, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setError("")
    if (typeof props.setError === "function") {
      props.setError("")
    }
  }

  return (
    <Grid>
      {props.error === "200" &&
        <Snackbar open={error.length > 0} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} elevation={6} variant="filled" severity="success">
            {props.message || "Realizado com sucesso!"}
          </Alert>
        </Snackbar>
      }
      {props.error === "400" &&
        <Snackbar open={error.length > 0} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} elevation={6} variant="filled" severity="error">
            {props.message || "Formato Inválido!"}
          </Alert>
        </Snackbar>
      }
      {props.error === "401" &&
        <Snackbar open={error.length > 0} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} elevation={6} variant="filled" severity="warning">
            {props.message || "Você não possui autorização!"}
          </Alert>
        </Snackbar>
      }
      {props.error === "403" &&
        <Snackbar open={error.length > 0} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} elevation={6} variant="filled" severity="warning">
            {props.message || "Alguma restrição está sendo inflingida."}
          </Alert>
        </Snackbar>
      }
      {props.error === "404" &&
        <Snackbar open={error.length > 0} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} elevation={6} variant="filled" severity="error">
            {props.message || "Não encontrou nenhum dado."}
          </Alert>
        </Snackbar>
      }
      {props.error === "422" &&
        <Snackbar open={error.length > 0} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} elevation={6} variant="filled" severity="error">
            {props.message || "Operação requisitada não pode ser realizada no momento."}
          </Alert>
        </Snackbar>
      }
      {props.error === "500" &&
        <Snackbar open={error.length > 0} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} elevation={6} variant="filled" severity="error">
            {props.message || "Sem resposta, tente novamente mais tarde."}
          </Alert>
        </Snackbar>
      }
    </Grid>
  )
}

UserFeedback.propTypes = {
  error: PropTypes.string.isRequired,
  message: PropTypes.string,
  setError: PropTypes.func.isRequired
}

export default UserFeedback