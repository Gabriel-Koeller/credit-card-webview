/**
 * @fileoverview Hook para gerenciamento de cartões
 */

import { useState, useCallback, useMemo } from 'react';
import type { CreditCard, CardStatus } from '../types';

interface UseCardReturn {
  readonly cards: ReadonlyArray<CreditCard>;
  readonly selectedCard: CreditCard | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly selectCard: (cardId: string) => void;
  readonly getCardById: (cardId: string) => CreditCard | undefined;
  readonly getActiveCards: () => ReadonlyArray<CreditCard>;
  readonly getCardsByStatus: (status: CardStatus) => ReadonlyArray<CreditCard>;
  readonly setCards: (cards: CreditCard[]) => void;
  readonly setLoading: (loading: boolean) => void;
  readonly setError: (error: string | null) => void;
}

export const useCard = (initialCards: CreditCard[] = []): UseCardReturn => {
  const [cards, setCards] = useState<CreditCard[]>(initialCards);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCard = useMemo(() => {
    if (!selectedCardId) return null;
    return cards.find((card) => card.id === selectedCardId) ?? null;
  }, [cards, selectedCardId]);

  const selectCard = useCallback((cardId: string) => {
    setSelectedCardId(cardId);
  }, []);

  const getCardById = useCallback(
    (cardId: string): CreditCard | undefined => {
      return cards.find((card) => card.id === cardId);
    },
    [cards]
  );

  const getActiveCards = useCallback((): ReadonlyArray<CreditCard> => {
    return cards.filter((card) => card.status === 'active');
  }, [cards]);

  const getCardsByStatus = useCallback(
    (status: CardStatus): ReadonlyArray<CreditCard> => {
      return cards.filter((card) => card.status === status);
    },
    [cards]
  );

  return {
    cards,
    selectedCard,
    isLoading,
    error,
    selectCard,
    getCardById,
    getActiveCards,
    getCardsByStatus,
    setCards,
    setLoading,
    setError,
  };
};
