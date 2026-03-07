import { createContext, useContext, useEffect, useState } from 'react'
import { createOrder, loadOrders } from '../data/mockApi.js'
import { useAuth } from './AuthContext.jsx';

// OrdersContext keeps track of all placed orders.
// Each order is stored with an id, createdAt, items and total.
const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const { isSignedIn, user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isSignedIn) {
      setOrders([]);
      return;
    }
    setOrders(loadOrders(user.id));
  }, [isSignedIn])

  const registerOrder = ({ items, total }) => {
    if (!isSignedIn) {
      alert("Please Sign in");
      return;
    }
    const newOrder = createOrder(user.id, { items, total });
    setOrders((prev) => {
      return [...prev, newOrder];
    })
    return newOrder;
  }

  const getOrderById = (orderId) => {
    if (!isSignedIn) {
      alert("Please Sign in");
      return;
    }
    return orders.find((order) => order.id === orderId) || null;
  }

  const getLatestOrder = () => {
    if (!isSignedIn) {
      alert("Please Sign in");
      return;
    }
    if (!orders.length) return null;
    return orders[orders.length - 1];
  }

  const value = {
    orders,
    registerOrder,
    getOrderById,
    getLatestOrder,
  }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error('useOrders must be used inside an OrdersProvider');
  }
  return ctx;
}

