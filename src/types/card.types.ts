/**
 * @fileoverview Tipagens relacionadas aos cartões de crédito
 */

export type CardBrand = 'visa' | 'mastercard' | 'elo' | 'amex' | 'hipercard' | 'unknown';

export type CardStatus = 'active' | 'blocked' | 'expired' | 'pending';

export interface CreditCard {
  readonly id: string;
  readonly lastFourDigits: string;
  readonly cardholderName: string;
  readonly expirationMonth: number;
  readonly expirationYear: number;
  readonly brand: CardBrand;
  readonly status: CardStatus;
  readonly limit: number;
  readonly availableLimit: number;
  readonly isVirtual: boolean;
  readonly color?: CardColor;
}

export interface CardColor {
  readonly primary: string;
  readonly secondary: string;
  readonly text: string;
}

export interface CardAction {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly action: CardActionType;
  readonly disabled?: boolean;
}

export type CardActionType = 
  | 'block'
  | 'unblock'
  | 'virtual-card'
  | 'change-limit'
  | 'change-password'
  | 'view-invoice'
  | 'copy-number';

export interface CardInvoice {
  readonly id: string;
  readonly cardId: string;
  readonly month: number;
  readonly year: number;
  readonly totalAmount: number;
  readonly minimumPayment: number;
  readonly dueDate: string;
  readonly status: InvoiceStatus;
}

export type InvoiceStatus = 'open' | 'closed' | 'paid' | 'overdue';
