/**
 * @fileoverview Dados mockados de cartões para desenvolvimento
 */

import type { CreditCard } from '../types';

/**
 * Gera dados mock de cartões para desenvolvimento
 */
export const getMockCards = (): CreditCard[] => [
  {
    id: "card-001",
    lastFourDigits: "7821",
    cardholderName: "Gabriel Silva",
    expirationMonth: 3,
    expirationYear: 2027,
    brand: "mastercard",
    status: "active",
    limit: 8000,
    availableLimit: 4200,
    isVirtual: false,
    color: {
      primary: "#003366",
      secondary: "#002244",
      text: "#FFFFFF",
    },
  },
  {
    id: "card-002",
    lastFourDigits: "4589",
    cardholderName: "Gabriel Silva",
    expirationMonth: 8,
    expirationYear: 2028,
    brand: "visa",
    status: "active",
    limit: 15000,
    availableLimit: 12500,
    isVirtual: false,
    color: {
      primary: "#EC7000",
      secondary: "#D35400",
      text: "#FFFFFF",
    },
  },
  {
    id: "card-003",
    lastFourDigits: "1234",
    cardholderName: "Gabriel Silva",
    expirationMonth: 12,
    expirationYear: 2026,
    brand: "elo",
    status: "blocked",
    limit: 5000,
    availableLimit: 5000,
    isVirtual: true,
    color: {
      primary: "#FF8C2E",
      secondary: "#EC7000",
      text: "#FFFFFF",
    },
  },
];
