import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, generateUserDocument, getUserDocument } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  async function signup(formValue) {
    const { firstName, lastName, email, password } = formValue;
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const userDoc = await generateUserDocument(user, { firstName, lastName });
    setCurrentUser(userDoc);
  }

  async function login(email, password) {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const userDoc = await getUserDocument(user.uid);
    setCurrentUser(userDoc);
  }

  async function signInWithGoogle(user) {
    const userDoc = await generateUserDocument(user);
    setCurrentUser(userDoc);
  }

  async function logout() {
    try {
      const response = await auth.signOut();
      setCurrentUser(null);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    signInWithGoogle,
    resetPassword,
  };

  useEffect(() => {}, [currentUser]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
