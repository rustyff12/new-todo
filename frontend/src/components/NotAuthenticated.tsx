import { Link } from "react-router-dom";

function NotAuthenticated() {
  return (
    <section className="border border-gray-300 rounded p-4 shadow-md space-y-3">
      <h2 className="text-xl mb-4 text-gray-700">You're not logged in</h2>
      <Link to="/login">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 mb-2">
          Login
        </button>
      </Link>
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </section>
  );
}

export default NotAuthenticated;
