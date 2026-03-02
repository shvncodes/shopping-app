import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import styles from './ProductCard.module.css';

// ProductCard shows a compact view of a single product
// and exposes common actions: add to cart, wishlist, view details.
export function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  return (
    <Card clickable>
      <div className={styles.cardInner}>
        <div className={styles.image} />
        <div className={styles.nameRow}>
          <div>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.type}>{product.type}</div>
          </div>
          {product.badge ? <Badge variant="pill">{product.badge}</Badge> : null}
        </div>
        <div className={styles.price}>₹ {product.price}</div>
        <div className={styles.actions}>
          <Button size="small" onClick={() => onAddToCart(product.id)}>
            Add to cart
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => onAddToWishlist(product.id)}
          >
            Wishlist
          </Button>
          <Link to={`/products/${product.id}`}>
            <Button size="small" variant="ghost">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    price: PropTypes.number.isRequired,
    badge: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
}

export default ProductCard;