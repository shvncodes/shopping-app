// This file pretends to be our \"backend API\".
// Under the hood it just reads/writes from localStorage,
// but the rest of the app can think about it like a service.

import { STORAGE_KEYS, loadFromStorage, saveToStorage, removeFromStorage } from './storage.js';

// ---------- Users & auth ----------

export function getAllUsers() {
  return loadFromStorage(STORAGE_KEYS.USERS, []);
}

export function saveAllUsers(users) {
  saveToStorage(STORAGE_KEYS.USERS, users);
}

export function createUser({ name, email, password }) {
  const users = getAllUsers();
  const existing = users.find((user) => user.email === email);
  if (existing) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    id: String(Date.now()),
    name,
    email,
    password,
  }
  const updated = [...users, newUser];
  saveAllUsers(updated);
  setCurrentUser(newUser);
  return newUser;
}

export function findUserByEmailAndPassword(email, password) {
  const users = getAllUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password.');
  }
  setCurrentUser(user);
  return user;
}

export function getCurrentUser() {
  return loadFromStorage(STORAGE_KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user) {
  if (!user) {
    removeFromStorage(STORAGE_KEYS.CURRENT_USER);
  } else {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
  }
}

export function clearCurrentUser() {
  removeFromStorage(STORAGE_KEYS.CURRENT_USER);
}

// ---------- Cart ----------

export function loadCart() {
  // Cart is a list of { productId, quantity }.
  return loadFromStorage(STORAGE_KEYS.CART, []);
}

export function saveCart(items) {
  saveToStorage(STORAGE_KEYS.CART, items);
}

// ---------- Wishlist ----------

export function loadWishlist() {
  // Wishlist is a list of { productId }.
  return loadFromStorage(STORAGE_KEYS.WISHLIST, []);
}

export function saveWishlist(items) {
  saveToStorage(STORAGE_KEYS.WISHLIST, items);
}

// ---------- Orders ----------

export function loadOrders() {
  // Orders are stored as an array of order objects.
  return loadFromStorage(STORAGE_KEYS.ORDERS, []);
}

export function saveOrders(orders) {
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
}

export function createOrder({ items, total }) {
  const existing = loadOrders();
  const newOrder = {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    items,
    total,
  }
  const updated = [...existing, newOrder];
  saveOrders(updated);
  return newOrder;
}

