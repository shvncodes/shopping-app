import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './Header.module.css';
import ConfirmationModal from '../ui/confirmationModal.jsx';
import { useState } from 'react';

export function Header() {
  // useNavigate lets us redirect the user after sign out.
  const navigate = useNavigate();

  // Cart and wishlist counts come from their contexts.
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  // states
  const [isShow, setIsShow] = useState(false);

  // Auth context tells us if the user is signed in.
  const { user, isSignedIn, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate('/');
    setIsShow(false);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logoText}>Glow Cart</span>
          <span className={styles.tagline}>Makeup, skincare & cute finds</span>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              Orders
            </NavLink>
          </div>

          <div className={styles.navActions}>
            <NavLink to="/wishlist" className={styles.iconButton}>
              Wishlist
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </NavLink>
            <NavLink to="/cart" className={styles.iconButton}>
              Cart
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </NavLink>

            {isSignedIn ? (
              <div className={styles.authLinks}>
                <span className={styles.authSecondary}>Hi, {user.name}</span>
                <button type="button" className={styles.authPrimary} onClick={() => { setIsShow(true) }}>
                  Sign out
                </button>
              </div>
            ) : (
              <div className={styles.authLinks}>
                <NavLink to="/signin" className={styles.authSecondary}>
                  Sign in
                </NavLink>
                <NavLink to="/signup" className={styles.authPrimary}>
                  Sign up
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>

      <ConfirmationModal
        isShow={isShow}
        title="Sign Out"
        description="Are you sure you want to sign-out from the app? You can again sign-in using your email and password."
        onCancel={() => {
          setIsShow(false)
        }}
        onConfirm={handleSignOut}
      />
    </>
  );
}

export default Header;