import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Login failed");
        return;
      }

      // Clear existing tokens
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      toast.success("Logged in!");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-6">
      <label htmlFor="username" className="block text-sm font-medium">
        Username
      </label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <label htmlFor="password" className="block text-sm font-medium">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <button
        type="submit"
        disabled={loading || !formData.username || !formData.password}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
