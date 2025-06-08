import { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

function Account() {
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    email: "",
    todoTotal: "",
    complete: "",
    incomplete: "",
  });

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleLogout = useLogout();
  const button_css = "px-4 py-2 rounded cursor-pointer text-white ";

  async function fetchAccountInfo() {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/account/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch account info");

      const data = await response.json();
      setAccountInfo(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching account info:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAccountInfo();
  }, []);

  if (loading || isAuthenticated === null)
    return <p>Loading account info...</p>;

  if (!isAuthenticated) {
    return (
      <section className="border border-gray-300 rounded p-4 shadow-md space-y-3">
        <h2 className="text-xl mb-4 text-gray-700">You're not logged in</h2>
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 mb-2">
            Login
          </button>
        </Link>
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </section>
    );
  }

  return (
    <article className="border border-gray-300 rounded p-4 shadow-md space-y-3">
      <h2 className="text-2xl font-bold underline text-slate-800 mb-4">
        Welcome {accountInfo.username}
      </h2>
      <p>
        <span className=" font-medium">Username: </span> {accountInfo.username}
      </p>
      <p>
        <span className=" font-medium">Email: </span> {accountInfo.email}
      </p>
      <p>
        <span className=" font-medium">Total Todos: </span>{" "}
        {accountInfo.todoTotal}
      </p>
      <p>
        <span className=" font-medium">Complete: </span> {accountInfo.complete}
      </p>
      <p>
        <span className=" font-medium">Incomplete: </span>{" "}
        {accountInfo.incomplete}
      </p>

      <div className="flex justify-around">
        <button
          onClick={handleLogout}
          className={`bg-blue-600 mt-2 hover:bg-blue-800 ${button_css}`}
        >
          Log Out
        </button>

        <button className={`bg-red-600 mt-2 hover:bg-red-800 ${button_css}`}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default Account;
