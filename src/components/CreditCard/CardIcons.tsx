/**
 * @fileoverview Ícones das bandeiras de cartão
 */

import type { FC } from 'react';
import type { CardBrand } from '../../types';

interface CardBrandIconProps {
  readonly brand: CardBrand;
}

export const CardBrandIcon: FC<CardBrandIconProps> = ({ brand }) => {
  switch (brand) {
    case 'visa':
      return <VisaIcon />;
    case 'mastercard':
      return <MastercardIcon />;
    case 'elo':
      return <EloIcon />;
    case 'amex':
      return <AmexIcon />;
    case 'hipercard':
      return <HipercardIcon />;
    default:
      return <GenericCardIcon />;
  }
};

const VisaIcon: FC = () => (
  <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.5 21H17L14.5 11H17L18.5 17.5L20 11H22.5L19.5 21Z"
      fill="currentColor"
    />
    <path d="M23 11H25.5V21H23V11Z" fill="currentColor" />
    <path
      d="M27 18C27 19.5 28 20 29.5 20C30.5 20 31.5 19.5 32 19L32.5 21C31.5 21.5 30.5 22 29 22C26.5 22 24.5 20.5 24.5 17.5C24.5 14 26.5 11 29.5 11C32.5 11 34 13 34 16V18H27ZM31 16C31 14.5 30.5 13.5 29.5 13.5C28.5 13.5 27.5 14.5 27 16H31Z"
      fill="currentColor"
    />
    <path
      d="M35 21H37.5L38 19.5H41L41.5 21H44L41 11H38.5L35 21ZM38.5 17.5L39.5 14L40.5 17.5H38.5Z"
      fill="currentColor"
    />
  </svg>
);

const MastercardIcon: FC = () => (
  <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="16" r="10" fill="#EB001B" />
    <circle cx="30" cy="16" r="10" fill="#F79E1B" />
    <path
      d="M24 8.8C26.4 10.6 28 13.6 28 17C28 20.4 26.4 23.4 24 25.2C21.6 23.4 20 20.4 20 17C20 13.6 21.6 10.6 24 8.8Z"
      fill="#FF5F00"
    />
  </svg>
);

const EloIcon: FC = () => (
  <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="16" rx="2" fill="#FFCB05" />
    <text
      x="24"
      y="20"
      textAnchor="middle"
      fontSize="10"
      fontWeight="bold"
      fill="#000"
    >
      elo
    </text>
  </svg>
);

const AmexIcon: FC = () => (
  <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="24" rx="2" fill="#016FD0" />
    <text
      x="24"
      y="18"
      textAnchor="middle"
      fontSize="6"
      fontWeight="bold"
      fill="#FFF"
    >
      AMERICAN
    </text>
    <text
      x="24"
      y="24"
      textAnchor="middle"
      fontSize="6"
      fontWeight="bold"
      fill="#FFF"
    >
      EXPRESS
    </text>
  </svg>
);

const HipercardIcon: FC = () => (
  <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="24" rx="2" fill="#B3131B" />
    <text
      x="24"
      y="20"
      textAnchor="middle"
      fontSize="8"
      fontWeight="bold"
      fill="#FFF"
    >
      HIPER
    </text>
  </svg>
);

const GenericCardIcon: FC = () => (
  <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="4"
      y="4"
      width="40"
      height="24"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <rect x="4" y="10" width="40" height="6" fill="currentColor" opacity="0.3" />
  </svg>
);

export const ContactlessIcon: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4C7.58 4 4 7.58 4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 8C9.79 8 8 9.79 8 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 12H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
