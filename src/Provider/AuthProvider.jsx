import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
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

  const updateUser = (updateData) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, updateData).then(() => {
        setUser({ ...auth.currentUser });
      });
    }
  };

  const logout = () => signOut(auth).then(() => setUser(null));

  const authInfo = { user, loading, logout, updateUser };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
