import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

interface FormData {
  username: string;
  email: string;
  password_1: string;
  password_2: string;
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password_1: "",
    password_2: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function isStrongPassword(password: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      !formData.email.trim() ||
      !formData.password_1.trim() ||
      !formData.password_2.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password_1 !== formData.password_2) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isStrongPassword(formData.password_1)) {
      toast.error("Password is not strong enough.");
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
          email: formData.email,
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
        email: "",
        password_1: "",
        password_2: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border border-gray-300 rounded p-4 shadow-md space-y-3">
      <h2 className="text-2xl font-bold underline text-slate-800 mb-4">
        Sign Up{" "}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username (required)"
          className="flex-grow border border-gray-300 rounded px-3 py-2"
        />

        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email (required)"
          className="flex-grow border border-gray-300 rounded px-3 py-2"
        />

        <PasswordInput
          name="password_1"
          value={formData.password_1}
          onChange={handleChange}
          label="Password"
          placeholder="Password (required)"
          tooltipContent={
            <>
              Password must contain at least:
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>8 characters</li>
                <li>1 uppercase letter</li>
                <li>1 lowercase letter</li>
                <li>1 number</li>
                <li>1 special character</li>
              </ul>
            </>
          }
        />

        <PasswordInput
          name="password_2"
          value={formData.password_2}
          onChange={handleChange}
          label="Please Repeat Password"
          placeholder="Repeat Password (required)"
        />

        <button
          type="submit"
          disabled={
            loading ||
            !formData.username.trim() ||
            !formData.email.trim() ||
            !isValidEmail(formData.email) ||
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
    </section>
  );
}

export default Signup;
