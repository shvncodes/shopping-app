import styles from './Footer.module.css'

// Simple footer shown on every page.
// This is a good place for tiny extra links
// and a small brand reminder.
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>© {currentYear} Glow Cart. Stay glowing.</span>
        <div className={styles.links}>
          <span>Makeup</span>
          <span>Skincare</span>
          <span>Accessories</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

