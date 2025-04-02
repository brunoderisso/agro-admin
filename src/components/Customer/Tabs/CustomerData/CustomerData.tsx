import { useOutletContext } from "react-router-dom"

import { Typography } from "@mui/material"

import TabPanel from "../../../Common/TabPanel"
import CustomerForm from "./CustomerForm"
import useStyles from "../../../../styles/Customer/CustomerData"
import CustomerBreadcrumb from "../CustomerBreadcrumb"
import { CustomerType } from "../../../../interfaces/Customers"

function CustomerData() {
  const [customer] = useOutletContext<[CustomerType]>()

  const { classes } = useStyles()

  return (
    <TabPanel value={0} index={0} className={classes.tabPanel} >
      <CustomerBreadcrumb customer={customer} tab="data" />

      <Typography sx={{ margin: "24px 0px" }} variant="h1" className={classes.title}>
        Dados de faturamento
      </Typography>

      <CustomerForm customer={customer} />
    </TabPanel>
  )
}

export default CustomerData