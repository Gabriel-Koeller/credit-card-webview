# Credit Card WebView

Aplicação React TypeScript mobile-first para visualização de cartões de crédito em WebView, com design inspirado no Itaú.

## 🚀 Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 7** - Build tool otimizado
- **Styled Components** - CSS-in-JS com tipagem completa
- **Embla Carousel** - Carousel performático com suporte a touch/swipe
- **Mobile-First Design** - Safe areas, viewport units (dvh), touch-friendly

## ✨ Features

- 🎴 **Carousel de Cartões** - Navegação suave com arrasto/swipe usando Embla Carousel
- 🎨 **Design Itaú** - Tema inspirado com cores laranja e tons claros
- 📱 **Mobile-First** - Otimizado para dispositivos móveis e WebView
- ⚡ **Performance** - Carousel otimizado com snap automático e animações suaves
- 🎯 **TypeScript Strict** - Tipagem completa e segura
- 🔄 **WebView Integration** - Comunicação bidirecional com app nativo

## 📁 Estrutura

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Button/          # Botão com variantes
│   ├── CardList/        # Carousel de cartões (Embla Carousel)
│   ├── CreditCard/      # Cartão visual com gradientes
│   └── Loading/         # Loading e skeletons
├── contexts/            # React Contexts
│   └── CardContext.tsx  # Estado global dos cartões
├── hooks/               # Hooks customizados
│   ├── useCard.ts       # Gerenciamento de cartões
│   └── useWebView.ts    # Comunicação com app nativo
├── pages/               # Páginas da aplicação
│   └── CardsPage/       # Tela principal com layout Itaú
├── services/            # Serviços e API
│   └── cardService.ts   # Dados mock e helpers
├── styles/              # Estilos globais
│   ├── GlobalStyles.ts  # Reset e estilos base (Montserrat)
│   ├── theme.ts         # Design tokens (tema Itaú)
│   └── styled.d.ts      # Tipagem do tema
├── types/               # Tipagens TypeScript
│   ├── card.types.ts    # Tipos de cartão
│   └── theme.types.ts   # Tipos do tema
└── utils/               # Funções utilitárias
    └── helpers.ts       # Formatação, validação
```

## 🎓 Conceitos e Padrões

Este projeto utiliza padrões e conceitos importantes do ecossistema React + TypeScript. Abaixo estão explicações didáticas dos principais conceitos aplicados:

### 📦 Barrel Exports (Barrel Files)

**O que é?**  
Barrel Exports é um padrão onde cada pasta possui um arquivo `index.ts` que centraliza e re-exporta os módulos daquela pasta, funcionando como uma "porta de entrada" pública.

**Por que usar?**

1. **Imports mais limpos e organizados**
   ```typescript
   // ❌ SEM barrel export (imports verbosos)
   import { CreditCard } from './components/CreditCard/CreditCard';
   import { CardBrandIcon } from './components/CreditCard/CardIcons';
   
   // ✅ COM barrel export (imports limpos)
   import { CreditCard, CardBrandIcon } from './components/CreditCard';
   ```

2. **Encapsulamento e controle de API pública**
   - Você decide o que é público e o que é privado
   - Arquivos internos podem ser reorganizados sem quebrar imports externos
   - O consumidor só precisa saber o nome da pasta, não dos arquivos internos

3. **Manutenção facilitada**
   - Um único lugar para gerenciar exports
   - Fácil adicionar/remover exports públicos
   - Reorganização de código sem impacto externo

**Como funciona no projeto?**

Estrutura de exemplo:
```
src/components/CreditCard/
  ├── CreditCard.tsx          ← implementação principal
  ├── CreditCard.styles.ts    ← estilos (detalhes internos)
  ├── CardIcons.tsx           ← componentes de ícones
  └── index.ts                ← "porta de entrada" pública
```

O arquivo `index.ts`:
```typescript
// src/components/CreditCard/index.ts
export { CreditCard } from './CreditCard';
export { CardBrandIcon, ContactlessIcon } from './CardIcons';
// Note: CreditCard.styles.ts não é exportado (privado)
```

Quando você importa:
```typescript
import { CreditCard, CardBrandIcon } from './components/CreditCard';
```

O TypeScript/JavaScript automaticamente resolve para `./components/CreditCard/index.ts`, que por sua vez re-exporta dos arquivos internos.

**Hierarquia de exports:**

O projeto utiliza uma estrutura hierárquica de barrel exports:
```
src/components/
  ├── CreditCard/index.ts  → exporta CreditCard, CardIcons
  ├── Button/index.ts      → exporta Button
  ├── CardList/index.ts    → exporta CardList
  └── index.ts             → re-exporta TODOS os componentes
```

Isso permite imports em diferentes níveis:
```typescript
// Importar de uma pasta específica
import { CreditCard } from './components/CreditCard';

// Importar múltiplos componentes de uma vez
import { CreditCard, Button, CardList } from './components';
```

**Analogia:**  
É como uma recepção de um prédio:
- Você não precisa saber onde cada pessoa mora (arquivo específico)
- Você vai até a recepção (`index.ts`)
- A recepção te direciona para o lugar certo (arquivo interno)

O `index.ts` é a "recepção" da pasta, centralizando o acesso aos seus conteúdos de forma organizada e controlada.

## 🛠️ Comandos

```bash
# Instalar dependências
npm install

# Desenvolvimento (http://localhost:3000)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📱 Comunicação WebView

O hook `useWebView` permite comunicação bidirecional com o app nativo:

```typescript
const { notifyCardSelected, notifyCardAction } = useWebView();

// Enviar mensagem para o app
notifyCardSelected(cardId);
notifyCardAction(cardId, 'block');
```

### Tipos de mensagem suportados:
- `READY` - WebView carregada
- `CARD_SELECTED` - Cartão selecionado
- `CARD_ACTION` - Ação executada
- `DATA_REQUEST` - Solicita dados
- `DATA_RESPONSE` - Resposta com dados

## 🎨 Customização

### Tema Itaú
O tema está configurado com cores inspiradas no Itaú:
- **Primary**: `#EC7000` (Laranja)
- **Secondary**: `#003366` (Azul escuro)
- **Background**: `#F5F6FA` (Cinza claro)
- **Font**: Montserrat (Google Fonts)

Edite `src/styles/theme.ts` para customizar cores, espaçamentos e tipografia.

### Carousel
O carousel usa **Embla Carousel** com as seguintes configurações:
- Alinhamento centralizado
- Snap automático para o card mais próximo
- Suporte completo a touch/swipe e mouse drag
- Indicadores de posição (dots)

### Cores dos cartões
Cada cartão pode ter cores personalizadas via propriedade `color`:

```typescript
const card: CreditCard = {
  // ...
  color: {
    primary: '#EC7000',
    secondary: '#003366',
    text: '#FFFFFF',
  }
};
```

### Fontes
A fonte **Montserrat** é carregada via Google Fonts no `index.html` e aplicada globalmente através do `GlobalStyles.ts` para garantir consistência em todos os componentes.

## 📦 Build para WebView

O build gera um bundle otimizado em `dist/`:

```bash
npm run build
```

O output pode ser servido em um servidor web ou incorporado diretamente na WebView nativa.

## 🎯 Componentes Principais

### CardList
Carousel horizontal de cartões com:
- Navegação por swipe/arrasto (touch e mouse)
- Indicadores de posição (dots)
- Snap automático para o card central
- Callback `onCardSelect` quando muda de slide
- Sincronização com `selectedCardId` externo

### CreditCard
Componente visual do cartão com:
- Gradientes personalizados por cartão
- Badge para cartões virtuais
- Ícones de bandeira (Visa, Mastercard, etc.)
- Chip e ícone contactless
- Animações de escala e opacidade

### CardsPage
Página principal com layout inspirado no Itaú:
- Header com botão de voltar
- Seção de fatura
- Lista de informações do cartão
- Botão de ação principal
- Seção de serviços rápidos

## 🔧 Dependências Principais

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "styled-components": "^6.3.6",
  "embla-carousel-react": "^8.6.0"
}
```
