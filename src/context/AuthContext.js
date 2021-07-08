import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, generateUserDocument, getUserDocument } from "../firebase";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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

  async function handleResetPassword(auth, actionCode, continueUrl, lang){

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

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signInWithGoogle,
  };

  useEffect(() => {}, [currentUser]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
