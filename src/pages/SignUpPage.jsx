import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import { Button } from '../components/ui/Button.jsx';
import { InputField } from '../components/ui/InputField.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './SignUpPage.module.css';

export function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.')
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      signUp(name, email, password);
      navigate('/products');
    } catch (e) {
      setError(e.message);
    }
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
          <InputField
            id="name"
            label="Name"
            placeholder="Your pretty name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
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
  );
}

export default SignUpPage;