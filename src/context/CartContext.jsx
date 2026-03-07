import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadCart, saveCart } from "../data/mockApi.js";
import { getProductById } from "../data/products.js";
import { useAuth } from "./AuthContext.jsx";

// CartContext manages items the user intends to buy.
// Each item is stored as { productId, quantity }.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isSignedIn, user } = useAuth();

  const [items, setItems] = useState([]);

  // Load initial cart from localStorage.
  useEffect(() => {
    if (!isSignedIn) {
      setItems([])
      return;
    }

    setItems(loadCart(user.id));
  }, [isSignedIn]);

  const addToCart = (productId, quantity = 1) => {
    if (!isSignedIn) {
      alert("Please Sign in");
      return;
    }
    let updatedCartItems = items;

    const existingItem = items.find((item) => {
      return item.productId === productId;
    })

    if (existingItem) {
      updatedCartItems = items.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      })
    } else {
      updatedCartItems = [...items, { productId, quantity }];
    }

    setItems(updatedCartItems);
    saveCart(user.id, updatedCartItems);
  }

  const removeFromCart = (productId) => {
    if (!isSignedIn) {
      alert("Please Sign in");
      return;
    }
    const updatedCartItems = items.filter((item) => {
      if (item.productId === productId) return false;
      return true;
    });

    setItems(updatedCartItems);
    saveCart(user.id, updatedCartItems);
  }

  const updateQuantity = (productId, quantity) => {
    if (!isSignedIn) {
      alert("Please Sign in");
      return;
    }
    const updatedCartItems = items.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: quantity
        }
      }
      return item;
    });

    setItems(updatedCartItems);
    saveCart(user.id, updatedCartItems);
  }

  const clearCart = () => {
    setItems([]);
    saveCart(user.id, []);
  };

  // Derive some convenient values based on items.
  const { itemCount, subtotal } = useMemo(() => {
    let totalProductCount = 0;
    let totalPrice = 0;

    for (const item of items) {
      const product = getProductById(item.productId);
      totalPrice += (product.price * item.quantity);
      totalProductCount += item.quantity;
    }

    return { itemCount: totalProductCount, subtotal: totalPrice };
  }, [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return ctx;
}
