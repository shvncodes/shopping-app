import PropTypes from 'prop-types';
import { Button } from '../ui/Button.jsx';
import styles from './WishlistItem.module.css';

// Displays a single wishlist entry with actions
// to move it into the cart or remove it.
export function WishlistItem({ product, onMoveToCart, onRemove }) {
  return (
    <div className={styles.root}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.meta}>{product.type}</div>
      </div>
      <div className={styles.actions}>
        <Button size="small" onClick={() => onMoveToCart(product.id)}>
          Move to cart
        </Button>
        <Button size="small" variant="ghost" onClick={() => onRemove(product.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
}

WishlistItem.propTypes = {
  product: PropTypes.object.isRequired,
  onMoveToCart: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default WishlistItem;