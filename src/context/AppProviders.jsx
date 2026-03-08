import PropTypes from "prop-types";
import { AuthProvider } from "./AuthContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import { WishlistProvider } from "./WishlistContext.jsx";
import { OrdersProvider } from "./OrdersContext.jsx";
import { ProductProvider } from "./ProductsContext.jsx";

// AppProviders composes all of our context providers
// into a single component. This keeps main.jsx clean
// and makes it easy to see which global states exist.
export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <OrdersProvider>{children}</OrdersProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node,
};

export default AppProviders;
