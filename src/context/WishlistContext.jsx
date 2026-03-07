import { createContext, useContext, useEffect, useState } from 'react'
import { loadWishlist, saveWishlist } from '../data/mockApi.js'
import { useAuth } from "./AuthContext.jsx"

// WishlistContext manages items the user likes but
// does not want to buy yet.
// Each item is stored as { productId }.
const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isSignedIn } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!isSignedIn) {
      setItems([]);
      return;
    }
    setItems(loadWishlist());
  }, [isSignedIn]);

  const addToWishlist = (productId) => {
    if (!isSignedIn) {
      alert("Please Sign in");
      return;
    }
    const existingItem = items.some((item) => {
      return item.productId === productId;
    })

    if (existingItem) {
      return;
    }

    const updatedList = [...items, { productId }];
    setItems(updatedList);
    saveWishlist(updatedList);
  }

  const removeFromWishlist = (productId) => {
    if (!isSignedIn) {
      alert("Please Sign in");
      return;
    }
    const updatedList = items.filter((item) => {
      return item.productId !== productId;
    })
    setItems(updatedList);
    saveWishlist(updatedList);
  }

  const clearWishlist = () => {
    setItems([]);
    saveWishlist([]);
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

