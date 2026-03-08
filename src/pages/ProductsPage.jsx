import { useEffect, useState } from "react";
import { AppLayout } from "../components/layout/AppLayout.jsx";
import { ProductGrid } from "../components/products/ProductGrid.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { getFilteredProducts } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import styles from "./ProductsPage.module.css";
import { useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

const CATEGORIES = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "makeup",
    label: "Makeup",
  },
  {
    key: "skincare",
    label: "Skincare",
  },
  {
    key: "accessories",
    label: "Accessories",
  },
];

// Products page: shows all product types and items.
// This component stays small by delegating the grid and
// cards to dedicated components.
export function ProductsPage() {
  // activeFilter lives in local component state.
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, items: cartItems } = useCart();
  const { addToWishlist, items: wishlistItems } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  };

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
  };

  const setCategoryQueryParams = (cat) => {
    searchParams.set("category", cat);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("q");
    setCategoryFilter(category || "all");
    setSearchQuery(search || "");
    setFilteredProducts(getFilteredProducts(category || "all", search || ""));
  }, [searchParams]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.headerRow}>
          <div className={styles.search}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchParams.set("q", searchQuery.trim());
                setSearchParams(searchParams);
              }}
            >
              <input
                id="search"
                type="text"
                placeholder="Search products..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={handleSearchQuery}
              />
              <Button variant="secondary" size="small" type="submit">
                Search
              </Button>
            </form>
          </div>
          <div className={styles.filters}>
            {CATEGORIES.map((cat) => {
              return (
                <button
                  key={cat.key}
                  type="button"
                  className={`${styles.filterPill} ${
                    categoryFilter === cat.key ? styles.filterPillActive : ""
                  }`}
                  onClick={() => {
                    setCategoryQueryParams(cat.key);
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
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
