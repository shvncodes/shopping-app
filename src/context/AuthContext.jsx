import { createContext, useContext, useEffect, useState } from "react";
import {
  createUser,
  findUserByEmailAndPassword,
  getCurrentUser,
  clearCurrentUser,
  getAllUsers,
  updateUser,
  deleteUser,
  blockUser,
} from "../data/mockApi.js";

// AuthContext keeps track of the currently signed-in user
// and exposes simple methods to sign in, sign up and sign out.
// This avoids passing user data through many levels of props.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);

  // On first render, load any previously signed-in user from localStorage.
  useEffect(() => {
    const users = getAllUsers();
    setAllUsers(users);

    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const signUp = (name, email, age, gender, password) => {
    const newUser = createUser({
      name,
      email,
      age,
      gender,
      password,
      isBlocked: false,
    });
    setUser(newUser);
    return newUser;
  };

  const signIn = (email, password) => {
    const existingUser = findUserByEmailAndPassword(email, password);
    setUser(existingUser);
    return existingUser;
  };

  const signOut = () => {
    clearCurrentUser();
    setUser(null);
  };

  const updateUserDetails = ({ id, name, email, age, gender, password }) => {
    const updatedUser = {
      id,
      name,
      email,
      age,
      gender,
      password,
    };

    const updatedUsers = updateUser(updatedUser);
    setAllUsers(updatedUsers);
  };

  const blockUserAccount = (id) => {
    const blockedUsers = blockUser(id);
    setAllUsers(blockedUsers);
  };

  const deleteUserAccount = (id) => {
    const deletedUsers = deleteUser(id);
    setAllUsers(deletedUsers);
  };

  const value = {
    allUsers,
    user,
    isSignedIn: Boolean(user),
    signUp,
    signIn,
    signOut,
    updateUserDetails,
    blockUserAccount,
    deleteUserAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
