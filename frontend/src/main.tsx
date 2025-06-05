import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import ToDoDetail from "./pages/ToDoDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import AddTodo from "./pages/AddTodo.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Account from "./pages/Account.tsx";
import "./index.css";

// Route definitions
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "todos/:id", element: <ToDoDetail /> },
      { path: "add", element: <AddTodo /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "account", element: <Account /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster position="top-right" reverseOrder={false} />
  </>
);
