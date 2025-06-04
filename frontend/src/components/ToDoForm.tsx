import { useState } from "react";
import toast from "react-hot-toast";
interface ToDOFormProps {
  onAdd: () => void;
}

interface FormData {
  title: string;
  description: string;
}

function ToDoForm({ onAdd }: ToDOFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim()) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add todos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      setFormData({
        title: "",
        description: "",
      });
      onAdd();
      toast.success("Todo added!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title (required)"
        className="flex-grow border border-gray-300 rounded px-3 py-2"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="border border-gray-300 rounded px-3 py-2 resize-none"
        rows={4}
      ></textarea>

      <button
        type="submit"
        disabled={loading || !formData.title.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default ToDoForm;
