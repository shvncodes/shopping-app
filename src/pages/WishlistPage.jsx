import { AppLayout } from '../components/layout/AppLayout.jsx'
import styles from './WishlistPage.module.css'

// Wishlist page: items the user is interested in
// but not ready to buy yet. Great place to practice
// moving items between lists (wishlist -> cart).
export function WishlistPage() {
  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Your wishlist</h1>
        <p className={styles.placeholder}>
          Later we will show WishlistItem components here, along with a button to move each item
          into the cart or remove it.
        </p>
      </section>
    </AppLayout>
  )
}

export default WishlistPage

