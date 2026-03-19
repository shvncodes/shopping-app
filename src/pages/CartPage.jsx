import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout.jsx";
import { Button } from "../components/ui/Button.jsx";
import { CartItem } from "../components/cart/CartItem.jsx";
import { CartSummary } from "../components/cart/CartSummary.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useProduct } from "../context/ProductsContext.jsx";
import styles from "./CartPage.module.css";

export function CartPage() {
  const navigate = useNavigate();
  const { getProductById } = useProduct();
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  // Turn cart items into "lines" that also include full product info.
  const lines = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity };
    })
    .filter(Boolean);

  const handleCheckout = () => {
    if (!lines.length) return;
    navigate("/checkout");
  };

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.itemsCard}>
          <h1 className={styles.title}>Your cart</h1>
          {lines.length === 0 ? (
            <EmptyState
              title="Your cart is feeling lonely"
              description="Add some makeup, skincare or cute accessories to start your glow journey."
              actionLabel="Browse products"
              onAction={() => navigate("/products")}
            />
          ) : (
            lines.map((line) => (
              <CartItem
                key={line.product.id}
                line={line}
                onQuantityChange={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>
        <aside className={styles.summaryCard}>
          <h2>Order summary</h2>
          <CartSummary subtotal={subtotal} />
          <Button
            fullWidth={true}
            onClick={handleCheckout}
            disabled={lines.length === 0}
          >
            Proceed to checkout
          </Button>
        </aside>
      </section>
    </AppLayout>
  );
}

export default CartPage;
