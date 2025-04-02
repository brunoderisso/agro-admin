import { CreditCardType } from "./CreditCard";

interface InvoicePixType {
  qrcode: string;
	qrcode_text: string;
	status: string;
	payer_cpf_cnpj: string;
	payer_name: string;
	end_to_end_id: string;
	end_to_end_refund_id: string;
	account_number_last_digits: string;
}

export interface InvoiceType {
  objectid: string;
	subscription_id: string;
	plan_name: string;
	customer_id: string;
	due_date: string;
	status: string;
	secure_url: string;
	total_paid_cents: number;
	total_cents: number;
	paid_at: string;
	paid_cents: number;
	payment_method: string;
	pix: InvoicePixType;
	credit_card_brand: string;
	credit_card_bin: number;
	credit_card_last_4: string;
	credit_card_captured_at: string;
	credit_card_tid: string;
	credit_card_transaction: CreditCardType;
}