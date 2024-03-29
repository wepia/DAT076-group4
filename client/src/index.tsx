import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import Layout from "./components/layout";
import Home from "./pages/home";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/login';
import Registration from "./pages/RegistrationForm";
import UserPage from "./pages/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      
      {
        path: "/login",
        element: <Login />
      },
    
      {
        path: "/registration",
        element: <Registration />,
      },

      {
        path: "/home",
        element: <Home />,
      },

      {
        path:"/profile",
        element:<UserPage/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



