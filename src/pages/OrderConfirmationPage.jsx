import { Link, useParams } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import styles from './OrderConfirmationPage.module.css'

// Simple \"thank you\" page after checkout.
// It reads the order id from the URL and could
// later be used to look up details from OrdersContext.
export function OrderConfirmationPage() {
  const { orderId } = useParams()

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.badge}>Order placed</div>
        <h1 className={styles.title}>Your glow goodies are on the way ✨</h1>
        <p>
          This is a fake store, but the React logic is real. In the full version we will show the
          actual products in this order and save everything to localStorage.
        </p>
        <p>Order reference: {orderId || 'latest'}</p>
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

export default OrderConfirmationPage

