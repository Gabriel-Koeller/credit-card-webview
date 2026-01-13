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
  <svg 
    viewBox="0 0 750 471" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path d="M278.198,334.228l33.36-195.763h53.358l-33.384,195.763H278.198 L278.198,334.228z" />
    <path d="M524.307,142.687c-10.57-3.966-27.135-8.222-47.822-8.222 c-52.725,0-89.863,26.551-90.18,64.604c-0.297,28.129,26.514,43.821,46.754,53.185c20.77,9.597,27.752,15.716,27.652,24.283 c-0.133,13.123-16.586,19.116-31.924,19.116c-21.355,0-32.701-2.967-50.225-10.274l-6.877-3.112l-7.488,43.823 c12.463,5.466,35.508,10.199,59.438,10.445c56.09,0,92.502-26.248,92.916-66.884c0.199-22.27-14.016-39.216-44.801-53.188 c-18.65-9.056-30.072-15.099-29.951-24.269c0-8.137,9.668-16.838,30.559-16.838c17.447-0.271,30.088,3.534,39.936,7.5l4.781,2.259 L524.307,142.687" />
    <path d="M661.615,138.464h-41.23c-12.773,0-22.332,3.486-27.941,16.234 l-79.244,179.402h56.031c0,0,9.16-24.121,11.232-29.418c6.123,0,60.555,0.084,68.336,0.084c1.596,6.854,6.492,29.334,6.492,29.334 h49.512L661.615,138.464L661.615,138.464z M596.198,264.872c4.414-11.279,21.26-54.724,21.26-54.724 c-0.314,0.521,4.381-11.334,7.074-18.684l3.607,16.878c0,0,10.217,46.729,12.352,56.527h-44.293V264.872L596.198,264.872z" />
    <path d="M 45.878906 138.46484 L 45.197266 142.53711 C 66.290228 147.64311 85.129273 155.0333 101.62305 164.22656 L 148.96875 333.91406 L 205.42383 333.85156 L 289.42773 138.46484 L 232.90234 138.46484 L 180.66406 271.96094 L 175.09961 244.83008 C 174.83893 243.99185 174.55554 243.15215 174.26562 242.31055 L 156.10547 154.99219 C 152.87647 142.59619 143.50892 138.89684 131.91992 138.46484 L 45.878906 138.46484 z " />
  </svg>
);

const MastercardIcon: FC = () => (
  <svg 
    viewBox="0 -11 70 70" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M35.3945 34.7619C33.0114 36.8184 29.92 38.0599 26.5421 38.0599C19.0047 38.0599 12.8945 31.8788 12.8945 24.254C12.8945 16.6291 19.0047 10.448 26.5421 10.448C29.92 10.448 33.0114 11.6895 35.3945 13.7461C37.7777 11.6895 40.869 10.448 44.247 10.448C51.7843 10.448 57.8945 16.6291 57.8945 24.254C57.8945 31.8788 51.7843 38.0599 44.247 38.0599C40.869 38.0599 37.7777 36.8184 35.3945 34.7619Z" 
      fill="#ED0006" 
    />
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M35.3945 34.7619C38.3289 32.2296 40.1896 28.4616 40.1896 24.254C40.1896 20.0463 38.3289 16.2783 35.3945 13.7461C37.7777 11.6895 40.869 10.448 44.247 10.448C51.7843 10.448 57.8945 16.6291 57.8945 24.254C57.8945 31.8788 51.7843 38.0599 44.247 38.0599C40.869 38.0599 37.7777 36.8184 35.3945 34.7619Z" 
      fill="#F9A000" 
    />
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M35.3946 13.7461C38.329 16.2784 40.1897 20.0463 40.1897 24.254C40.1897 28.4616 38.329 32.2295 35.3946 34.7618C32.4603 32.2295 30.5996 28.4616 30.5996 24.254C30.5996 20.0463 32.4603 16.2784 35.3946 13.7461Z" 
      fill="#FF5E00" 
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
