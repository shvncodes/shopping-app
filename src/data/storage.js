// Tiny wrapper around window.localStorage.
// We keep all JSON parsing / stringifying here so
// the rest of the app can just work with objects.

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const STORAGE_KEYS = {
  USERS: 'shopping_app_users',
  CURRENT_USER: 'shopping_app_current_user',
  CART: 'shopping_app_cart',
  WISHLIST: 'shopping_app_wishlist',
  ORDERS: 'shopping_app_orders',
  PRODUCTS: 'shopping_app_products'
}

// Safely read a JSON value from localStorage.
export function loadFromStorage(key, defaultValue) {
  if (!isBrowser) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

// Save a JSON value to localStorage.
export function saveToStorage(key, value) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // If something goes wrong (e.g. storage is full),
    // we simply ignore it for this learning project.
  }
}

export function removeFromStorage(key) {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore errors, same as above.
  }
}

