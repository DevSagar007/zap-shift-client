import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";


function AuthProvider({ children }) {
  // register user
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser  = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // auth info
  const authInfo = {
    registerUser,
    signInUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
