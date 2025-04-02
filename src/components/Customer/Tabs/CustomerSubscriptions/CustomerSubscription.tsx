import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import { Button, Grid, Typography } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"

import TabPanel from "../../../Common/TabPanel"
import useStyles from "../../../../styles/Customer/CustomerSubscriptions/CustomerSubscription"
import SubscriptionCards from "./SubscriptionCards"
import CustomerBreadcrumb from "../CustomerBreadcrumb"
import { CustomerType } from "../../../../interfaces/Customers"


function CustomerSubscription() {
  const { classes, cx } = useStyles()

  const [showBanner, setShowBanner] = useState<boolean>(false)
  const [contentBanner, setContentBanner] = useState<string>("")
  const [buttonsBanner, setButtonsBanner] = useState([])

  const [customer] = useOutletContext<[CustomerType]>()

  const handleBanner = (object) => {
    setShowBanner(object.status)
    setContentBanner(object.content)
    setButtonsBanner(object.buttons)
  }

  const warningBanner = () => {
    return (
      <Grid className={classes.warningMessage}>
        <Grid className={classes.contentWarning}>
          <ErrorIcon />
          <Typography className={classes.warningText}>
            {contentBanner}
          </Typography>
        </Grid>
        <Grid className={classes.wrapperWarningBtn}>
          {buttonsBanner.map((button, index) => {
            return (
              <Button key={index} color="primary" className={classes.propBtn} href={button.href} target="_blank">
                <Typography className={classes.warningTextBtn}>{button.label}</Typography>
              </Button>
            )
          })}
        </Grid>
      </Grid>
    )
  }

  return (
    <TabPanel
      value={1}
      index={1}
      className={classes.tabPanel}
      Banner={showBanner ? warningBanner : null}
    >
      <CustomerBreadcrumb
        className={cx({
          [classes.wrapperBreadcrumb]: showBanner
        })}
        customer={customer}
        tab="subscription"
      />

      <Typography sx={{ margin: "24px 0px" }} variant="h1" className={classes.title}>
        Assinaturas Contratadas
      </Typography>

      <SubscriptionCards customer={customer} handleBanner={handleBanner} />
    </TabPanel>
  )
}

export default CustomerSubscription