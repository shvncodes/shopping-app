import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import { Button } from '../components/ui/Button.jsx';
import { CartSummary } from '../components/cart/CartSummary.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import styles from './CheckoutPage.module.css';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { registerOrder } = useOrders();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!items.length) return;

    // We create a very small order object: only cart items and total.
    const order = registerOrder({ items, total: subtotal });
    clearCart();
    navigate(`/order-confirmation/${order.id}`);
  }

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.summaryCard}>
          <h1 className={styles.title}>Review your order</h1>
          {items.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Add something cute to your cart before checking out."
              actionLabel="Browse products"
              onAction={() => navigate('/products')}
            />
          ) : (
            <>
              <p className={styles.note}>
                We use the cart context to calculate this summary. Try reloading the page and you
                will see that localStorage keeps your cart.
              </p>
              <CartSummary subtotal={subtotal} />
            </>
          )}
        </div>
        <form className={styles.paymentCard} onSubmit={handleSubmit}>
          <h2>Choose payment method</h2>
          <div className={styles.paymentMethods}>
            <label className={styles.radioRow}>
              <input type="radio" name="payment" defaultChecked={true} />
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
          <Button type="submit" fullWidth={true}>
            Pay &amp; place order
          </Button>
        </form>
      </section>
    </AppLayout>
  );
}

export default CheckoutPage;