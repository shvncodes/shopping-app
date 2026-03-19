// This file pretends to be our \"backend API\".
// Under the hood it just reads/writes from localStorage,
// but the rest of the app can think about it like a service.

import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
} from "./storage.js";

// ---------- Users & auth ----------

export function getAllUsers() {
  return loadFromStorage(STORAGE_KEYS.USERS, []);
}

export function saveAllUsers(users) {
  saveToStorage(STORAGE_KEYS.USERS, users);
}

export function createUser({ name, email, age, gender, password, isBlocked }) {
  const users = getAllUsers();
  const existing = users.find((user) => user.email === email);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: String(Date.now()),
    name,
    email,
    age,
    gender,
    password,
    isBlocked,
  };
  const updated = [...users, newUser];
  saveAllUsers(updated);
  setCurrentUser(newUser);
  return newUser;
}

export function findUserByEmailAndPassword(email, password) {
  const users = getAllUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  setCurrentUser(user);
  return user;
}

export function updateUser(user) {
  const users = loadFromStorage(STORAGE_KEYS.USERS, []);
  const updatedUser = users.map((u) => {
    if (user.id !== u.id) return u;
    return {
      ...u,
      name: user.name.trim(),
      age: user.age,
      gender: user.gender,
      password: user.password,
    };
  });

  saveToStorage(STORAGE_KEYS.USERS, updatedUser);
  return updatedUser;
}

export function blockUser(userId) {
  const users = loadFromStorage(STORAGE_KEYS.USERS, []);
  const updatedUsers = users.map((u) => {
    if (userId !== u.id) return u;
    return {
      ...u,
      isBlocked: !u.isBlocked,
    };
  });
  saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
  return updatedUsers;
}

export function deleteUser(userId) {
  const users = loadFromStorage(STORAGE_KEYS.USERS, []);
  const updatedUsers = users.filter((u) => u.id !== userId);
  saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
  return updatedUsers;
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

// ---------- Products ---------

export function loadProducts() {
  return loadFromStorage(STORAGE_KEYS.PRODUCTS, []);
}

export function saveProduct(product) {
  const products = loadFromStorage(STORAGE_KEYS.PRODUCTS, []);
  saveToStorage(STORAGE_KEYS.PRODUCTS, [product, ...products]);
}

export function updateProduct(product) {
  const products = loadFromStorage(STORAGE_KEYS.PRODUCTS, []);
  const updatedProducts = products.map((item) => {
    if (item.id !== product.id) return item;
    return {
      ...item,
      name: product.name.trim(),
      description: product.description.trim(),
      badge: product.badge.trim(),
      type: product.type.trim(),
      price: product.price,
      category: product.category.trim(),
    };
  });
  saveToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
}

export function clearProducts() {
  removeFromStorage(STORAGE_KEYS.PRODUCTS);
}

// ---------- Cart ----------

export function loadCart(userId) {
  // Cart is a object of userId: productList.
  const cartData = loadFromStorage(STORAGE_KEYS.CART, {});
  return cartData[userId] || [];
}

export function saveCart(userId, items = []) {
  const cartData = loadFromStorage(STORAGE_KEYS.CART, {});
  cartData[userId] = items;
  saveToStorage(STORAGE_KEYS.CART, cartData);
}

// ---------- Wishlist ----------

export function loadWishlist(userId) {
  // Wishlist is a object of userId: productList.
  const wishlistData = loadFromStorage(STORAGE_KEYS.WISHLIST, {});
  return wishlistData[userId] || [];
}

export function saveWishlist(userId, items = []) {
  const wishlistData = loadFromStorage(STORAGE_KEYS.WISHLIST, {});
  wishlistData[userId] = items;
  saveToStorage(STORAGE_KEYS.WISHLIST, wishlistData);
}

// ---------- Orders ----------

export function loadOrders(userId) {
  // Orders are stored as an array of order objects.
  const orderedData = loadFromStorage(STORAGE_KEYS.ORDERS, {});
  return orderedData[userId] || [];
}

export function saveOrders(userId, orders = []) {
  const orderedData = loadFromStorage(STORAGE_KEYS.ORDERS, {});
  orderedData[userId] = orders;
  saveToStorage(STORAGE_KEYS.ORDERS, orderedData);
}

export function createOrder(userId, { items, total }) {
  const existing = loadOrders(userId);
  const newOrder = {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    items,
    total,
  };
  const updated = [...existing, newOrder];
  saveOrders(userId, updated);
  return newOrder;
}
