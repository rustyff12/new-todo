import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { register } from "../services/auth";
import { isStrongPassword, isValidEmail } from "../utils/validation";
import {
  cardContainer,
  cardHeading,
  defaultButton,
  inputBase,
} from "../styles/ui";

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
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password_1,
      });

      toast.success("Account created successfully!");

      setFormData({
        username: "",
        email: "",
        password_1: "",
        password_2: "",
      });
      navigate("/login");
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
      <h2 className={cardHeading}>Sign Up </h2>
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
          className={inputBase}
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
          className={inputBase}
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
          className={defaultButton}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
}

export default Signup;
