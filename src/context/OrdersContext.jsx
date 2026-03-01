import { createContext, useContext, useEffect, useState } from 'react'
import { createOrder, loadOrders } from '../data/mockApi.js'

// OrdersContext keeps track of all placed orders.
// Each order is stored with an id, createdAt, items and total.
const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, [])

  const registerOrder = ({ items, total }) => {
    const newOrder = createOrder({ items, total });
    setOrders((prev) => {
      return [...prev, newOrder];
    })
    return newOrder;
  }

  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === orderId) || null;
  }

  const getLatestOrder = () => {
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

