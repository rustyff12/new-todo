import { useEffect, useState } from "react";
import type { ToDoItemType } from "../types";
import ToDoList from "../components/ToDoList";
import { Link } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState<ToDoItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:8000/api/todos/";

  const fetchTodos = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data: ToDoItemType[] = await res.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading todos...</p>;

  return (
    <div className=" flex flex-col mx-auto">
      <h2 className="text-2xl front-bold underline text-slate-800 mb-4">
        Todo List
      </h2>
      {todos.length ? <ToDoList todos={todos} /> : <p>No todos yet!</p>}
      <Link to="add">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer mt-4 mx-auto md:w-1/2 w-full">
          Add
        </button>
      </Link>
    </div>
  );
}

export default Home;
