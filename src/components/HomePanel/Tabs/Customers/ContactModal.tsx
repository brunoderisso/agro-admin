import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Avatar, Button, Grid, IconButton, Modal, Typography } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

import useStyles from "../../../../styles/HomePanel/Tabs/Customers/ContactModal"
import toolsUtils from "../../../../utils/ToolsUtils"
import masksUtils from "../../../../utils/MasksUtils"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import CustomTooltip from "../../../Common/Themed/ThemedTooltip"

function ContactModal(props) {
  const { classes } = useStyles()

  const { t } = useTranslation()
  const navigate = useNavigate()

  const [open, setOpen] = useState<boolean>(false)
  const [hiddenPhone, setHiddenPhone] = useState<boolean>(false)

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  const handleClose = () => {
    setOpen(false)
    props.handle(false)
  }

  const redirectToEditUser = () => {
    navigate("/customer/" + props.customer.objectId + "/data")
  }

  const redirectToInvoices = () => {
    navigate("/customer/" + props.customer.objectId + "/invoice?start=0&limit=10")
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const getHeader = () => {
    return (
      <Grid container item xs={12} className={classes.wrapperHeader}>
        <Grid container justifyContent={"center"} className={classes.avatar}>
          <Avatar>{toolsUtils.getAvatar(props.customer)}</Avatar>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Typography variant="h5" className={classes.title}>
            {props.customer && `${props.customer.name} ${props.customer.surname}`}
          </Typography>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Typography className={classes.subtitle}>
            {props.customer && props.customer.typeAccount}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const getContent = () => {
    return (
      <Grid container item xs={12} className={classes.wrapperContent}>
        <Grid container justifyContent={"center"} sx={{ gap: "16px" }}>
          <Grid>
            <Typography>
              <span className={classes.textLabel}>E-mail:</span>
              <span className={classes.textData}>
                {props.customer && props.customer.email}
              </span>
            </Typography>
          </Grid>
          <Grid>
            <CustomTooltip title={
              <React.Fragment>
                <Typography className={classes.commonText}>
                  {t("homePanel.customers.modal.tooltip3")}
                </Typography>
              </React.Fragment>
            }>
              <IconButton
                aria-label="copy"
                size="small"
                color="inherit"
                className={classes.btOptions}
                onClick={() => { copyToClipboard(props.customer.email) }}
              >
                <ContentCopyIcon fontSize="small" className={classes.icons} />
              </IconButton>
            </CustomTooltip>
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} sx={{ gap: "16px" }}>
          <Grid>
            <Typography>
              <span className={classes.textLabel}>{t("homePanel.customers.modal.labelPhoneContact")}</span>
              <span className={classes.textData}>
                {hiddenPhone
                  ? " **************"
                  : props.customer?.phone ? ` ${masksUtils.formatPhone(props.customer.phone)}` : ConstantsUtils.NullFieldMask
                }
              </span>
            </Typography>
          </Grid>
          {!hiddenPhone &&
            <Grid>
              <CustomTooltip title={
                <React.Fragment>
                  <Typography className={classes.commonText}>
                    {t("homePanel.customers.modal.tooltip3")}
                  </Typography>
                </React.Fragment>
              }>
                <IconButton
                  aria-label="copy"
                  size="small"
                  color="inherit"
                  className={classes.btOptions}
                  onClick={() => { copyToClipboard(masksUtils.formatPhone(props.customer.phone)) }}
                >
                  <ContentCopyIcon fontSize="small" className={classes.icons} />
                </IconButton>
              </CustomTooltip>
            </Grid>
          }
          <Grid>
            <CustomTooltip title={
              <React.Fragment>
                <Typography className={classes.commonText}>
                  {hiddenPhone ? t("homePanel.customers.modal.tooltip1") : t("homePanel.customers.modal.tooltip2")}
                </Typography>
              </React.Fragment>
            }>
              <IconButton
                aria-label="show"
                size="small"
                color="inherit"
                className={classes.btOptions}
                onClick={() => { setHiddenPhone(!hiddenPhone) }}
              >
                {hiddenPhone
                  ? <VisibilityOffIcon fontSize="small" className={classes.icons} />
                  : <VisibilityIcon fontSize="small" className={classes.icons} />
                }
              </IconButton>
            </CustomTooltip>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const getActions = () => {
    return (
      <Grid item xs={12}>
        <Grid container>
          <Button className={classes.actionButton} onClick={redirectToEditUser}>
            {t("homePanel.customers.modal.button1Contact")}
          </Button>
          <Button sx={{ marginLeft: "auto" }} className={classes.actionButton} onClick={redirectToInvoices}>
            {t("homePanel.customers.modal.button2Contact")}
          </Button>
        </Grid>
      </Grid>
    )
  }

  const body = (
    <Grid className={classes.paper}>
      <Grid container className={classes.container} spacing={5}>
        {getHeader()}
        {getContent()}
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

ContactModal.propTypes = {
  open: PropTypes.bool,
  handle: PropTypes.func,
  customer: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.any,
    typeAccount: PropTypes.string,
    objectId: PropTypes.string,
  })
}

export default ContactModal