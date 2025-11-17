import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (userData) => setUser(userData);

  const updateUser = (updateData) => updateProfile(auth.currentUser, updateData);

  const logout = () => signOut(auth).then(() => setUser(null)).catch(console.error);

  const authInfo = { user, setUser, login, logout, loading, updateUser };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
