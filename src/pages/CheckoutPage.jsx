import { AppLayout } from '../components/layout/AppLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import styles from './CheckoutPage.module.css'

// Checkout page: shows a summary of items and a fake payment form.
// Later we will use OrdersContext here to create real orders.
export function CheckoutPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // Later: create order from cart and navigate to confirmation page.
  }

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.summaryCard}>
          <h1 className={styles.title}>Review your order</h1>
          <p className={styles.note}>
            Here we will show a list of items and totals from the cart context.
          </p>
        </div>
        <form className={styles.paymentCard} onSubmit={handleSubmit}>
          <h2>Choose payment method</h2>
          <div className={styles.paymentMethods}>
            <label className={styles.radioRow}>
              <input type="radio" name="payment" defaultChecked />
              <span>UPI</span>
            </label>
            <label className={styles.radioRow}>
              <input type="radio" name="payment" />
              <span>Card</span>
            </label>
            <label className={styles.radioRow}>
              <input type="radio" name="payment" />
              <span>Cash on delivery</span>
            </label>
          </div>
          <p className={styles.note}>
            To keep things beginner-friendly, this app never talks to a real payment gateway. We
            just create an order object in localStorage.
          </p>
          <Button type="submit" fullWidth>
            Pay &amp; place order
          </Button>
        </form>
      </section>
    </AppLayout>
  )
}

export default CheckoutPage

