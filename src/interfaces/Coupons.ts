export interface CouponType {
  objectid?: string;
  plan_objectid?: string;
  name: string;
  discount: number;
  enable?: boolean;
  amount: number;
  recurrent: boolean;
  expirer_at: string;
  plan_id?: string;
  status?: "Ativo" | "Inativo";
  value?: string;
  created_at?: string;
}