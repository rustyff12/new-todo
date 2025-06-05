import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ToDoItemType } from "../types";
import ToDoItem from "../components/ToDoItem";

function ToDoDetail() {
  const [todo, setTodo] = useState<ToDoItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const itemUrl = `http://localhost:8000/api/todos/${id}`;

  useEffect(() => {
    async function fetchTodo() {
      const token = localStorage.getItem("access");

      try {
        const response = await fetch(itemUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch todo");
        }
        const data: ToDoItemType = await response.json();
        setTodo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodo();
  }, [itemUrl]);

  if (loading) return <p>Loading todo...</p>;
  if (!todo) return <p>Todo not found.</p>;

  return <ToDoItem todo={todo} />;
}

export default ToDoDetail;
