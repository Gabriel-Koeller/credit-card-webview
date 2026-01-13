/**
 * @fileoverview Componente CardList com carousel horizontal usando Embla Carousel
 */

import { type FC, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { CreditCard as CreditCardType } from '../../types';
import { CreditCard } from '../CreditCard';
import * as S from './CardList.styles';

interface CardListProps {
  readonly cards: ReadonlyArray<CreditCardType>;
  readonly onCardSelect?: (card: CreditCardType) => void;
  readonly selectedCardId?: string | undefined;
  readonly showDots?: boolean;
}

export const CardList: FC<CardListProps> = ({
  cards,
  onCardSelect,
  selectedCardId,
  showDots = true,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
    startIndex: 0,
  });

  const scrollToIndex = useCallback(
    (index: number) => {
      if (emblaApi && index >= 0 && index < cards.length) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi, cards.length]
  );

  const handleDotClick = useCallback(
    (index: number) => {
      scrollToIndex(index);
    },
    [scrollToIndex]
  );

  const handleCardClick = useCallback(
    (card: CreditCardType, index: number) => {
      if (index !== selectedIndex) {
        scrollToIndex(index);
      }
      onCardSelect?.(card);
    },
    [selectedIndex, onCardSelect, scrollToIndex]
  );

  // Sincronizar com cartão selecionado externamente
  useEffect(() => {
    if (selectedCardId && emblaApi) {
      const index = cards.findIndex((c) => c.id === selectedCardId);
      if (index !== -1) {
        const currentIndex = emblaApi.selectedScrollSnap();
        if (index !== currentIndex) {
          scrollToIndex(index);
        }
      }
    }
  }, [selectedCardId, cards, emblaApi, scrollToIndex]);

  // Atualizar índice selecionado e notificar quando o slide muda
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex(newIndex);
      const card = cards[newIndex];
      if (card && onCardSelect) {
        onCardSelect(card);
      }
    };

    emblaApi.on('select', onSelect);
    onSelect(); // Chama imediatamente para o slide inicial

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, cards, onCardSelect]);

  if (cards.length === 0) {
    return (
      <S.CardListContainer>
        <S.EmptyState>
          <S.EmptyIcon>
            <CreditCardEmptyIcon />
          </S.EmptyIcon>
          <S.EmptyTitle>Nenhum cartão encontrado</S.EmptyTitle>
          <S.EmptyDescription>
            Você ainda não possui cartões cadastrados. Adicione um novo cartão
            para começar.
          </S.EmptyDescription>
        </S.EmptyState>
      </S.CardListContainer>
    );
  }

  return (
    <S.CardListContainer>
      <S.CarouselWrapper>
        <S.CarouselTrack ref={emblaRef}>
          <S.CarouselViewport>
            {cards.map((card, index) => (
              <S.CarouselItem
                key={card.id}
                $isCenter={index === selectedIndex}
              >
                <CreditCard
                  card={card}
                  isSelected={
                    selectedCardId
                      ? card.id === selectedCardId
                      : index === selectedIndex
                  }
                  onClick={() => handleCardClick(card, index)}
                />
              </S.CarouselItem>
            ))}
          </S.CarouselViewport>
        </S.CarouselTrack>
      </S.CarouselWrapper>

      {showDots && cards.length > 1 && (
        <S.DotsContainer>
          {cards.map((card, index) => (
            <S.Dot
              key={`dot-${card.id}`}
              $isActive={index === selectedIndex}
              onClick={() => handleDotClick(index)}
              aria-label={`Ir para cartão ${index + 1}`}
            />
          ))}
        </S.DotsContainer>
      )}
    </S.CardListContainer>
  );
};

const CreditCardEmptyIcon: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
    <path d="M6 15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
