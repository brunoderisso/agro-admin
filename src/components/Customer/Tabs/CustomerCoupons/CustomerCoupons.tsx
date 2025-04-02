import { useOutletContext } from "react-router-dom";

import { Typography } from "@mui/material";

import TabPanel from "../../../Common/TabPanel"
import useStyles from "../../../../styles/Customer/CustomerCoupons/CustomerCoupons"
import DiscountCoupons from "./DiscountCoupons"
import CustomerBreadcrumb from "../CustomerBreadcrumb";
import { CustomerType } from "../../../../interfaces/Customers";


function CustomerCoupons() {
  const [customer] = useOutletContext<[CustomerType]>()

  const { classes } = useStyles()

  return (
    <TabPanel value={5} index={5} className={classes.tabPanel}>
      <CustomerBreadcrumb customer={customer} tab="coupon?start=0&limit=10" />

      <Typography sx={{ margin: "24px 0px" }} variant="h1" className={classes.title}>
        Cupons utilizados
      </Typography>

      <DiscountCoupons customer={customer} />
    </TabPanel>
  )
}

export default CustomerCoupons