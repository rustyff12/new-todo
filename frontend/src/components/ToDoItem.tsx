import type { ToDoItemType } from "../types";
import { Check, X } from "lucide-react";

interface ToDoItemProps {
  todo: ToDoItemType;
}
function ToDoItem({ todo }: ToDoItemProps) {
  return (
    <article>
      <h2 className="font-bold">{todo.title}</h2>
      <p className="flex items-center gap-2">
        <span className="font-bold">Status: </span>
        {todo.completed ? (
          <span className="inline-flex items-center gap-1 text-green-600">
            <Check className="w-4 h-4 text-white bg-green-500" /> Completed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-red-600">
            <X className="w-4 h-4 text-white bg-red-500" /> Not Completed
          </span>
        )}
      </p>

      <p>
        <span className="font-bold">Created: </span>{" "}
        {new Date(todo.created).toLocaleString()}
      </p>
    </article>
  );
}

export default ToDoItem;
