import { useParams } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import { Card } from '../components/ui/Card.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import { getProductById } from '../data/products.js';
import styles from './OrderDetailsPage.module.css';

// Detailed view for a single order.
export function OrderDetailsPage() {
  const { orderId } = useParams();

  const { getOrderById } = useOrders()
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <AppLayout>
        <EmptyState
          title="Order not found"
          description="This order id does not exist in localStorage."
          actionLabel="Back to orders"
          onAction={() => (window.location.href = '/orders')}
        />
      </AppLayout>
    );
  }

  const withProducts = order.items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity };
    })
    .filter(Boolean);

  const itemCount = withProducts.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Order details</h1>
        <p className={styles.meta}>
          Order id: {order.id} • {new Date(order.createdAt).toLocaleString()}
        </p>
        <Card>
          {withProducts.map((line) => (
            <p key={line.product.id} className={styles.placeholder}>
              {line.product.name} × {line.quantity} — ₹ {line.product.price * line.quantity}
            </p>
          ))}
          <p className={styles.placeholder}>
            Total items: {itemCount} • Total paid: ₹ {order.total}
          </p>
        </Card>
      </section>
    </AppLayout>
  );
}

export default OrderDetailsPage;