import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
function AuthProvider({ children }) {
  let initialUser = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      initialUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Ошибка при разборе user из localStorage:", error);
    localStorage.removeItem("user");
  }

  const [user, setUser] = useState(initialUser);

  const isAuth = !!user;

  function login(token, userData) {
    console.log("Login: ", token, userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
