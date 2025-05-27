import type { ToDoItemType } from "../types";

interface ToDoItemProps {
  todo: ToDoItemType;
}
function ToDoItem({ todo }: ToDoItemProps) {
  return (
    <article>
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? "✅ Completed" : "❌ Not Completed"}</p>
      <p>Created: {new Date(todo.created).toLocaleString()}</p>
    </article>
  );
}

export default ToDoItem;
