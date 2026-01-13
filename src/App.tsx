/**
 * @fileoverview Componente raiz da aplicação
 */

import type { FC } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles";
import { CardsPage } from "./pages";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CardsPage />
    </ThemeProvider>
  );
};
