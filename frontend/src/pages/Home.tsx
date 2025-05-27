import { useEffect, useState } from "react";
import type { ToDoItemType } from "../types";
import ToDoList from "../components/ToDoList";

function Home() {
  const [todos, setTodos] = useState<ToDoItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:8000/api/todos/";

  useEffect(() => {
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

    fetchTodos();
  }, []);

  if (loading) return <p>Loading todos...</p>;
  if (!todos.length) return <p>No todos yet!</p>;

  return <ToDoList todos={todos} />;
}

export default Home;
