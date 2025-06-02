import { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
  username: string;
  password_1: string;
  password_2: string;
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password_1: "",
    password_2: "",
  });
  const [loading, setLoading] = useState(false);

  function isStrongPassword(password: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !formData.username.trim() ||
      !formData.password_1.trim() ||
      !formData.password_2.trim()
    ) {
      return;
    }

    if (formData.password_1 !== formData.password_2) {
      toast.error("Paaswords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password_1,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.detail || "Registration failed");
        return;
      }

      toast.success("Account created successfully!");

      setFormData({
        username: "",
        password_1: "",
        password_2: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username (required)"
        className="flex-grow border border-gray-300 rounded px-3 py-2"
      />
      <input
        type="password"
        name="password_1"
        value={formData.password_1}
        onChange={handleChange}
        placeholder="Password (required)"
        className="flex-grow border border-gray-300 rounded px-3 py-2"
      />
      <p>Please repeat password</p>
      <input
        type="password"
        name="password_2"
        value={formData.password_2}
        onChange={handleChange}
        placeholder="Repeat Password (required)"
        className="flex-grow border border-gray-300 rounded px-3 py-2"
      />

      <button
        type="submit"
        disabled={
          loading ||
          !formData.username.trim() ||
          !formData.password_1.trim() ||
          !formData.password_2.trim() ||
          formData.password_1 !== formData.password_2 ||
          !isStrongPassword(formData.password_1)
        }
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
}

export default Signup;
