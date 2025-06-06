import { useState } from "react";
import { useLogout } from "../hooks/useLogout";

function Account() {
  const [accountInfo, setAccountInfo] = useState({
    username: "User",
    email: "example@example.com",
    todoTotal: "12",
    complete: "8",
    incomplete: "4",
  });

  const handleLogout = useLogout();

  const button_css = "px-4 py-2 rounded cursor-pointer text-white ";

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

        <button className={`bg-red-600 mt-2 hover:bg-red-800 ${button_css}`}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default Account;
