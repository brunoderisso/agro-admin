import { create } from "zustand"
import { CustomersStateType } from "../interfaces/Customers"

export const useCustomerListStore = create<CustomersStateType>((set) => ({
  customers: [],
  setCustomers: (newCustomers) => set({ customers: newCustomers }),
  addCustomer: (newCustomer) => set((state) => ({
    customers: [...state.customers, newCustomer]
  }))
}))