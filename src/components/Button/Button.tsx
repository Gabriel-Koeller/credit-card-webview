/**
 * @fileoverview Componente Button reutilizável
 */

import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import * as S from './Button.styles';
import type { ButtonVariant, ButtonSize } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly fullWidth?: boolean;
  readonly isLoading?: boolean;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
  readonly children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...rest
}) => {
  return (
    <S.Button
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <S.ButtonSpinner />}
      <S.ButtonContent>
        {leftIcon && <S.IconWrapper>{leftIcon}</S.IconWrapper>}
        {children}
        {rightIcon && <S.IconWrapper>{rightIcon}</S.IconWrapper>}
      </S.ButtonContent>
    </S.Button>
  );
};
