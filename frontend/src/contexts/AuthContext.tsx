import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => void;
}

// 1. create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem("access");
    setIsAuthenticated(!!access);
  }, []);

  function login(access: string, refresh: string) {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    setIsAuthenticated(true);
  }

  async function logout() {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    try {
      if (refresh) {
        await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({ refresh }),
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setIsAuthenticated(false);
      navigate("/logout");
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
