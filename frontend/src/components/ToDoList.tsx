import { Link } from "react-router-dom";
import type { ToDoItemType } from "../types";

interface ToDoListProps {
  todos: ToDoItemType[];
}

function ToDoList({ todos }: ToDoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Link to={`/todos/${todo.id}`}>
            {todo.title} - {todo.completed ? "✅" : "❌"}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
