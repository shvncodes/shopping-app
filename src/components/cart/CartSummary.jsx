import PropTypes from 'prop-types';
import styles from './CartSummary.module.css';

// Shows a small price breakdown for the current cart.
// To keep things simple we use subtotal as total,
// but you could easily add shipping / taxes here later.
export function CartSummary({ subtotal }) {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <span className={styles.labelMuted}>Subtotal</span>
        <span>₹ {subtotal}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.labelMuted}>Shipping</span>
        <span>₹ 0</span>
      </div>
      <div className={`${styles.row} ${styles.totalRow}`}>
        <span>Total</span>
        <span>₹ {subtotal}</span>
      </div>
    </div>
  );
}

CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
}

export default CartSummary;