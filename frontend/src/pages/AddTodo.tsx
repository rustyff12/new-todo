// import { useState } from "react";
import ToDoForm from "../components/ToDoForm";
import { useNavigate } from "react-router-dom";
// import NotAuthenticated from "../components/NotAuthenticated";

function AddTodo() {
  const navigate = useNavigate();
  //   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  function handleAdd() {
    navigate("/");
  }

  //   if (!isAuthenticated) {
  //     <NotAuthenticated />;
  //   }
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
// here
