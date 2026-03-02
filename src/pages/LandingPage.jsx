import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import styles from './LandingPage.module.css'

// Landing page is the \"front door\" of the app.
// It does not contain business logic, it just
// explains what the app does and sends users
// to Sign up / Sign in / Products.
export function LandingPage() {
  return (
    <AppLayout>
      <section className={styles.root}>
        <div>
          <h1 className={styles.heroTitle}>
            Your <span className={styles.highlight}>makeup</span> &amp;{' '}
            <span className={styles.highlight}>skincare</span> cart, in one cute place.
          </h1>
          <p className={styles.heroText}>
            Glow Cart is an app where you can explore makeup, skincare and girly
            accessories. Sign up, build wishlists and shop items.
          </p>
          <div className={styles.heroActions}>
            <Link to="/signup">
              <Button>Create your glow account</Button>
            </Link>
            <Link to="/products" className={styles.secondaryLink}>
              or browse products first →
            </Link>
          </div>
        </div>

        <aside className={styles.card}>
          <div>
            <div className={styles.cardTitle}>Product vibes</div>
            <div className={styles.pillList}>
              <span className={styles.pill}>Lipsticks</span>
              <span className={styles.pill}>Blush &amp; highlighter</span>
              <span className={styles.pill}>Serums</span>
              <span className={styles.pill}>Face masks</span>
              <span className={styles.pill}>Hair clips &amp; scrunchies</span>
            </div>
          </div>
        </aside>
      </section>
    </AppLayout>
  )
}

export default LandingPage

