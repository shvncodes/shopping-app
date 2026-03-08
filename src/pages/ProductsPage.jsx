import { useEffect, useState } from "react";
import { AppLayout } from "../components/layout/AppLayout.jsx";
import { ProductGrid } from "../components/products/ProductGrid.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { products, getProductsByCategory } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import styles from "./ProductsPage.module.css";
import { useSearchParams } from "react-router-dom";

// Products page: shows all product types and items.
// This component stays small by delegating the grid and
// cards to dedicated components.
export function ProductsPage() {
  // activeFilter lives in local component state.
  const [activeFilter, setActiveFilter] = useState("all");
  const { addToCart, items: cartItems } = useCart();
  const { addToWishlist, items: wishlistItems } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredProducts = getProductsByCategory(activeFilter);

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  };

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
  };

  const setQueryParams = (filter) => {
    searchParams.set("category", filter);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const category = searchParams.get("category");
    setActiveFilter(category || "all");
  }, [searchParams]);

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
              className={`${styles.filterPill} ${
                activeFilter === "all" ? styles.filterPillActive : ""
              }`}
              onClick={() => {
                setQueryParams("all");
              }}
            >
              All
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${
                activeFilter === "makeup" ? styles.filterPillActive : ""
              }`}
              onClick={() => {
                setQueryParams("makeup");
              }}
            >
              Makeup
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${
                activeFilter === "skincare" ? styles.filterPillActive : ""
              }`}
              onClick={() => {
                setQueryParams("skincare");
              }}
            >
              Skincare
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${
                activeFilter === "accessories" ? styles.filterPillActive : ""
              }`}
              onClick={() => {
                setQueryParams("accessories");
              }}
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
