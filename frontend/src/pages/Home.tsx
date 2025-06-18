import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToDoList from "../components/ToDoList";
import NotAuthenticated from "../components/NotAuthenticated";
import type { ToDoItemType } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { fetchTodos } from "../services/todos";

function Home() {
  const { isAuthenticated, accessToken } = useAuth();
  const [todos, setTodos] = useState<ToDoItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTodos() {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchTodos(accessToken);
        setTodos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      loadTodos();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, accessToken]);

  //   if (loading || isAuthenticated === null) return <p>Loading todos...</p>;
  if (loading) return <p>Loading todos...</p>;

  if (!isAuthenticated) {
    return <NotAuthenticated />;
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
