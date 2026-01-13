/**
 * @fileoverview Serviço de cartões (API/Mock)
 */

import type { CreditCard, CardBrand, CardColor } from '../types';

const CARD_COLORS: Record<CardBrand, CardColor> = {
  visa: {
    primary: '#EC7000',
    secondary: '#D35400',
    text: '#FFFFFF',
  },
  mastercard: {
    primary: '#003366',
    secondary: '#002244',
    text: '#FFFFFF',
  },
  elo: {
    primary: '#FF8C2E',
    secondary: '#EC7000',
    text: '#FFFFFF',
  },
  amex: {
    primary: '#1A4D7C',
    secondary: '#003366',
    text: '#FFFFFF',
  },
  hipercard: {
    primary: '#EC7000',
    secondary: '#C55A00',
    text: '#FFFFFF',
  },
  unknown: {
    primary: '#5C6370',
    secondary: '#3D4450',
    text: '#FFFFFF',
  },
};

/**
 * Gera dados mock de cartões para desenvolvimento
 */
export const getMockCards = (): CreditCard[] => [
  {
    id: 'card-001',
    lastFourDigits: '4589',
    cardholderName: 'Gabriel Silva',
    expirationMonth: 8,
    expirationYear: 2028,
    brand: 'visa',
    status: 'active',
    limit: 15000,
    availableLimit: 12500,
    isVirtual: false,
    color: {
      primary: '#EC7000',
      secondary: '#D35400',
      text: '#FFFFFF',
    },
  },
  {
    id: 'card-002',
    lastFourDigits: '7821',
    cardholderName: 'Gabriel Silva',
    expirationMonth: 3,
    expirationYear: 2027,
    brand: 'mastercard',
    status: 'active',
    limit: 8000,
    availableLimit: 4200,
    isVirtual: false,
    color: {
      primary: '#003366',
      secondary: '#002244',
      text: '#FFFFFF',
    },
  },
  {
    id: 'card-003',
    lastFourDigits: '1234',
    cardholderName: 'Gabriel Silva',
    expirationMonth: 12,
    expirationYear: 2026,
    brand: 'elo',
    status: 'blocked',
    limit: 5000,
    availableLimit: 5000,
    isVirtual: true,
    color: {
      primary: '#FF8C2E',
      secondary: '#EC7000',
      text: '#FFFFFF',
    },
  },
];

/**
 * Retorna a cor padrão para uma bandeira
 */
export const getCardColorByBrand = (brand: CardBrand): CardColor => {
  return CARD_COLORS[brand] ?? CARD_COLORS.unknown;
};

/**
 * Formata limite monetário
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Calcula porcentagem de limite utilizado
 */
export const calculateUsedLimitPercentage = (
  limit: number,
  availableLimit: number
): number => {
  if (limit <= 0) return 0;
  const used = limit - availableLimit;
  return Math.round((used / limit) * 100);
};

/**
 * Retorna texto de status do cartão
 */
export const getCardStatusText = (
  status: CreditCard['status']
): string => {
  const statusTexts: Record<CreditCard['status'], string> = {
    active: 'Ativo',
    blocked: 'Bloqueado',
    expired: 'Expirado',
    pending: 'Pendente',
  };
  return statusTexts[status];
};
