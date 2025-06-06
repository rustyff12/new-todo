import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

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
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

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

        <div className="relative">
          <label
            htmlFor="password_1"
            className="block text-sm font-medium mb-1"
          >
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password_1"
              value={formData.password_1}
              onChange={handleChange}
              placeholder="Password (required)"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-20"
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword1((prev) => !prev)}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500"
              aria-label={showPassword1 ? "Hide password" : "Show password"}
            >
              {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {/* ℹ️ Info Icon */}
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 text-sm cursor-pointer select-none"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip((prev) => !prev)} // For mobile toggle
            >
              ℹ️
            </span>

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-300 rounded shadow-md text-black text-sm p-3 z-10">
                Password must contain at least:
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>8 characters</li>
                  <li>1 uppercase letter</li>
                  <li>1 lowercase letter</li>
                  <li>1 number</li>
                  <li>1 special character</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <label htmlFor="password_2" className="block text-sm font-medium">
          Please repeat password
        </label>
        <div className="relative">
          <input
            type={showPassword2 ? "text" : "password"}
            name="password_2"
            value={formData.password_2}
            onChange={handleChange}
            placeholder="Repeat Password (required)"
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword2((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-label={showPassword2 ? "Hide password" : "Show password"}
          >
            {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

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
    </section>
  );
}

export default Signup;
