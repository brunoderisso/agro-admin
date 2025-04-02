export interface CreditCardType {
  objectid: string;
	invoice_id: string;
	status: string;
	lr: string;
	message: string;
	reversible: boolean;
	brand: string;
	bin: number;
	last4: string;
	description?: string;
	authorized_at: string;
	captured_at: string;
	canceled_at: string;
}