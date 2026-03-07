import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import styles from './ProductCard.module.css';

// ProductCard shows a compact view of a single product
// and exposes common actions: add to cart, wishlist, view details.
export function ProductCard({ isCartItem, product, onAddToCart, onAddToWishlist }) {
  const navigate = useNavigate();
  return (
    <Card clickable handleClick={() => {
      navigate(`/products/${product.id}`);
    }}>
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
          <Button size="small" onClick={(e) => {
            e.stopPropagation()
            if (isCartItem) {
              navigate('/cart');
              return;
            }
            onAddToCart(product.id);
          }}>
            {isCartItem ? "Go to Cart" : "Add to Cart"}
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product.id)
            }}
          >
            Wishlist
          </Button>
          <Button size="small" variant="ghost">
            Details
          </Button>
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