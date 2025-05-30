import { Link } from "react-router-dom";
import type { ToDoItemType } from "../types";
// import { Check, X } from "lucide-react";

interface ToDoListProps {
  todos: ToDoItemType[];
}

function ToDoList({ todos }: ToDoListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex-grow">
          <Link
            to={`/todos/${todo.id}`}
            className="group flex items-center justify-between border border-gray-300 rounded px-3 py-2 hover:bg-slate-800 text-slate-800 hover:text-white transition-colors duration-300"
          >
            <div className="flex justify-between items-center w-full">
              <span className="text-lg font-semibold">{todo.title}</span>
              <span className="text-sm text-gray-500 group-hover:text-gray-300">
                {new Date(todo.created).toLocaleDateString()}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;

/*  
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
*/
