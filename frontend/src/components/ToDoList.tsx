import { Link } from "react-router-dom";
import type { ToDoItemType } from "../types";
import { Check, X } from "lucide-react";

interface ToDoListProps {
  todos: ToDoItemType[];
}

function ToDoList({ todos }: ToDoListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="group flex-grow border border-gray-300 rounded px-3 py-2 hover:bg-slate-800 cursor-pointer duration-300"
        >
          <Link
            to={`/todos/${todo.id}`}
            className="inline-flex items-center gap-1 text-slate-800 group-hover:text-white"
          >
            {todo.title} -{" "}
            {todo.completed ? (
              <Check className="w-4 h-4 text-white group-hover:bg-green-600 bg-green-500 rounded" />
            ) : (
              <X className="w-4 h-4 text-white group-hover:bg-red-600 bg-red-500 rounded" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;

// flex items-center gap-2
