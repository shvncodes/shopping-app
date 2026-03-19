import { useEffect, useState } from "react";
import { AppLayout } from "../components/layout/AppLayout.jsx";
import { ProductGrid } from "../components/products/ProductGrid.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { useProduct } from "../context/ProductsContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import styles from "./ProductsPage.module.css";
import { useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

const CATEGORIES = [
  {
    key: "All",
    label: "All",
  },
  {
    key: "Makeup",
    label: "Makeup",
  },
  {
    key: "Skincare",
    label: "Skincare",
  },
  {
    key: "Accessories",
    label: "Accessories",
  },
];

// Products page: shows all product types and items.
// This component stays small by delegating the grid and
// cards to dedicated components.
export function ProductsPage() {
  // activeFilter lives in local component state.
  const { getFilteredProducts } = useProduct();
  const { addToCart, items: cartItems } = useCart();
  const { addToWishlist, items: wishlistItems } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceOrder, setPriceOrder] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  };

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
  };

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    setCategoryFilter(category);

    const search = searchParams.get("q") || "";
    setSearchQuery(search);

    const order = searchParams.get("sort") || "";
    setPriceOrder(order);

    setFilteredProducts(getFilteredProducts(category, search, order));
  }, [searchParams]);

  const handleSearchQuery = () => {
    searchParams.set("q", searchQuery.trim());
    setSearchParams(searchParams);
  };

  const setCategoryQueryParams = (cat) => {
    searchParams.set("category", cat);
    setSearchParams(searchParams);
  };

  const handlePriceOrder = (e) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.headerRow}>
          <div className={styles.search}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchQuery();
              }}
            >
              <input
                id="search"
                type="text"
                placeholder="Search products..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <div>
            <select
              name="priceSort"
              value={priceOrder}
              onChange={handlePriceOrder}
              className={styles.sortPrice}
            >
              <option value="">Price</option>
              <option value="desc">High to Low</option>
              <option value="asc">Low to High</option>
            </select>
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
