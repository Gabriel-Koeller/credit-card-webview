/**
 * @fileoverview Funções utilitárias
 */

/**
 * Formata número de cartão com máscara
 */
export const formatCardNumber = (lastFourDigits: string): string => {
  return `•••• •••• •••• ${lastFourDigits}`;
};

/**
 * Formata data de validade
 */
export const formatExpiryDate = (month: number, year: number): string => {
  const monthStr = month.toString().padStart(2, '0');
  const yearStr = year.toString().slice(-2);
  return `${monthStr}/${yearStr}`;
};

/**
 * Verifica se cartão está expirado
 */
export const isCardExpired = (month: number, year: number): boolean => {
  const now = new Date();
  const expiry = new Date(year, month - 1);
  return expiry < now;
};

/**
 * Classnames condicionais (similar ao clsx)
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Gera ID único
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * Verifica se está em ambiente WebView
 */
export const isWebView = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  return (
    // React Native WebView
    !!window.ReactNativeWebView ||
    // iOS WKWebView
    !!window.webkit?.messageHandlers?.nativeBridge ||
    // Android WebView
    !!window.nativeBridge ||
    // User agent hints
    userAgent.includes('wv') ||
    userAgent.includes('webview')
  );
};

/**
 * Verifica se está em ambiente mobile
 */
export const isMobile = (): boolean => {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  );
};

/**
 * Haptic feedback (se disponível)
 */
export const hapticFeedback = (
  type: 'light' | 'medium' | 'heavy' = 'light'
): void => {
  if ('vibrate' in navigator) {
    const durations = {
      light: 10,
      medium: 20,
      heavy: 40,
    };
    navigator.vibrate(durations[type]);
  }
};
