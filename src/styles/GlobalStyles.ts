/**
 * @fileoverview Estilos globais da aplicação - Mobile First
 */

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }

  html {
    font-size: 16px !important;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-family: ${({ theme }) => theme.typography.fontFamily} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    background: ${({ theme }) => theme.colors.background} !important;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily} !important;
    font-size: ${({ theme }) => theme.typography.fontSize.md} !important;
    font-weight: ${({ theme }) =>
      theme.typography.fontWeight.regular} !important;
    line-height: ${({ theme }) =>
      theme.typography.lineHeight.normal} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    background: ${({ theme }) => theme.colors.background} !important;
    min-height: 100vh !important;
    min-height: 100dvh !important;
    overflow-x: hidden;
    margin: 0 !important;
    padding: 0 !important;
    
    /* Safe area para dispositivos com notch */
    padding-top: env(safe-area-inset-top) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
    padding-left: env(safe-area-inset-left) !important;
    padding-right: env(safe-area-inset-right) !important;
  }

  #root {
    min-height: 100vh !important;
    min-height: 100dvh !important;
    display: flex !important;
    flex-direction: column !important;
    font-family: ${({ theme }) => theme.typography.fontFamily} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    background: ${({ theme }) => theme.colors.background} !important;
  }

  /* Reset mínimo para botões - styled-components terão prioridade natural */
  button {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    cursor: pointer;
    touch-action: manipulation;
  }

  a {
    font-family: ${({ theme }) => theme.typography.fontFamily} !important;
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily} !important;
    font-weight: ${({ theme }) =>
      theme.typography.fontWeight.semibold} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    margin: 0;
    padding: 0;
  }

  p, span, label {
    font-family: ${({ theme }) => theme.typography.fontFamily} !important;
    color: ${({ theme }) => theme.colors.text} !important;
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.typography.fontFamily} !important;
    font-size: inherit;
    border: none !important;
    outline: none !important;
    background: transparent !important;
    color: ${({ theme }) => theme.colors.text} !important;
  }

  /* Scrollbar customizada */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};

    &:hover {
      background: ${({ theme }) => theme.colors.borderLight};
    }
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.text};
  }

  /* Focus visible para acessibilidade */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Animação suave ao entrar na página */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
