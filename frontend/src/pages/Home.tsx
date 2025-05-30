import { useEffect, useState } from "react";
import type { ToDoItemType } from "../types";
import ToDoList from "../components/ToDoList";
import ToDoForm from "../components/ToDoForm";

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
      <ToDoForm onAdd={fetchTodos} />
      <h2 className="text-2xl front-bold underline text-slate-800 mb-4">
        Todo List
      </h2>
      {todos.length ? <ToDoList todos={todos} /> : <p>No todos yet!</p>}
    </div>
  );
}

export default Home;
