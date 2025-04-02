import { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { Button, CircularProgress, Grid, Modal, Typography } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"

import useStyles from "../../styles/Common/CustomModal"
import sizes from "../../styles/Utils/SizesWindow"


function CustomModal(props) {
  const { classes } = useStyles()

  const [open, setOpen] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [leftButton, setLeftButton] = useState<boolean>(false)
  const [modalStyle] = useState(getModalStyle)
  const [size, setSize] = useState<string>(sizes.xs.toString() + "px")

  const { title = "", subtitle = "" } = props

  useEffect(() => {
    setOpen(props.open)

    if (props.size === "small") {
      setSize(sizes.xxs.toString() + "px")
    } else if (props.size === "medium") {
      setSize(sizes.xs.toString() + "px")
    }

    if (props.leftBt) {
      setLeftButton(true)
    } else {
      setLeftButton(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    if (props.loader !== null && props.loader !== undefined) {
      setLoader(props.loader)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loader])

  const handleClose = () => {
    if (typeof props.dispense.action === "function") {
      props.dispense.action(false, title)
    }
    setOpen(false)
  }

  function getModalStyle() {
    const top = 50
    const left = 50

    return {
      width: "600px",
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
  }

  const getActions = () => {
    return (
      <Grid container style={{ marginTop: "24px" }}>
        {leftButton &&
          <Grid item xs={3}>
            <Button
              className={classes.actionButton}
              onClick={props.leftBt?.action}
              style={{ color: props.leftBt?.color }}
            >
              {props.leftBt?.label}
            </Button>
          </Grid>
        }
        <Grid item xs={leftButton ? 9 : 12} className={classes.wrapperDefaultBt}>
          <Button className={classes.actionButton} onClick={handleClose} style={{ color: props.dispense.color }}>
            {props.dispense.label}
          </Button>
          <Button
            className={classes.actionButton}
            onClick={props.confirm.action}
            style={{ color: props.confirm.color, marginLeft: "24px" }}
            disabled={props.disableConfirmBt || loader}
          >
            {!loader && props.confirm.label}
            {loader && <CircularProgress className={classes.loader} />}
          </Button>
        </Grid>
      </Grid>
    )
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
          {props.warningText &&
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
          }
        </Grid>
      </Grid>
    )
  }

  const body = (
    <Grid style={{ ...modalStyle, width: size }} className={classes.paper}>
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

CustomModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  warningText: PropTypes.string,
  size: PropTypes.string,
  disableConfirmBt: PropTypes.bool,
  dispense: PropTypes.shape({
    label: PropTypes.any.isRequired,
    action: PropTypes.func,
  }),
  confirm: PropTypes.shape({
    label: PropTypes.any.isRequired,
    action: PropTypes.func.isRequired,
  }),
  leftBt: PropTypes.shape({
    label: PropTypes.any,
    action: PropTypes.func,
  }),
  loader: PropTypes.bool,
  children: PropTypes.any
}

export default CustomModal