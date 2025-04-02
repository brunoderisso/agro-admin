import { Route, Routes } from "react-router-dom"

import Home from "../views/Home"
import Customer from "../views/Customer"
import PlanForm from "../views/PlanForm"
import Access from "./Access/Access"
import NotFoundPage from "./Access/NotFound/NotFoundPage"
import CustomerTab from "./HomePanel/Tabs/Customers/CustomerTab"
import CouponsTab from "./HomePanel/Tabs/Coupons/CouponsTab"
import PlansTab from "./HomePanel/Tabs/Plans/PlansTab"
import CustomerSubscription from "./Customer/Tabs/CustomerSubscriptions/CustomerSubscription"
import CustomerData from "./Customer/Tabs/CustomerData/CustomerData"
import CustomerProperties from "./Customer/Tabs/CustomerProperties/CustomerProperties"
import CustomerPayments from "./Customer/Tabs/CustomerPayments/CustomerPayments"
import CustomerInvoices from "./Customer/Tabs/CustomerInvoices/CustomerInvoices"
import CustomerCoupons from "./Customer/Tabs/CustomerCoupons/CustomerCoupons"
import AdvancedMapPage from "./AdvancedMapPage/AdvancedMapPage"
import SubscriptionForm from "../views/SubscriptionForm"

function Main() {
  return (
    <Routes>
      <Route path="/:page" element={<Access />} />
      <Route path="map" element={<AdvancedMapPage />} />
      <Route path="/" element={<Home />}>
        <Route path="customer" element={<CustomerTab />} />
        <Route path="plan" element={<PlansTab />} />
        <Route path="coupon" element={<CouponsTab />} />
      </Route>

      <Route path="/customer/:id/" element={<Customer />}>
        <Route path="subscription" element={<CustomerSubscription />} />
        <Route path="data" element={<CustomerData />} />
        <Route path="property" element={<CustomerProperties />} />
        <Route path="payment" element={<CustomerPayments />} />
        <Route path="invoice" element={<CustomerInvoices />} />
        <Route path="coupon" element={<CustomerCoupons />} />
      </Route>

      <Route path="plan/new" element={<PlanForm />} />
      <Route path="plan/:id/edit" element={<PlanForm />} />
      <Route path="subscription/new" element={<SubscriptionForm />} />


      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Main