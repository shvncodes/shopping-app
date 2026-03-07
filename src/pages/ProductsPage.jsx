import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import { ProductGrid } from '../components/products/ProductGrid.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { products, getProductsByCategory } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import styles from './ProductsPage.module.css';

// Products page: shows all product types and items.
// This component stays small by delegating the grid and
// cards to dedicated components.
export function ProductsPage() {
  // activeFilter lives in local component state.
  const [activeFilter, setActiveFilter] = useState('all');
  const { addToCart, items: cartItems } = useCart();
  const { addToWishlist, items: wishlistItems } = useWishlist();

  const filteredProducts = getProductsByCategory(activeFilter);

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  }

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
  }

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Shop the glow collection</h1>
            <p>Filter by category to see makeup, skincare or accessories.</p>
          </div>
          <div className={styles.filters}>
            <button
              type="button"
              className={`${styles.filterPill} ${activeFilter === 'all' ? styles.filterPillActive : ''
                }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${activeFilter === 'makeup' ? styles.filterPillActive : ''
                }`}
              onClick={() => setActiveFilter('makeup')}
            >
              Makeup
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${activeFilter === 'skincare' ? styles.filterPillActive : ''
                }`}
              onClick={() => setActiveFilter('skincare')}
            >
              Skincare
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${activeFilter === 'accessories' ? styles.filterPillActive : ''
                }`}
              onClick={() => setActiveFilter('accessories')}
            >
              Accessories
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        ) : (
          <div className={styles.gridPlaceholder}>
            <EmptyState
              title="No products found"
              description="Try switching to a different category to see more glow goodies."
            />
          </div>
        )}
      </section>
    </AppLayout>
  );
}

export default ProductsPage;