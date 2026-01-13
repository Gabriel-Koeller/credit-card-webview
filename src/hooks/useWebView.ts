/**
 * @fileoverview Hook para comunicação com WebView nativa
 */

import { useCallback, useEffect, useRef } from 'react';

type WebViewMessageType =
  | 'CARD_SELECTED'
  | 'CARD_ACTION'
  | 'NAVIGATION'
  | 'ERROR'
  | 'READY'
  | 'DATA_REQUEST'
  | 'DATA_RESPONSE';

interface WebViewMessage<T = unknown> {
  readonly type: WebViewMessageType;
  readonly payload: T;
  readonly timestamp: number;
}

interface CardSelectedPayload {
  readonly cardId: string;
}

interface CardActionPayload {
  readonly cardId: string;
  readonly action: string;
}

interface NavigationPayload {
  readonly route: string;
  readonly params?: Record<string, unknown>;
}

type MessagePayload =
  | CardSelectedPayload
  | CardActionPayload
  | NavigationPayload
  | Record<string, unknown>;

interface UseWebViewReturn {
  readonly postMessage: <T extends MessagePayload>(
    type: WebViewMessageType,
    payload: T
  ) => void;
  readonly notifyCardSelected: (cardId: string) => void;
  readonly notifyCardAction: (cardId: string, action: string) => void;
  readonly notifyReady: () => void;
  readonly notifyError: (error: string) => void;
  readonly requestData: (dataType: string) => void;
}

interface WebViewBridge {
  postMessage: (message: string) => void;
}

declare global {
  interface Window {
    ReactNativeWebView?: WebViewBridge;
    webkit?: {
      messageHandlers?: {
        nativeBridge?: WebViewBridge;
      };
    };
    nativeBridge?: WebViewBridge;
  }
}

export const useWebView = (
  onMessage?: (message: WebViewMessage) => void
): UseWebViewReturn => {
  const callbackRef = useRef(onMessage);

  // Atualiza referência do callback
  useEffect(() => {
    callbackRef.current = onMessage;
  }, [onMessage]);

  // Listener para mensagens do nativo
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const message =
          typeof event.data === 'string'
            ? (JSON.parse(event.data) as WebViewMessage)
            : (event.data as WebViewMessage);

        callbackRef.current?.(message);
      } catch (error) {
        console.error('[WebView] Failed to parse message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    document.addEventListener('message', handleMessage as EventListener);

    return () => {
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('message', handleMessage as EventListener);
    };
  }, []);

  const postMessage = useCallback(
    <T extends MessagePayload>(type: WebViewMessageType, payload: T) => {
      const message: WebViewMessage<T> = {
        type,
        payload,
        timestamp: Date.now(),
      };

      const messageString = JSON.stringify(message);

      // React Native WebView
      if (window.ReactNativeWebView?.postMessage) {
        window.ReactNativeWebView.postMessage(messageString);
        return;
      }

      // iOS WKWebView
      if (window.webkit?.messageHandlers?.nativeBridge?.postMessage) {
        window.webkit.messageHandlers.nativeBridge.postMessage(messageString);
        return;
      }

      // Android WebView
      if (window.nativeBridge?.postMessage) {
        window.nativeBridge.postMessage(messageString);
        return;
      }

      // Fallback para desenvolvimento (console)
      console.log('[WebView] Message (dev mode):', message);
    },
    []
  );

  const notifyCardSelected = useCallback(
    (cardId: string) => {
      postMessage('CARD_SELECTED', { cardId });
    },
    [postMessage]
  );

  const notifyCardAction = useCallback(
    (cardId: string, action: string) => {
      postMessage('CARD_ACTION', { cardId, action });
    },
    [postMessage]
  );

  const notifyReady = useCallback(() => {
    postMessage('READY', {});
  }, [postMessage]);

  const notifyError = useCallback(
    (error: string) => {
      postMessage('ERROR', { error });
    },
    [postMessage]
  );

  const requestData = useCallback(
    (dataType: string) => {
      postMessage('DATA_REQUEST', { dataType });
    },
    [postMessage]
  );

  return {
    postMessage,
    notifyCardSelected,
    notifyCardAction,
    notifyReady,
    notifyError,
    requestData,
  };
};
