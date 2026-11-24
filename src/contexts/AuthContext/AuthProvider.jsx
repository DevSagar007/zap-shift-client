import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { API_URL } from "../../config/api";
import { clearCsrfToken, setCsrfToken } from "../../auth/session";

const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  // user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncServerSession = async (firebaseUser) => {
    const idToken = await firebaseUser.getIdToken();
    const response = await fetch(`${API_URL}/auth/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error("Could not create a secure Zap Shift session.");
    }

    const session = await response.json();
    setCsrfToken(session.csrfToken);
  };

  // register user
  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await syncServerSession(result.user);
      setUser(auth.currentUser);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // signin User
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncServerSession(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // signin Google
  const signInGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncServerSession(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // sign out user
  const signOutUser = async () => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/auth/session`, {
        method: "DELETE",
        credentials: "include",
      });
    } finally {
      await signOut(auth);
      clearCsrfToken();
      setLoading(false);
    }
  };

  // auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // auth info
  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    resetPassword,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
