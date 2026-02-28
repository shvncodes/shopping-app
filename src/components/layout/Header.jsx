import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

// The Header is shown on every page.
// It contains navigation links and shortcuts
// to cart and wishlist so the user can move
// around the app easily.
export function Header() {
  // For now, we hard-code cart / wishlist counts.
  // Later these will come from React Context.
  const cartCount = 0
  const wishlistCount = 0

  return (
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

          <div className={styles.authLinks}>
            <NavLink to="/signin" className={styles.authSecondary}>
              Sign in
            </NavLink>
            <NavLink to="/signup" className={styles.authPrimary}>
              Sign up
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

