import { createContext, useContext, useEffect, useState } from 'react'
import { createUser, findUserByEmailAndPassword, getCurrentUser, clearCurrentUser } from '../data/mockApi.js'

// AuthContext keeps track of the currently signed-in user
// and exposes simple methods to sign in, sign up and sign out.
// This avoids passing user data through many levels of props.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On first render, load any previously signed-in user from localStorage.
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, [])

  const signUp = (name, email, password) => {
    const newUser = createUser({ name, email, password });
    setUser(newUser);
    return newUser;
  }

  const signIn = (email, password) => {
    const existingUser = findUserByEmailAndPassword(email, password);
    setUser(existingUser);
    return existingUser;
  }

  const signOut = () => {
    confirm("Are you sure you want to sign out?");
    clearCurrentUser();
    setUser(null);
  }

  const value = {
    user,
    isSignedIn: Boolean(user),
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}

