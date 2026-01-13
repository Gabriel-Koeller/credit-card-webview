/**
 * @fileoverview Componente raiz da aplicação
 */

import type { FC } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles";
import { CardsPage } from "./pages";
import { CardProvider } from "./contexts";

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CardProvider>
        <CardsPage />
      </CardProvider>
    </ThemeProvider>
  );
};
