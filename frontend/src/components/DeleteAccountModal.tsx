import { useState } from "react";
import toast from "react-hot-toast";

function DeleteAccountModal({
  onClose,
  onDeleted,
}: {
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const token = localStorage.getItem("access");
    setPassword("");
    try {
      const response = await fetch(
        "http://localhost:8000/api/delete-account/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Account deletion failed");
        return;
      }

      toast.success("Account deleted");
      localStorage.removeItem("access");
      onDeleted();
    } catch (error) {
      if (error instanceof Error) {
        console.error("DELETE error:", error);
        toast.error(error.message);
      } else {
        console.error("DELETE unknown error:", error);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4 text-red-600">Delete Account</h2>
        <p className="mb-2 text-sm">Enter your password to confirm deletion:</p>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            onClick={handleDelete}
            disabled={loading || !password}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
