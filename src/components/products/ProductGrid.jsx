import PropTypes from 'prop-types';
import { ProductCard } from './ProductCard.jsx';
import styles from './ProductGrid.module.css';

// ProductGrid lays out ProductCard components in a nice responsive grid.
export function ProductGrid({ cartItems, products, onAddToCart, onAddToWishlist }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          isCartItem={cartItems.some((cartItem) => cartItem.productId === product.id)}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
}

export default ProductGrid;