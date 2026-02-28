import { AppLayout } from '../components/layout\AppLayout.jsx'
import styles from './OrdersPage.module.css'

// Orders page: shows all past orders for the user.
// Later we will map over orders from OrdersContext
// and render an OrderCard for each one.
export function OrdersPage() {
  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Your orders</h1>
        <p className={styles.placeholder}>
          Once we track orders in localStorage, this page will show each past order with total,
          status and a link to detailed view.
        </p>
      </section>
    </AppLayout>
  )
}

export default OrdersPage

