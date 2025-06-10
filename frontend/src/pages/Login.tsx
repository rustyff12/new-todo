import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import PasswordInput from "../components/PasswordInput";
import {
  cardContainer,
  cardHeading,
  defaultButton,
  inputBase,
} from "../styles/ui";

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
      const data = await login(formData);
      // Clear existing tokens
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      toast.success("Logged in!");
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Something went wrong: ${err.message}`);
      } else {
        toast.error("Something went wrong.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={cardContainer}>
      <h2 className={cardHeading}>Log In</h2>
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
          className={inputBase}
        />

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
        />

        <button
          type="submit"
          disabled={loading || !formData.username || !formData.password}
          className={defaultButton}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default Login;
