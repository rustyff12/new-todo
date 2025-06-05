import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  return async function handleLogout() {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    try {
      if (refresh) {
        await fetch("http://localhost:8000/api/logout/", {
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
      navigate("/login");
    }
  };
}
