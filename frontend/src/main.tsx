import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import ToDoDetail from "./pages/ToDoDetail.tsx";
import "./index.css";

// Route definitions
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "todos/:id", element: <ToDoDetail /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>
);
