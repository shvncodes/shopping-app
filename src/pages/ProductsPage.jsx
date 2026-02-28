import { AppLayout } from '../components/layout/AppLayout.jsx'
import styles from './ProductsPage.module.css'

// Products page: shows all product types and items.
// In this first pass we only set up the layout.
// Later we will render a ProductGrid here using real data.
export function ProductsPage() {
  const activeFilter = 'all'

  return (
    <AppLayout>
      <section className={styles.root}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Shop the glow collection</h1>
            <p>Filter by category once we wire in the real products.</p>
          </div>
          <div className={styles.filters}>
            <button className={`${styles.filterPill} ${styles.filterPillActive}`}>All</button>
            <button className={styles.filterPill}>Makeup</button>
            <button className={styles.filterPill}>Skincare</button>
            <button className={styles.filterPill}>Accessories</button>
          </div>
        </div>

        <div className={styles.gridPlaceholder}>
          {/* Later: replace this with <ProductGrid products={...} /> */}
          Product grid will appear here. We will use a dedicated ProductCard component for each
          item so this page stays focused on layout and filtering logic.
          <br />
          <br />
          This is a good reminder that pages (route-level components) should stay small and delegate
          UI pieces to reusable components.
        </div>
      </section>
    </AppLayout>
  )
}

export default ProductsPage

