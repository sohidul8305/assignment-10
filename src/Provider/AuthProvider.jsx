import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // set user
      setLoading(false);
    });
    return () => unsubscribe(); // cleanup on unmount
  }, []);

  // login function (optional, mostly handled by Firebase UI)
  const login = (userData) => setUser(userData);

  // update user profile
  const updateUser = (updateData) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, updateData)
        .then(() => setUser({ ...auth.currentUser }))
        .catch(console.error);
    }
  };

  // logout function
  const logout = () =>
    signOut(auth)
      .then(() => setUser(null))
      .catch(console.error);

  const authInfo = { user, setUser, login, logout, loading, updateUser };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
