import { createContext, useContext, useEffect, useState } from 'react'
import { loadWishlist, saveWishlist } from '../data/mockApi.js'

// WishlistContext manages items the user likes but
// does not want to buy yet.
// Each item is stored as { productId }.
const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadWishlist());
  }, []);

  useEffect(() => {
    saveWishlist(items);
  }, [items]);

  const addToWishlist = (productId) => {
    setItems((prev) => {
      if (prev.some((item) => item.productId === productId)) {
        return prev;
      }
      return [...prev, { productId }];
    })
  }

  const removeFromWishlist = (productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  const clearWishlist = () => {
    setItems([]);
  }

  const value = {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used inside a WishlistProvider');
  }
  return ctx;
}

