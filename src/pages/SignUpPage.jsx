import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout.jsx";
import { Button } from "../components/ui/Button.jsx";
import { InputField } from "../components/ui/InputField.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "./SignUpPage.module.css";

export function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !age || !gender || !password || !confirmPassword) {
      console.log(name, email, age, gender, password, confirmPassword);
      setError("Please fill in all fields.");
      return;
    }
    if (age < 13 || age > 100) {
      setError("You are not valid to log in.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      signUp(name, email, age, gender, password);
      navigate("/products");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <AppLayout>
      <section className={styles.root}>
        <h1 className={styles.title}>Create your glow account</h1>
        <p className={styles.subtitle}>
          We will keep things super simple: a few fields on the client side,
          stored in localStorage. Perfect for learning the basics of auth flows.
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
            id="age"
            label="Age"
            type="number"
            placeholder="Your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="gender" className={styles.genderLabel}>
            Gender:
            <InputField
              type="radio"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Male
            <InputField
              type="radio"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Female
            <InputField
              type="radio"
              name="gender"
              value="other"
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Other
          </label>
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
          Already have an account?{" "}
          <Link to="/signin" className={styles.link}>
            Sign in
          </Link>
        </p>
      </section>
    </AppLayout>
  );
}

export default SignUpPage;
