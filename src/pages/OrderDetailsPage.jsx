import { useParams } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout.jsx'
import styles from './OrderDetailsPage.module.css'

// Detailed view for a single order.
// Later we will use the order id to look up
// the exact items and totals.
export function OrderDetailsPage() {
  const { orderId } = useParams()

  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Order details</h1>
        <p className={styles.meta}>Order id: {orderId}</p>
        <p className={styles.placeholder}>
          This page will show line items (products), quantities, prices, and payment method once we
          connect it to OrdersContext.
        </p>
      </section>
    </AppLayout>
  )
}

export default OrderDetailsPage

