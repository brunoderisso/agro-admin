interface AdditionalItemsType {
  description: string;
  value: number;
}

export interface SubscriptionType {
  plan_identifier?: string;
  plan_objectid?: string;
  customer_objectid?: string;
  coupon_objectid?: string;
}

export interface SubscriptionDataType {
  identifier: string;
  price: number;
  additionalPrice: number;
  hectare: number;
  additionalItems: AdditionalItemsType[];
  expiresAt: string;
  totalPortion: string;
  objectid: string;
  flagStatus: boolean;
  textStatus: string;
  pixQrCode: string;
  paymentMethod: string;
  ccBrand: string;
  ccFinalNumber: string;
}

interface BannerStatusButtonsType {
  label: string;
  href?: string;
}

export interface BannerStatusType {
  status: boolean;
  content: string;
  buttons: BannerStatusButtonsType[];
}