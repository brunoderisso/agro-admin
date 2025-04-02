import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Button, Grid, Modal, Typography } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"

import useStyles from "../../styles/Common/PredizaModal"
import sizes from "../../styles/Utils/SizesWindow"

function PredizaModal(props) {
  const [openState, setOpenState] = useState<boolean>(false)
  const [leftButton, setLeftButton] = useState<boolean>(false)
  const [size, setSize] = useState<string>(sizes.xs.toString() + "px")

  const { classes } = useStyles()

  const { open = false, title = "", subtitle = "" } = props

  useEffect(() => {
    setOpenState(open)

    if (props.size === "small") {
      setSize(sizes.xxs.toString() + "px")
    } else if (props.size === "medium") {
      setSize(sizes.xs.toString() + "px")
    } else if (props.customSize) {
      setSize(props.customSize + "px")
    }

    if (props.leftBt) {
      setLeftButton(true)
    } else {
      setLeftButton(false)
    }
  }, [props])

  const handleClose = () => {
    if (typeof props.dispense.action === "function") {
      props.dispense.action(false, title)
    }
    setOpenState(false)
  }

  const getContent = () => {
    return (
      <Grid item xs={12} style={{ marginTop: "24px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body2" className={classes.content}>
              {subtitle}
            </Typography>
          </Grid>
          {props.warningText && (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={1} style={{ alignSelf: "center" }}>
                  <ErrorIcon className={classes.icon} />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="caption" className={classes.content2}>
                    {props.warningText}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }

  const getActions = () => {
    return (
      <Grid container style={{ marginTop: "24px" }}>
        {leftButton && (
          <Grid item xs={3}>
            <Button
              className={classes.actionButton}
              onClick={props.leftBt?.action}
              style={{ color: props.leftBt?.color }}
            >
              {props.leftBt?.label}
            </Button>
          </Grid>
        )}
        <Grid item xs={leftButton ? 9 : 12} className={classes.wrapperDefaultBt}>
          <Button className={classes.actionButton} onClick={handleClose} style={{ color: props.dispense.color }}>
            {props.dispense.label}
          </Button>
          <Button
            className={classes.actionButton}
            onClick={props.confirm.action}
            style={{ color: props.confirm.color, marginLeft: "24px" }}
            disabled={props.disableConfirmBt}
          >
            {props.confirm.label}
          </Button>
        </Grid>
      </Grid>
    )
  }

  const body = (
    <Grid style={{ width: size }} className={classes.paper}>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        {getContent()}
        <Grid item xs={12}>
          {props.children}
        </Grid>
        {getActions()}
      </Grid>
    </Grid>
  )

  return (
    <div>
      <Modal open={openState} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  )
}

PredizaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  warningText: PropTypes.string,
  size: PropTypes.string,
  customSize: PropTypes.string,
  disableConfirmBt: PropTypes.bool,
  dispense: PropTypes.shape({
    label: PropTypes.any.isRequired,
    action: PropTypes.func,
    color: PropTypes.string // Adding color prop
  }),
  confirm: PropTypes.shape({
    label: PropTypes.any.isRequired,
    action: PropTypes.func.isRequired,
    color: PropTypes.string // Adding color prop
  }),
  leftBt: PropTypes.shape({
    label: PropTypes.any,
    action: PropTypes.func,
    color: PropTypes.string // Adding color prop
  }),
  children: PropTypes.any
}

export default PredizaModal
