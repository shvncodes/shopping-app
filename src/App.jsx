import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { AppProviders } from "./context/AppProviders.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { SignInPage } from "./pages/SignInPage.jsx";
import { SignUpPage } from "./pages/SignUpPage.jsx";
import { ProductsPage } from "./pages/ProductsPage.jsx";
import { ProductDetailsPage } from "./pages/ProductDetailsPage.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { WishlistPage } from "./pages/WishlistPage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage.jsx";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage.jsx";
import { OrdersPage } from "./pages/OrdersPage.jsx";
import { OrderDetailsPage } from "./pages/OrderDetailsPage.jsx";

import { AdminPage } from "./admin-pages/AdminPage.jsx";
import { StorePage } from "./admin-pages/StorePage.jsx";
import { CouponPage } from "./admin-pages/CouponPage.jsx";
import { UserPage } from "./admin-pages/Userpage.jsx";

// App defines the overall layout and routing for the app.
// Pages are kept in src/pages, and we use React Router's
// <Routes> + <Route> components to map URLs to pages.
function App() {
  return (
    <AppProviders>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmationPage />}
        />
        {/* Admin routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/store" element={<StorePage />} />
        <Route path="/admin/users" element={<UserPage />} />
        <Route path="/admin/coupons" element={<CouponPage />} />

        {/* If the user hits an unknown URL, gently redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </AppProviders>
  );
}

export default App;
