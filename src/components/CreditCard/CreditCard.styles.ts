/**
 * @fileoverview Estilos do componente CreditCard - Design Itaú
 */

import styled, { css, keyframes } from 'styled-components';
import type { CardStatus } from '../../types';

interface CardContainerProps {
  $primaryColor: string;
  $secondaryColor: string;
  $textColor: string;
  $status: CardStatus;
  $isSelected: boolean;
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const statusStyles = {
  active: css``,
  blocked: css`
    filter: grayscale(0.5) brightness(0.9);
  `,
  expired: css`
    filter: grayscale(0.8) brightness(0.7);
    opacity: 0.7;
  `,
  pending: css`
    opacity: 0.85;
    animation: ${css`${shimmer}`} 2s ease-in-out infinite;
  `,
};

export const CardWrapper = styled.div<{ $isSelected: boolean }>`
  perspective: 1000px;
  width: 100%;
`;

export const CardContainer = styled.div<CardContainerProps>`
  position: relative;
  width: 100%;
  aspect-ratio: 1.6;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ $primaryColor }) => $primaryColor};
  color: ${({ $textColor }) => $textColor};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;

  ${({ $status }) => statusStyles[$status]}

  &:active {
    transform: scale(0.98);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;
`;

export const BankLogo = styled.div`
  svg {
    height: 22px;
    width: auto;
  }
`;

export const DigitalBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 500;
  text-transform: lowercase;
  opacity: 0.9;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const CardMiddle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const CardChip = styled.div`
  width: 40px;
  height: 30px;
  background: linear-gradient(
    145deg,
    #ffd700 0%,
    #daa520 50%,
    #b8860b 100%
  );
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.4),
    0 2px 6px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 6px;
    right: 6px;
    height: 1px;
    background: rgba(0, 0, 0, 0.15);
  }

  &::after {
    content: '';
    position: absolute;
    top: 30%;
    bottom: 30%;
    left: 50%;
    width: 1px;
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  z-index: 1;
`;

export const CardBrand = styled.div<{ $brand?: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  svg {
    height: ${({ $brand }) => $brand === 'mastercard' ? '36px' : '28px'};
    width: auto;
    display: block;
    flex-shrink: 0;
  }
`;

export const StatusIndicator = styled.div<{ $status: CardStatus }>`
  display: none;
`;

// Mantidos para compatibilidade mas não utilizados no novo design
export const CardNumber = styled.div``;
export const CardNumberGroup = styled.span``;
export const CardDot = styled.span``;
export const CardInfo = styled.div``;
export const CardLabel = styled.span``;
export const CardValue = styled.span``;
export const CardExpiry = styled.div``;
export const VirtualBadge = styled.span``;
export const ContactlessIcon = styled.div``;
