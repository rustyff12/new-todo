import ToDoForm from "../components/ToDoForm";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const navigate = useNavigate();

  function handleAdd() {
    navigate("/");
  }
  return (
    <section className="border border-gray-300 rounded p-4 shadow-md space-y-3">
      <h2 className="text-2xl font-bold underline text-slate-800 mb-4">
        Add a New Todo
      </h2>
      <ToDoForm onAdd={handleAdd} />
    </section>
  );
}

export default AddTodo;
