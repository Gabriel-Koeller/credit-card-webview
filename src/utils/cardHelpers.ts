/**
 * @fileoverview Funções utilitárias relacionadas a cartões
 */

import type { CreditCard, CardBrand, CardColor } from '../types';

const CARD_COLORS: Record<CardBrand, CardColor> = {
  visa: {
    primary: "#EC7000",
    secondary: "#D35400",
    text: "#FFFFFF",
  },
  mastercard: {
    primary: "#003366",
    secondary: "#002244",
    text: "#FFFFFF",
  },
  elo: {
    primary: "#FF8C2E",
    secondary: "#EC7000",
    text: "#FFFFFF",
  },
  amex: {
    primary: "#1A4D7C",
    secondary: "#003366",
    text: "#FFFFFF",
  },
  hipercard: {
    primary: "#EC7000",
    secondary: "#C55A00",
    text: "#FFFFFF",
  },
  unknown: {
    primary: "#5C6370",
    secondary: "#3D4450",
    text: "#FFFFFF",
  },
};

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
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
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
export const getCardStatusText = (status: CreditCard["status"]): string => {
  const statusTexts: Record<CreditCard["status"], string> = {
    active: "Ativo",
    blocked: "Bloqueado",
    expired: "Expirado",
    pending: "Pendente",
  };
  return statusTexts[status];
};
