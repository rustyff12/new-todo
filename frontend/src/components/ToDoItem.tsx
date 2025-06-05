import { useState } from "react";
import type { ToDoItemType } from "../types";
import { Check, X } from "lucide-react";

interface ToDoItemProps {
  todo: ToDoItemType;
}
function ToDoItem({ todo }: ToDoItemProps) {
  const [localTodo, setLocalTodo] = useState(todo);
  const [updating, setUpdating] = useState(false);

  async function toggleCompleted() {
    setUpdating(true);
    const token = localStorage.getItem("access");
    try {
      const response = await fetch(
        `http://localhost:8000/api/todos/${localTodo.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed: !localTodo.completed }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updated = await response.json();
      setLocalTodo(updated);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <article className="border border-gray-300 rounded p-4 shadow-md space-y-3">
      <h2 className="text-2xl front-bold underline text-slate-800">
        {localTodo.title}
      </h2>

      <p className="flex items-center gap-2">
        <span className="font-bold">Status: </span>
        {localTodo.completed ? (
          <span className="inline-flex items-center gap-1 text-green-600">
            <Check className="w-4 h-4 text-white bg-green-500 rounded" />{" "}
            Completed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-red-600">
            <X className="w-4 h-4 text-white bg-red-500 rounded" /> Not
            Completed
          </span>
        )}
      </p>

      <p>
        <span>Created: </span>
        {new Date(localTodo.created).toLocaleString()}
      </p>

      <p className="whitespace-pre-line">
        <span className="font-bold">Description: </span>
        {localTodo.description || (
          <em className="text-gray-500">No description</em>
        )}
      </p>

      <button
        onClick={toggleCompleted}
        disabled={updating}
        className={`mt-2 px-4 py-2 rounded cursor-pointer ${
          localTodo.completed ? "bg-yellow-500" : "bg-green-600"
        } text-white hover:opacity-90 disabled:opacity-50`}
      >
        {updating
          ? "Updating..."
          : localTodo.completed
          ? "Mark as Incomplete"
          : "Mark as Completed"}
      </button>
    </article>
  );
}

export default ToDoItem;
