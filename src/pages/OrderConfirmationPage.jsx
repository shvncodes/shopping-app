import { Link, useParams } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import { Button } from '../components/ui/Button.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import styles from './OrderConfirmationPage.module.css';

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { getOrderById, getLatestOrder } = useOrders();

  const order = orderId ? getOrderById(orderId) : getLatestOrder();

  if (!order) {
    return (
      <AppLayout>
        <EmptyState
          title="No recent order found"
          description="Looks like you have not placed an order yet."
          actionLabel="Start shopping"
          onAction={() => (window.location.href = '/products')}
        />
      </AppLayout>
    )
  }

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.badge}>Order placed</div>
        <h1 className={styles.title}>Your glow goodies are on the way ✨</h1>
        <p>
          This is a fake store, but the React logic is real. We saved this order in localStorage so
          you can still see it even after refreshing the page.
        </p>
        <p>
          Order reference: {order.id} • {itemCount} item{itemCount !== 1 ? 's' : ''} • ₹{' '}
          {order.total}
        </p>
        <div className={styles.actions}>
          <Link to="/orders">
            <Button variant="secondary">View all orders</Button>
          </Link>
          <Link to="/products">
            <Button>Continue shopping</Button>
          </Link>
        </div>
      </section>
    </AppLayout>
  )
}

export default OrderConfirmationPage;