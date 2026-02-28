import PropTypes from 'prop-types'
import styles from './AppLayout.module.css'

// Simple layout component that keeps pages
// nicely centered and adds consistent padding.
// We keep this separate so it is easy to tweak
// later without touching every page.
export function AppLayout({ children }) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout

