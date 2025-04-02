import { CouponType } from "./Coupons";
import { CustomerType } from "./Customers";
import { PlansType } from "./Plans";

export interface CustomerStateType {
  selected: CustomerType,
  setSelected: (selected: CustomerType) => void
}

// TODO: criar interface de property
export interface PropertyStateType {
  selected: any,
  setSelected: (selected: any) => void
}

export interface PlanStateType {
  selected: PlansType,
  setSelected: (selected: PlansType) => void
}

export interface CouponStateType {
  selected: CouponType,
  setSelected: (selected: CouponType) => void
}