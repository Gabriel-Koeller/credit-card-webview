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

## 🎨 Tema do Projeto

O tema está configurado com cores inspiradas no Itaú:

- **Primary**: `#EC7000` (Laranja)
- **Secondary**: `#003366` (Azul escuro)
- **Background**: `#F5F6FA` (Cinza claro)
- **Font**: Montserrat (Google Fonts)

Edite `src/styles/theme.ts` para customizar cores, espaçamentos e tipografia.

## 🛠️ Como Rodar o Projeto

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

## 🎓 Conceitos e Padrões

Este projeto utiliza padrões e conceitos importantes do ecossistema React + TypeScript. Abaixo estão explicações didáticas dos principais conceitos aplicados:

### 📦 Barrel Exports (Barrel Files)

**O que é?**  
Barrel Exports é um padrão onde cada pasta possui um arquivo `index.ts` que centraliza e re-exporta os módulos daquela pasta, funcionando como uma "porta de entrada" pública.

**Por que usar?**

1. **Imports mais limpos e organizados**

   ```typescript
   // ❌ SEM barrel export (imports verbosos)
   import { CreditCard } from "./components/CreditCard/CreditCard";
   import { CardBrandIcon } from "./components/CreditCard/CardIcons";

   // ✅ COM barrel export (imports limpos)
   import { CreditCard, CardBrandIcon } from "./components/CreditCard";
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
export { CreditCard } from "./CreditCard";
export { CardBrandIcon, ContactlessIcon } from "./CardIcons";
// Note: CreditCard.styles.ts não é exportado (privado)
```

Quando você importa:

```typescript
import { CreditCard, CardBrandIcon } from "./components/CreditCard";
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
import { CreditCard } from "./components/CreditCard";

// Importar múltiplos componentes de uma vez
import { CreditCard, Button, CardList } from "./components";
```

**Analogia:**  
É como uma recepção de um prédio:

- Você não precisa saber onde cada pessoa mora (arquivo específico)
- Você vai até a recepção (`index.ts`)
- A recepção te direciona para o lugar certo (arquivo interno)

O `index.ts` é a "recepção" da pasta, centralizando o acesso aos seus conteúdos de forma organizada e controlada.

### 🔄 Context API (React Context)

**O que é?**  
Context API é uma funcionalidade do React que permite compartilhar estado entre componentes sem precisar passar props manualmente através de cada nível da árvore de componentes (prop drilling).

**Como funciona no projeto?**

O projeto utiliza `CardContext` para gerenciar o estado global dos cartões:

```typescript
// src/contexts/CardContext.tsx
export const CardProvider: FC<CardProviderProps> = ({ children }) => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  // ... lógica do contexto

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
```

**Uso do Provider:**

O `CardProvider` deve envolver a aplicação no componente raiz (`App.tsx`):

```typescript
// src/App.tsx
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
```

**Uso do Hook:**

Qualquer componente dentro do `CardProvider` pode acessar o contexto:

```typescript
import { useCardContext } from "../contexts";

const MyComponent: FC = () => {
  const { cards, selectedCard, selectCard, isLoading } = useCardContext();

  // Usar os dados e funções do contexto
  return <div>{/* ... */}</div>;
};
```

**Por que usar Context API?**

- Evita prop drilling (passar props por muitos níveis)
- Centraliza estado global
- Facilita compartilhamento de dados entre componentes distantes
- Separa lógica de estado da lógica de apresentação

**⚠️ Importante:**  
Sempre envolva a aplicação com o Provider. Sem ele, o hook `useCardContext` lançará um erro informando que deve ser usado dentro de um `CardProvider`.

### ⏳ Loading e Skeletons

**Arquitetura de Loading States:**

O projeto utiliza dois tipos de componentes para estados de carregamento:

#### 1. **Loading** - Loading de Tela Completa

Usado quando a página/tela inteira está carregando. Exibe um spinner centralizado com texto opcional.

```typescript
import { Loading } from "./components";

// Uso em tela completa
if (isLoading) {
  return (
    <PageContainer>
      <Loading text="Carregando seus cartões..." />
    </PageContainer>
  );
}
```

**Características:**

- Spinner animado centralizado
- Texto opcional personalizável
- Ideal para loading inicial da página

#### 2. **Skeletons** - Loading Parcial/Interno

Usado quando apenas partes específicas estão carregando. Exibem placeholders que simulam o layout final.

**Componentes disponíveis:**

```typescript
import { Skeleton, CardSkeleton, ListSkeleton } from './components';

// Skeleton genérico (customizável)
<Skeleton width="100%" height="20px" borderRadius="0.5rem" />

// Skeleton de cartão único
<CardSkeleton />
// ou
<CardSkeleton count={1} />

// Skeleton de múltiplos cartões (layout horizontal como carousel)
<CardSkeleton count={3} />

// Skeleton de lista (múltiplos itens verticais)
<ListSkeleton count={3} />
```

**Características do CardSkeleton:**

- **`count={1}` ou sem prop**: Exibe um único skeleton de cartão centralizado
- **`count > 1`**: Exibe múltiplos skeletons lado a lado em um container horizontal com scroll
  - Layout similar ao carousel de cartões
  - Scroll horizontal quando necessário
  - Snap scroll para melhor UX
  - Gap entre os skeletons

**Exemplo de uso:**

```typescript
// Cards ainda não carregaram - mostrar skeleton único
{
  cards.length === 0 ? <CardSkeleton /> : <CardList cards={cards} />;
}

// Mostrar múltiplos skeletons enquanto carrega (simulando carousel)
{
  isLoadingCards ? <CardSkeleton count={3} /> : <CardList cards={cards} />;
}

// Lista de informações carregando
{
  isLoadingDetails ? <ListSkeleton count={3} /> : <InfoList items={items} />;
}
```

**Por que usar Skeletons?**

- Melhor UX: mostra a estrutura enquanto carrega
- Reduz percepção de tempo de espera
- Mantém layout estável durante carregamento
- Evita "flash" de conteúdo

**Diferença entre Loading e Skeletons:**

| Tipo       | Quando Usar                    | Onde Usar                            |
| ---------- | ------------------------------ | ------------------------------------ |
| `Loading`  | Tela/página inteira carregando | Substitui toda a tela                |
| `Skeleton` | Parte específica carregando    | Dentro da tela, no lugar do conteúdo |

### 🪝 Hooks Customizados

O projeto possui hooks customizados que encapsulam lógica reutilizável:

#### **useWebView**

Hook para comunicação bidirecional com aplicativo nativo (WebView).

**Funcionalidades:**

- Enviar mensagens para o app nativo
- Receber mensagens do app nativo
- Suporte para React Native, iOS WKWebView e Android WebView

**Uso básico:**

```typescript
import { useWebView } from "./hooks";

const MyComponent: FC = () => {
  const { notifyCardSelected, notifyCardAction, notifyReady, requestData } =
    useWebView((message) => {
      // Callback para receber mensagens do nativo
      if (message.type === "DATA_RESPONSE") {
        const data = message.payload;
        // Processar dados recebidos
      }
    });

  // Notificar que está pronto
  useEffect(() => {
    notifyReady();
  }, [notifyReady]);

  // Enviar eventos
  const handleSelect = (cardId: string) => {
    notifyCardSelected(cardId);
  };

  const handleAction = (cardId: string, action: string) => {
    notifyCardAction(cardId, action);
  };

  // Solicitar dados
  const loadData = () => {
    requestData("cards");
  };

  return <div>{/* ... */}</div>;
};
```

**Métodos disponíveis:**

| Método               | Descrição                        | Payload                              |
| -------------------- | -------------------------------- | ------------------------------------ |
| `notifyCardSelected` | Notifica seleção de cartão       | `{ cardId: string }`                 |
| `notifyCardAction`   | Notifica ação no cartão          | `{ cardId: string, action: string }` |
| `notifyReady`        | Notifica que WebView está pronta | `{}`                                 |
| `notifyError`        | Notifica erro                    | `{ error: string }`                  |
| `requestData`        | Solicita dados do nativo         | `{ dataType: string }`               |
| `postMessage`        | Envia mensagem customizada       | `{ type, payload }`                  |

**Tipos de mensagem:**

- `READY` - WebView carregada
- `CARD_SELECTED` - Cartão selecionado
- `CARD_ACTION` - Ação executada no cartão
- `DATA_REQUEST` - Solicitação de dados
- `DATA_RESPONSE` - Resposta com dados
- `ERROR` - Erro ocorrido
- `NAVIGATION` - Navegação solicitada

#### **useCard**

Hook para gerenciamento local de cartões (alternativa ao Context).

**Funcionalidades:**

- Gerenciar lista de cartões
- Selecionar cartão
- Filtrar cartões por status
- Buscar cartão por ID

**Uso básico:**

```typescript
import { useCard } from "./hooks";
import type { CreditCard } from "./types";

const MyComponent: FC = () => {
  const {
    cards,
    selectedCard,
    isLoading,
    error,
    selectCard,
    getCardById,
    getActiveCards,
    getCardsByStatus,
    setCards,
    setLoading,
    setError,
  } = useCard(initialCards);

  // Selecionar cartão
  const handleSelect = (cardId: string) => {
    selectCard(cardId);
  };

  // Buscar cartão específico
  const card = getCardById("card-123");

  // Filtrar cartões ativos
  const activeCards = getActiveCards();

  // Filtrar por status
  const blockedCards = getCardsByStatus("blocked");

  return <div>{/* ... */}</div>;
};
```

**Métodos disponíveis:**

| Método             | Descrição                | Retorno                     |
| ------------------ | ------------------------ | --------------------------- |
| `selectCard`       | Seleciona um cartão      | `void`                      |
| `getCardById`      | Busca cartão por ID      | `CreditCard \| undefined`   |
| `getActiveCards`   | Retorna cartões ativos   | `ReadonlyArray<CreditCard>` |
| `getCardsByStatus` | Filtra por status        | `ReadonlyArray<CreditCard>` |
| `setCards`         | Define lista de cartões  | `void`                      |
| `setLoading`       | Define estado de loading | `void`                      |
| `setError`         | Define erro              | `void`                      |

**Quando usar `useCard` vs `CardContext`?**

- **`useCard`**: Para gerenciamento local de cartões em um componente específico
- **`CardContext`**: Para estado global compartilhado entre múltiplos componentes

## 📁 Estrutura do Projeto

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
├── mocks/               # Dados mockados para desenvolvimento
│   └── cards.mock.ts    # Dados mock de cartões
├── pages/               # Páginas da aplicação
│   └── CardsPage/       # Tela principal com layout Itaú
├── services/            # Serviços e API
├── styles/              # Estilos globais
│   ├── GlobalStyles.ts  # Reset e estilos base (Montserrat)
│   ├── theme.ts         # Design tokens (tema Itaú)
│   └── styled.d.ts      # Tipagem do tema
├── types/               # Tipagens TypeScript
│   ├── card.types.ts    # Tipos de cartão
│   └── theme.types.ts   # Tipos do tema
└── utils/               # Funções utilitárias
    ├── helpers.ts       # Helpers gerais (formatação, validação, etc)
    └── cardHelpers.ts   # Helpers específicos de cartões
```

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

### Loading

Componentes para estados de carregamento:

- **Loading**: Spinner centralizado para loading de tela completa
- **Skeleton**: Placeholder genérico customizável
- **CardSkeleton**: Skeleton específico para cartões
- **ListSkeleton**: Skeleton para listas com múltiplos itens

> **Nota:** Para detalhes sobre arquitetura de loading, consulte a seção [Loading e Skeletons](#-loading-e-skeletons) acima.

## 📱 Comunicação WebView

> **Nota:** Para detalhes completos sobre o hook `useWebView`, consulte a seção [Hooks Customizados](#-hooks-customizados) acima.

O hook `useWebView` permite comunicação bidirecional com aplicativos nativos (React Native, iOS, Android).

**Exemplo rápido:**

```typescript
const { notifyCardSelected, notifyCardAction, notifyReady } = useWebView();

// Notificar eventos
notifyCardSelected(cardId);
notifyCardAction(cardId, "block");
notifyReady(); // Quando WebView está pronta
```

**Suporte multiplataforma:**

- ✅ React Native WebView
- ✅ iOS WKWebView
- ✅ Android WebView
- ✅ Fallback para desenvolvimento (console.log)

## 🎨 Customização

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
    primary: "#EC7000",
    secondary: "#003366",
    text: "#FFFFFF",
  },
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

## 🔧 Dependências Principais

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "styled-components": "^6.3.6",
  "embla-carousel-react": "^8.6.0"
}
```
