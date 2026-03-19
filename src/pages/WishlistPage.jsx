import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { WishlistItem } from "../components/wishlist/WishlistItem.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useProduct } from "../context/ProductsContext.jsx";
import styles from "./WishlistPage.module.css";

// Wishlist page: items the user is interested in
// but not ready to buy yet. Great place to practice
// moving items between lists (wishlist -> cart).
export function WishlistPage() {
  const navigate = useNavigate();
  const { getProductById } = useProduct();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const products = items
    .map((entry) => getProductById(entry.productId))
    .filter(Boolean);

  const handleMoveToCart = (productId) => {
    addToCart(productId, 1);
    removeFromWishlist(productId);
  };

  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Your wishlist</h1>
        {products.length === 0 ? (
          <EmptyState
            title="Nothing in your wishlist yet"
            description="Tap the heart on any product to save it here for later."
            actionLabel="Browse products"
            onAction={() => navigate("/products")}
          />
        ) : (
          products.map((product) => (
            <WishlistItem
              key={product.id}
              product={product}
              onMoveToCart={handleMoveToCart}
              onRemove={removeFromWishlist}
            />
          ))
        )}
      </section>
    </AppLayout>
  );
}

export default WishlistPage;
