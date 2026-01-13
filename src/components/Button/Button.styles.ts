/**
 * @fileoverview Estilos do componente Button
 */

import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyledProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
}

const variantStyles = {
  primary: css`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.primaryDark} 100%
    );
    color: ${({ theme }) => theme.colors.text};
    border: none;

    &:hover:not(:disabled) {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.primaryLight} 0%,
        ${({ theme }) => theme.colors.primary} 100%
      );
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surfaceElevated};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.border};
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1.5px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary}15;
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surface};
      color: ${({ theme }) => theme.colors.text};
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.text};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.errorLight};
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    min-height: 36px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    gap: ${({ theme }) => theme.spacing.xs};
  `,
  md: css`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    min-height: 44px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    gap: ${({ theme }) => theme.spacing.sm};
  `,
  lg: css`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    min-height: 52px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    gap: ${({ theme }) => theme.spacing.sm};
  `,
};

export const Button = styled.button<ButtonStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  white-space: nowrap;
  user-select: none;
  position: relative;
  overflow: hidden;

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      pointer-events: none;
      
      & > *:not(.button-spinner) {
        opacity: 0;
      }
    `}
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: inherit;
`;

export const ButtonSpinner = styled.span.attrs({ className: 'button-spinner' })`
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;
  }
`;
