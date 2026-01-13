/**
 * @fileoverview Página principal de cartões - Design Itaú
 */

import { type FC, useState, useCallback, useEffect } from "react";
import { CardList, CardSkeleton } from "../../components";
import { useWebView } from "../../hooks";
import { getMockCards, formatCurrency } from "../../services";
import type { CreditCard } from "../../types";
import * as S from "./CardsPage.styles";

export const CardsPage: FC = () => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { notifyCardSelected, notifyCardAction, notifyReady } = useWebView();

  useEffect(() => {
    const loadCards = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      const mockCards = getMockCards();
      // Para testar o CardSkeleton, comente a linha abaixo temporariamente:
      setCards(mockCards);
      // setCards([]); // Descomente esta linha para ver o CardSkeleton
      const firstCard = mockCards[0];
      if (firstCard) {
        setSelectedCard(firstCard);
      }
      setIsLoading(false);
      notifyReady();
    };

    loadCards();
  }, [notifyReady]);

  const handleCardSelect = useCallback(
    (card: CreditCard) => {
      setSelectedCard(card);
      notifyCardSelected(card.id);
    },
    [notifyCardSelected]
  );

  const handleAction = useCallback(
    (action: string) => {
      if (selectedCard) {
        notifyCardAction(selectedCard.id, action);
      }
    },
    [selectedCard, notifyCardAction]
  );

  if (isLoading) {
    return (
      <S.PageContainer>
        <S.Header>
          <S.BackButton>
            <ChevronLeftIcon />
          </S.BackButton>
          <S.HeaderTitle>Cartões</S.HeaderTitle>
        </S.Header>
        <S.Content>
          <LoadingState />
        </S.Content>
      </S.PageContainer>
    );
  }

  // Dados mock da fatura
  const invoiceAmount = 231.3;
  const dueDate = "27 out.";
  const closingDate = "19 out.";

  return (
    <S.PageContainer>
      <S.Header>
        <S.BackButton aria-label="Voltar">
          <ChevronLeftIcon />
        </S.BackButton>
        <S.HeaderTitle>Cartões</S.HeaderTitle>
      </S.Header>

      <S.Content>
        {/* Carousel de Cartões */}
        {cards.length < 0 ? (
          <CardSkeleton count={3} />
        ) : (
          <CardList
            cards={cards}
            selectedCardId={selectedCard?.id}
            onCardSelect={handleCardSelect}
          />
        )}

        {selectedCard && (
          <>
            {/* Seção de Fatura */}
            <S.InvoiceSection>
              <S.InvoiceInfo>
                <S.InvoiceLabel>Fatura aberta</S.InvoiceLabel>
                <S.InvoiceValue>{formatCurrency(invoiceAmount)}</S.InvoiceValue>
              </S.InvoiceInfo>
              <S.InvoiceButton onClick={() => handleAction("view-invoice")}>
                Acessar fatura
                <ChevronRightIcon />
              </S.InvoiceButton>
            </S.InvoiceSection>

            {/* Lista de Informações */}
            <S.InfoList>
              <S.InfoRow>
                <S.InfoLeft>
                  <S.InfoLabel>Débito automático</S.InfoLabel>
                </S.InfoLeft>
                <S.InfoRight>
                  <S.InfoValue $highlight>Desativado</S.InfoValue>
                </S.InfoRight>
              </S.InfoRow>

              <S.InfoRow>
                <S.InfoLeft>
                  <S.InfoLabel>Vencimento</S.InfoLabel>
                  <S.InfoSubLabel>Fechamento</S.InfoSubLabel>
                </S.InfoLeft>
                <S.InfoRight>
                  <S.InfoValue>{dueDate}</S.InfoValue>
                  <S.InfoSubValue>{closingDate}</S.InfoSubValue>
                </S.InfoRight>
              </S.InfoRow>

              <S.InfoRow>
                <S.InfoLeft>
                  <S.InfoLabel>Limite disponível</S.InfoLabel>
                  <S.InfoSubLabel>Limite total</S.InfoSubLabel>
                </S.InfoLeft>
                <S.InfoRight>
                  <S.InfoValue>
                    {formatCurrency(selectedCard.availableLimit)}
                  </S.InfoValue>
                  <S.InfoSubValue>
                    {formatCurrency(selectedCard.limit)}
                  </S.InfoSubValue>
                </S.InfoRight>
              </S.InfoRow>
            </S.InfoList>

            {/* Botão de Ação */}
            <S.PrimaryActionButton
              onClick={() => handleAction("anticipate-payment")}
            >
              Antecipar pagamento
            </S.PrimaryActionButton>

            {/* Seção de Serviços */}
            <S.ServicesSection>
              <S.SectionTitle>Serviços</S.SectionTitle>
              <S.ServicesGrid>
                <S.ServiceButton onClick={() => handleAction("block")}>
                  <S.ServiceIcon>
                    <LockIcon />
                  </S.ServiceIcon>
                  <S.ServiceLabel>Bloquear cartão</S.ServiceLabel>
                </S.ServiceButton>

                <S.ServiceButton onClick={() => handleAction("virtual-card")}>
                  <S.ServiceIcon>
                    <CardIcon />
                  </S.ServiceIcon>
                  <S.ServiceLabel>Cartão virtual</S.ServiceLabel>
                </S.ServiceButton>

                <S.ServiceButton onClick={() => handleAction("change-limit")}>
                  <S.ServiceIcon>
                    <LimitIcon />
                  </S.ServiceIcon>
                  <S.ServiceLabel>Ajustar limite</S.ServiceLabel>
                </S.ServiceButton>

                <S.ServiceButton
                  onClick={() => handleAction("change-password")}
                >
                  <S.ServiceIcon>
                    <KeyIcon />
                  </S.ServiceIcon>
                  <S.ServiceLabel>Alterar senha</S.ServiceLabel>
                </S.ServiceButton>
              </S.ServicesGrid>
            </S.ServicesSection>
          </>
        )}
      </S.Content>
    </S.PageContainer>
  );
};

// Loading state
const LoadingState: FC = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "48px" }}>
    <div
      style={{
        width: 32,
        height: 32,
        border: "3px solid #E8ECF0",
        borderTopColor: "#EC7000",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Ícones
const ChevronLeftIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const LockIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
    />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CardIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
    />
    <path d="M2 10h20" />
  </svg>
);

const LimitIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const KeyIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
