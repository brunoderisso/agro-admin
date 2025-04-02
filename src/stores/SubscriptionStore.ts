import { create } from "zustand"

import { CouponStateType, CustomerStateType, PlanStateType, PropertyStateType } from "../interfaces/Subscriptions"


export const useCustomerStore = create<CustomerStateType>((set) => ({
  selected: null,
  setSelected: (newCustomer) => set({ selected: newCustomer })
}))

export const usePropertyStore = create<PropertyStateType>((set) => ({
  selected: null,
  setSelected: (newProperty) => set({ selected: newProperty })
}))

export const usePlanStore = create<PlanStateType>((set) => ({
  selected: null,
  setSelected: (newPlan) => set({ selected: newPlan })
}))

export const useCouponStore = create<CouponStateType>((set) => ({
  selected: null,
  setSelected: (newCoupon) => set({ selected: newCoupon })
}))