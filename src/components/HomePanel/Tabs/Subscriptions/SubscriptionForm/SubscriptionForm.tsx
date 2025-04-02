import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Button, Card, Grid, Typography } from "@mui/material"

import useStyles from "../../../../../styles/HomePanel/Tabs/Subscriptions/SubscriptionForm"
import CustomerSession from "./Customer/CustomerSession"
import PropertySession from "./Property/PropertySession"
import PlanSession from "./Plan/PlanSession"
import CouponSession from "./Coupon/CouponSession"
import DrawerNewCustomer from "./Customer/DrawerNewCustomer"
import UserFeedback from "../../../../Common/UserFeedback"
import DrawerNewProperty from "./Property/DrawerNewProperty"


function SubscriptionForm() {
  const [disabledCreate/*, setDisabledCreate*/] = useState<boolean>(false)
  const [openDrawerCustomer, setOpenDrawerCustomer] = useState<boolean>(false)
  const [openDrawerProperty, setOpenDrawerProperty] = useState<boolean>(false)
  const [errorStatus, setErrorStatus] = useState<string>("")

  const { classes } = useStyles({ disabledCreate })
  const { t } = useTranslation()
  const navigate = useNavigate()

  const cancelNewSubscription = () => {
    // TODO: trocar para rota de subscription, quando tiver
    navigate("/customer?start=0&limit=10")
  }

  const createSubscription = () => {

  }

  return (
    <Grid>
      <Grid className={classes.container}>
        <Grid container className={classes.header}>
          <Typography variant="h4" className={classes.title}>{t("homePanel.subscriptions.newSubscription")}</Typography>
          <Grid className={classes.buttonContainer}>
            <Button color="primary" className={classes.primaryBt} onClick={cancelNewSubscription}>
              <Typography className={classes.primaryText}>
                {t("general.modalCancelBtn")}
              </Typography>
            </Button>
            <Button
              variant="contained"
              className={classes.successBtn}
              onClick={createSubscription}
              disabled={disabledCreate}
            >
              <Typography variant="button" className={classes.successTextBtn}>{t("general.createBtn")}</Typography>
            </Button>
          </Grid>
        </Grid>
        <Card elevation={1} className={classes.wrapperCard}>
          <CustomerSession
            handleDrawer={setOpenDrawerCustomer}
            handleErrorStatus={setErrorStatus}
          />
          <PropertySession
            handleDrawer={setOpenDrawerProperty}
            handleErrorStatus={setErrorStatus}
          />
          <PlanSession handleErrorStatus={setErrorStatus} />
          <CouponSession handleErrorStatus={setErrorStatus} />
          <DrawerNewCustomer open={openDrawerCustomer} handleOpen={setOpenDrawerCustomer} handleErrorStatus={setErrorStatus} />
          <DrawerNewProperty open={openDrawerProperty} handleOpen={setOpenDrawerProperty} /*handleErrorStatus={setErrorStatus}*/ />
        </Card>
      </Grid>
      <UserFeedback error={errorStatus} setError={setErrorStatus} />
    </Grid>
  )
}

export default SubscriptionForm