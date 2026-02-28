import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import { InputField } from '../components/ui/InputField.jsx'
import styles from './SignInPage.module.css'

// Very simple sign in page.
// In a later step we will connect this to AuthContext
// and localStorage so it can actually \"log in\" a user.
export function SignInPage() {
  // For now we just show the form structure.
  // When we wire it up we will add React state and
  // basic validation logic here.

  const handleSubmit = (event) => {
    event.preventDefault()
    // Later we will read the form values and call AuthContext.signIn.
  }

  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Welcome back, glow girl ✨</h1>
        <p className={styles.subtitle}>
          Sign in to see your cart, wishlist and past orders. This page is a great place to
          practice handling forms in React.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField id="email" label="Email" type="email" placeholder="you@example.com" />
          <InputField id="password" label="Password" type="password" placeholder="••••••••" />
          <Button type="submit" fullWidth={true}>
            Sign in
          </Button>
        </form>

        <p className={styles.footerText}>
          New here?{' '}
          <Link to="/signup" className={styles.link}>
            Create an account
          </Link>
        </p>
      </section>
    </AppLayout>
  )
}

export default SignInPage

