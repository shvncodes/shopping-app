import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import { InputField } from '../components/ui\InputField.jsx'
import styles from './SignUpPage.module.css'

// Sign up page: lets users create a new account.
// Later this will talk to our AuthContext and mock
// localStorage \"backend\" to actually store accounts.
export function SignUpPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // Later we will read the form values and call AuthContext.signUp.
  }

  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Create your glow account</h1>
        <p className={styles.subtitle}>
          We will keep things super simple: a few fields on the client side, stored in localStorage.
          Perfect for learning the basics of auth flows.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField id="name" label="Name" placeholder="Your pretty name" />
          <InputField id="email" label="Email" type="email" placeholder="you@example.com" />
          <InputField id="password" label="Password" type="password" placeholder="Create password" />
          <InputField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Repeat password"
          />
          <Button type="submit" fullWidth={true}>
            Sign up
          </Button>
        </form>

        <p className={styles.footerText}>
          Already have an account?{' '}
          <Link to="/signin" className={styles.link}>
            Sign in
          </Link>
        </p>
      </section>
    </AppLayout>
  )
}

export default SignUpPage

