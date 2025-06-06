import { useEffect, useState } from "react";
import type { ToDoItemType } from "../types";
import ToDoList from "../components/ToDoList";
import { Link } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState<ToDoItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const url = "http://localhost:8000/api/todos/";

  async function fetchTodos() {
    const token = localStorage.getItem("access");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data: ToDoItemType[] = await res.json();
      setTodos(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading || isAuthenticated === null) return <p>Loading todos...</p>;

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
    <section className="border border-gray-300 rounded p-4 shadow-md space-y-3">
      <h2 className="text-2xl font-bold underline text-slate-800 mb-4">
        Todo List
      </h2>
      {todos.length ? <ToDoList todos={todos} /> : <p>No todos yet!</p>}
      <Link to="add" className="md:flex md:flex-row md:justify-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer mt-4 md:w-1/2 w-full">
          Add
        </button>
      </Link>
    </section>
  );
}

export default Home;
