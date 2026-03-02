import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import { Button } from '../components/ui/Button.jsx';
import { InputField } from '../components/ui/InputField.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './SignInPage.module.css';

export function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Very small client-side validation.
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      signIn(email, password);
      navigate('/products');
    } catch (e) {
      setError(e.message);
    }
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
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
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
  );
}

export default SignInPage;