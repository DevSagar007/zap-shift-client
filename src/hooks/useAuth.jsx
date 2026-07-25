import { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

function useAuth() {
  const authInfo = use(AuthContext);
  return authInfo;
}

export default useAuth;
