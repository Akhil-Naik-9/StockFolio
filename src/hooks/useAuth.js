import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

// Small convenience hook so components don't need to import useContext + AuthContext every time
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
