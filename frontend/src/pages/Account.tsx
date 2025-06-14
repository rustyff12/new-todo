import { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { toast } from "react-hot-toast";
import NotAuthenticated from "../components/NotAuthenticated";

function Account() {
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    email: "",
    todoTotal: "",
    complete: "",
    incomplete: "",
  });

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleLogout = useLogout();
  const button_css = "px-4 py-2 rounded cursor-pointer text-white ";

  async function handleDeleteAccount() {
    const token = localStorage.getItem("access");

    if (!deletePassword) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(
        "http://localhost:8000/api/delete-account/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: deletePassword }),
        }
      );

      if (response.status === 403) {
        toast.error("Incorrect password");
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        toast.error(data?.detail || "Failed to delete account.");
        return;
      }

      toast.success("Account deleted");
      handleLogout();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setShowModal(false);

      setDeleting(false);
    }
  }

  async function fetchAccountInfo() {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/account/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch account info");

      const data = await response.json();
      setAccountInfo(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching account info:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAccountInfo();
  }, []);

  if (loading || isAuthenticated === null)
    return <p>Loading account info...</p>;

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }

  return (
    <article className="border border-gray-300 rounded p-4 shadow-md space-y-3">
      <h2 className="text-2xl font-bold underline text-slate-800 mb-4">
        Welcome {accountInfo.username}
      </h2>
      <p>
        <span className=" font-medium">Username: </span> {accountInfo.username}
      </p>
      <p>
        <span className=" font-medium">Email: </span> {accountInfo.email}
      </p>
      <p>
        <span className=" font-medium">Total Todos: </span>{" "}
        {accountInfo.todoTotal}
      </p>
      <p>
        <span className=" font-medium">Complete: </span> {accountInfo.complete}
      </p>
      <p>
        <span className=" font-medium">Incomplete: </span>{" "}
        {accountInfo.incomplete}
      </p>

      <div className="flex justify-around">
        <button
          onClick={handleLogout}
          className={`bg-blue-600 mt-2 hover:bg-blue-800 ${button_css}`}
        >
          Log Out
        </button>

        <button
          className={`bg-red-600 mt-2 hover:bg-red-800 ${button_css}`}
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600">
              Enter your password to delete your account:
            </p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default Account;
