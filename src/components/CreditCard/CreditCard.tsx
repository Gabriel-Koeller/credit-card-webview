/**
 * @fileoverview Componente visual do cartão de crédito - Design Itaú
 */

import type { FC } from 'react';
import type { CreditCard as CreditCardType } from '../../types';
import { CardBrandIcon } from './CardIcons';
import * as S from './CreditCard.styles';

interface CreditCardProps {
  readonly card: CreditCardType;
  readonly isSelected?: boolean;
  readonly onClick?: () => void;
}

const DEFAULT_COLORS = {
  primary: '#EC7000',
  secondary: '#D35400',
  text: '#ffffff',
};

export const CreditCard: FC<CreditCardProps> = ({
  card,
  isSelected = false,
  onClick,
}) => {
  const colors = card.color ?? DEFAULT_COLORS;

  return (
    <S.CardWrapper $isSelected={isSelected}>
      <S.CardContainer
        $primaryColor={colors.primary}
        $secondaryColor={colors.secondary}
        $textColor={colors.text}
        $status={card.status}
        $isSelected={isSelected}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`Cartão terminando em ${card.lastFourDigits}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <S.StatusIndicator $status={card.status} />

        <S.CardHeader>
          {/* Logo Itaú */}
          <S.BankLogo>
            <ItauLogo />
          </S.BankLogo>

          {/* Badge cartão digital */}
          <S.DigitalBadge>
            cartão digital
            <WifiIcon />
          </S.DigitalBadge>
        </S.CardHeader>

        <S.CardMiddle>
          <S.CardChip />
        </S.CardMiddle>

        <S.CardFooter>
          <S.CardBrand>
            <CardBrandIcon brand={card.brand} />
          </S.CardBrand>
        </S.CardFooter>
      </S.CardContainer>
    </S.CardWrapper>
  );
};

// Logo Itaú
const ItauLogo: FC = () => (
  <svg viewBox="0 0 60 24" fill="currentColor">
    <text 
      x="0" 
      y="20" 
      fontFamily="Montserrat, sans-serif" 
      fontSize="22" 
      fontWeight="700"
      letterSpacing="-1"
    >
      itaú
    </text>
  </svg>
);

// Ícone WiFi/Contactless
const WifiIcon: FC = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    <path d="M8 8c-1.657 0-3 1.343-3 3h1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5H11c0-1.657-1.343-3-3-3z"/>
    <path d="M8 4c-3.314 0-6 2.686-6 6h1.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5H14c0-3.314-2.686-6-6-6z"/>
  </svg>
);
