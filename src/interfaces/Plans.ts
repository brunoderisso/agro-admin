export interface PlanFeatureType {
  objectid: string;
  service_objectid: string;
  identifier: string;
  name: string;
  description: string;
  value?: number;
  measure?: string;
  show_map?: boolean;
  show_dashboard?: boolean;
  enable?: boolean;
  protect_accidental?: boolean;
  icon?: string;
}

export interface SubItemType {
  objectid?: string;
  plan_objectid?: string;
  description: string;
  price_cents: number;
  recurrent: boolean;
}

interface PlansSkeletonType {
  objectid?: string;
  name: string;
  features?: PlanFeatureType[];
  subitems?: SubItemType[];
}

export interface PlansType extends PlansSkeletonType {
  identifier?: string;
  description: string;
  enable: boolean;
  protect_accidental?: boolean;
  notes: string;
  interval?: number;
  interval_type: string;
  value_cents: number;
  payable_with?: string[];
  billing_days?: number;
  credits_based?: boolean;
  only_on_charge_success?: boolean;
  only_charge_on_due_date?: boolean;
  suspend_on_invoice_expired?: boolean;
  two_step?: boolean;
  max_cycles?: number;
  is_visible: boolean;
  environment_quantity?: number;
  payable: boolean;
}

export interface PlansTableType extends PlansSkeletonType {
  value: string;
  payments: string[];
  status: string;
  interval: string;
}

export interface ServicesType {
  objectid: string;
  name: string;
  description: string;
  enable: boolean;
  show_map: boolean;
  show_dashboard: boolean;
  features: PlanFeatureType[];
  protect_accidental: boolean;
  icon: string;
}