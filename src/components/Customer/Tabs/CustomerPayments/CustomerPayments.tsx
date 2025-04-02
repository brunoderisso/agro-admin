import { useOutletContext } from "react-router-dom"

import { Typography } from "@mui/material"

import TabPanel from "../../../Common/TabPanel"
import useStyles from "../../../../styles/Customer/CustomerPayments/CustomerPayments"
import PaymentsCards from "./PaymentsCards"
import CustomerBreadcrumb from "../CustomerBreadcrumb"
import { CustomerType } from "../../../../interfaces/Customers"


function CustomerPayments() {
  const [customer] = useOutletContext<[CustomerType]>()

  const { classes } = useStyles()

  return (
    <TabPanel value={3} index={3} className={classes.tabPanel} >
      <CustomerBreadcrumb customer={customer} tab="payment" />

      <Typography sx={{ margin: "24px 0px" }} variant="h1" className={classes.title}>
        Meios de Pagamento
      </Typography>

      <PaymentsCards customer={customer} />
    </TabPanel>
  )
}

export default CustomerPayments