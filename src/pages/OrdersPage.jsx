import { AppLayout } from '../components/layout/AppLayout.jsx';
import { Card } from '../components/ui/Card.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { OrderCard } from '../components/orders/OrderCard.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import styles from './OrdersPage.module.css';

// Orders page: shows all past orders for the user.
export function OrdersPage() {
  const { orders } = useOrders();

  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Your orders</h1>
        {orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Place your first order to see it appear here."
            actionLabel="Browse products"
            onAction={() => (window.location.href = '/products')}
          />
        ) : (
          <Card subtle>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </Card>
        )}
      </section>
    </AppLayout>
  )
}

export default OrdersPage;