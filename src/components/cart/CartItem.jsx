import PropTypes from 'prop-types';
import { Button } from '../ui/Button.jsx';
import styles from './CartItem.module.css';

// Displays a single product row inside the cart.
export function CartItem({ line, onQuantityChange, onRemove }) {
  const handleQuantityChange = (event) => {
    const value = Number(event.target.value) || 1;
    onQuantityChange(line.product.id, Math.max(1, value));
  }

  return (
    <div className={styles.root}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={styles.name}>{line.product.name}</div>
        <div className={styles.meta}>{line.product.type}</div>
        <div className={styles.quantityRow}>
          <span>Qty:</span>
          <input
            className={styles.quantityInput}
            type="number"
            min={1}
            value={line.quantity}
            onChange={handleQuantityChange}
          />
        </div>
      </div>
      <div className={styles.price}>₹ {line.product.price * line.quantity}</div>
      <Button variant="ghost" size="small" onClick={() => onRemove(line.product.id)}>
        Remove
      </Button>
    </div>
  );
}

CartItem.propTypes = {
  line: PropTypes.shape({
    product: PropTypes.object.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default CartItem;