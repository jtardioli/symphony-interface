/**
 * When user changes wallets too fast, eg. using Framer,
 * it will cause unnecessary calls to API. We debounce
 * the API calls when wallet changes.
 */
export const walletChangeDelay = 750;
