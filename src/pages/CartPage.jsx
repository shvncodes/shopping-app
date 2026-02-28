import { AppLayout } from '../components/layout/AppLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import styles from './CartPage.module.css'

// Cart page: shows all items the user intends to buy.
// Later we will render CartItem and CartSummary components here.
export function CartPage() {
  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.itemsCard}>
          <h1 className={styles.title}>Your cart</h1>
          <p className={styles.placeholder}>
            Soon this will list each item in the cart with quantity controls and a remove button.
          </p>
        </div>
        <aside className={styles.summaryCard}>
          <h2>Order summary</h2>
          <p className={styles.placeholder}>
            Subtotal, shipping and total will be calculated from the cart context.
          </p>
          <Button fullWidth>Proceed to checkout</Button>
        </aside>
      </section>
    </AppLayout>
  )
}

export default CartPage

