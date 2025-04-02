interface ContentPaymentMethodType {
  holder_name: string;
  display_number: string;
  brand: string;
  month: number;
  year: number;
}

interface PaymentMethodType {
  objectid: string;
  customer_id: string;
  description: string;
  data: ContentPaymentMethodType;
  is_default: string;
}

export interface CustomerType {
  objectid: string;
  email: string;
  name: string;
  cpf_cnpj: string;
  zip_code: string;
  number: string;
  complement?: string;
  phone: string;
  phone_prefix: string;
  default_payment_method_id: string;
  city: string;
  state: string;
  country: string;
  district: string;
  street: string;
  custom_variables: string[];
  payment_methods?: PaymentMethodType[];
}

export interface CustomersStateType {
  customers: CustomerType[],
  setCustomers: (customers: CustomerType[]) => void,
  addCustomer: (customer: CustomerType) => void,
}

export interface CustomerTableType {
  objectId: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  typeAccount: string;
}