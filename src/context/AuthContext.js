import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, generateUserDocument } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(formValue) {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        formValue.email,
        formValue.password
      );
      return generateUserDocument(user, {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
      });
    } catch (error) {
      return error;
    }
  }

  async function login(email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      await generateUserDocument(userAuth);
      setCurrentUser(userAuth);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
