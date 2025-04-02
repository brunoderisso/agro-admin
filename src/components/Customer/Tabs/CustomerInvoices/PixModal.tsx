import { useEffect, useState } from "react"

import PropTypes from "prop-types"
import moment from "moment"
import { Button, Grid, Grow, Modal, Typography } from "@mui/material"

import useStyles from "../../../../styles/Customer/CustomerInvoices/PixModal"

function PixModal(props) {

  const { classes } = useStyles()

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open])

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied])

  const handleClose = () => {
    setOpen(false)
    props.handleClose(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.invoice?.pix.qrcode_text);
    setCopied(true)
  }

  const getContent = () => {
    return (
      <Grid container item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <img src={props.invoice?.pix?.qrcode} alt="QRCode pix" width={"360px"} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h5" className={classes.textColor}>
              {"Total: R$ " + Number(props.invoice?.total_cents / 100).toFixed(2)}
            </Typography>
            <Typography variant="caption" className={classes.textColor}>
              {"Vencimento: " + moment(props.invoice?.due_date).format("DD/MM/YYYY")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const getActions = () => {
    return (
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Grid container>
          <Grid item xs={12}>
            <Button onClick={copyToClipboard}>
              Copiar Código Pix
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grow in={copied}>
              <Typography variant="overline" className={classes.feedback}>
                Código copiado com sucesso!
              </Typography>
            </Grow>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const body = (
    <Grid className={classes.paper}>
      <Grid container className={classes.container} spacing={5}>
        {props.invoice?.objectid && getContent()}
        {props.invoice?.objectid && getActions()}
      </Grid>
    </Grid>
  )

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

PixModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  invoice: PropTypes.object
}

export default PixModal