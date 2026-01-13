/**
 * @fileoverview Context para gerenciamento global de cartões
 */

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type FC,
  type ReactNode,
} from 'react';
import type { CreditCard, CardStatus } from '../types';
import { useWebView } from '../hooks';

interface CardContextState {
  readonly cards: ReadonlyArray<CreditCard>;
  readonly selectedCard: CreditCard | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

interface CardContextActions {
  readonly selectCard: (cardId: string) => void;
  readonly refreshCards: () => Promise<void>;
  readonly getCardById: (cardId: string) => CreditCard | undefined;
  readonly getActiveCards: () => ReadonlyArray<CreditCard>;
  readonly getCardsByStatus: (status: CardStatus) => ReadonlyArray<CreditCard>;
}

type CardContextValue = CardContextState & CardContextActions;

const CardContext = createContext<CardContextValue | null>(null);

interface CardProviderProps {
  readonly children: ReactNode;
  readonly initialCards?: CreditCard[];
}

export const CardProvider: FC<CardProviderProps> = ({
  children,
  initialCards = [],
}) => {
  const [cards, setCards] = useState<CreditCard[]>(initialCards);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { notifyCardSelected, notifyReady, requestData } = useWebView(
    (message) => {
      // Processar mensagens do nativo
      if (message.type === 'DATA_RESPONSE') {
        const payload = message.payload as { cards?: CreditCard[] };
        if (payload.cards) {
          setCards(payload.cards);
          setIsLoading(false);
        }
      }
    }
  );

  // Notificar que está pronto ao montar
  useEffect(() => {
    notifyReady();
  }, [notifyReady]);

  const selectedCard =
    cards.find((card) => card.id === selectedCardId) ?? null;

  const selectCard = useCallback(
    (cardId: string) => {
      setSelectedCardId(cardId);
      notifyCardSelected(cardId);
    },
    [notifyCardSelected]
  );

  const refreshCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    requestData('cards');
  }, [requestData]);

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

  const value: CardContextValue = {
    cards,
    selectedCard,
    isLoading,
    error,
    selectCard,
    refreshCards,
    getCardById,
    getActiveCards,
    getCardsByStatus,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardContext = (): CardContextValue => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error('useCardContext must be used within a CardProvider');
  }

  return context;
};
