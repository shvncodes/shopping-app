import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadCart, saveCart } from "../data/mockApi.js";
import { getProductById } from "../data/products.js";

// CartContext manages items the user intends to buy.
// Each item is stored as { productId, quantity }.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load initial cart from localStorage.
  useEffect(() => {
    setItems(loadCart());
  }, []);

  // Whenever the cart changes, persist it.
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = (productId, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => {
        return item.productId === productId;
      });
      if (existing) {
        return prevItems.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: item.quantity + quantity
            }
          }
          return item;
        })
      }
      return ([...prevItems, { productId, quantity }])
    });
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        if (item.productId === productId) return false;
        return true;
      });
    })
  }

  const updateQuantity = (productId, quantity) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: quantity
          }
        }
        return item;
      });
    })
  }

  const clearCart = () => {
    setItems([]);
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
