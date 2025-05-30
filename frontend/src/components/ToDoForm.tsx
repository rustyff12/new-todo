import { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
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
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default ToDoForm;
