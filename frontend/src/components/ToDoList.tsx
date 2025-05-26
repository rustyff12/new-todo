import { Link } from "react-router-dom";
import type { ToDoItem } from "../types";

interface ToDoListProps {
  todos: ToDoItem[];
}


function ToDoList({ todos }: ToDoListProps) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Link to={`/todos/${todo.id}`}>
            {todo.title} - {todo.completed ? "✅" : "❌"}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ToDoList