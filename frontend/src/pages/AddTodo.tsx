import ToDoForm from "../components/ToDoForm";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/todos");
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a New Todo</h2>
      <ToDoForm onAdd={handleAdd} />
    </div>
  );
}

export default AddTodo;
