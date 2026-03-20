import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./UserEditModal.module.css";

export function UserEditModal({
  id,
  isShow,
  name = "",
  email = "",
  age = "",
  gender = "",
  password = "",
  onClose,
}) {
  if (!isShow) return null;

  const { updateUserDetails } = useAuth();

  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userAge, setUserAge] = useState(age);
  const [userGender, setUserGender] = useState(gender);
  const [userPassword, setUserPassword] = useState(password);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
  });

  const updateUser = () => {
    updateUserDetails({
      id,
      name: userName.trim(),
      email: userEmail.trim(),
      age: Number(userAge),
      gender: userGender.trim(),
      password: userPassword.trim(),
    });
  };

  const validateUserDetails = () => {
    if (!userName) {
      setErrorMessage({ ...errorMessage, name: "Please enter user name" });
      return false;
    }
    if (!userEmail) {
      setErrorMessage({
        ...errorMessage,
        email: "Please enter user email",
      });
      return false;
    }
    if (!userAge || userAge < 13 || userAge > 100) {
      setErrorMessage({ ...errorMessage, age: "Please enter a valid age" });
      return false;
    }
    if (!userGender) {
      setErrorMessage({
        ...errorMessage,
        gender: "Please enter user gender",
      });
      return false;
    }
    if (!userPassword || userPassword.length < 6) {
      setErrorMessage({
        ...errorMessage,
        password: "Please enter a valid password",
      });
      return false;
    }
    return true;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit User details</h2>
          <Button variant="danger" size="small" onClick={onClose}>
            X
          </Button>
        </div>
        <div className={styles.content}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              if (!validateUserDetails()) return;
              updateUser();
              onClose();
            }}
          >
            <label htmlFor="name" className={styles.nameLabel}>
              Name
              <input
                className={styles.name}
                id="name"
                label="Name"
                type="text"
                placeholder="User_name"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrorMessage({ ...errorMessage, name: "" });
                }}
              />
              {errorMessage.name?.trim() && (
                <span className={styles.errorMessage}>{errorMessage.name}</span>
              )}
            </label>
            <label htmlFor="email" className={styles.emailLabel}>
              Email
              <input
                className={styles.email}
                id="email"
                label="Email"
                type="email"
                placeholder="User_email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setErrorMessage({ ...errorMessage, email: "" });
                }}
              />
              {errorMessage.email?.trim() && (
                <span className={styles.errorMessage}>
                  {errorMessage.email}
                </span>
              )}
            </label>
            <label htmlFor="age" className={styles.ageLabel}>
              Age
              <input
                className={styles.age}
                id="age"
                label="Age"
                type="number"
                placeholder="User_age"
                value={userAge}
                onChange={(e) => {
                  setUserAge(e.target.value);
                  setErrorMessage({ ...errorMessage, age: "" });
                }}
              />
              {errorMessage.age?.trim() && (
                <span className={styles.errorMessage}>{errorMessage.age}</span>
              )}
            </label>
            <label htmlFor="gender" className={styles.genderLabel}>
              Gender:
              <input
                type="radio"
                name="gender"
                value="male"
                checked={userGender === "male"}
                onChange={(e) => setUserGender(e.target.value)}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={userGender === "female"}
                onChange={(e) => setUserGender(e.target.value)}
              />{" "}
              Female
              <input
                type="radio"
                name="gender"
                value="other"
                checked={userGender === "other"}
                onChange={(e) => setUserGender(e.target.value)}
              />{" "}
              Other
            </label>
            {errorMessage.gender?.trim() && (
              <span className={styles.errorMessage}>{errorMessage.gender}</span>
            )}
            <label htmlFor="password" className={styles.passwordLabel}>
              Password
              <input
                className={styles.password}
                id="password"
                label="Password"
                type="password"
                placeholder="Create password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              {errorMessage.password?.trim() && (
                <span className={styles.errorMessage}>
                  {errorMessage.password}
                </span>
              )}
            </label>
            <Button variant="primary" type="submit" fullWidth={true}>
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
