/**
 * @fileoverview Estilos do componente CardList (carousel)
 */

import styled, { css } from "styled-components";

export const CardListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const CarouselTrack = styled.div`
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const CarouselViewport = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  user-select: none;
  touch-action: pan-x;
`;

export const CarouselItem = styled.div<{ $isCenter: boolean }>`
  flex: 0 0 calc(100vw - 80px);
  width: calc(100vw - 80px);
  max-width: 280px;
  scroll-snap-align: center;
  transition: all ${({ theme }) => theme.transitions.normal};

  ${({ $isCenter }) =>
    !$isCenter &&
    css`
      opacity: 0.6;
      transform: scale(0.92);
    `}
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.sm};
`;

export const Dot = styled.button<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
  padding: 0;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    background: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : theme.colors.textMuted};
  }

  &:active {
    transform: scale(0.9);
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      width: 24px;
      background: linear-gradient(
        90deg,
        ${theme.colors.primary} 0%,
        ${theme.colors.primaryLight} 100%
      );
      box-shadow: 0 2px 8px rgba(236, 112, 0, 0.3);

      &:hover {
        background: linear-gradient(
          90deg,
          ${theme.colors.primary} 0%,
          ${theme.colors.primaryLight} 100%
        );
      }
    `}
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    width: 32px;
    height: 32px;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const EmptyDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 280px;
`;
