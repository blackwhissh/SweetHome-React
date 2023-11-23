import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import RegClient from "../Pages/Auth/RegClient";
import Login from "../Pages/Auth/Login";
import About from "../Pages/About";
import FAQ from "../Pages/FAQ";
import Contact from "../Pages/Contact";
import Help from "../Pages/Help";
import RegOwner from "../Pages/Auth/RegOwner";
import RegAgent from "../Pages/Auth/RegAgent";
import ErrorPage from "../Pages/error-page";

import Client from "../Pages/Dashboards/Client/Client";
import Owner from "../Pages/Dashboards/Owner/Owner";
import Agent from "../Pages/Dashboards/Agent/Agent";

const role = localStorage.getItem("useRole");
const isLoggedIn = () => {
  return !!localStorage.getItem("accessToken"); // Return true if logged in
};

const PrivateRoute = ({ path, element, requiredRole }) => {
  const navigate = useNavigate();

  if (!isLoggedIn()) {
    return <Navigate to="/401" />; // Redirect to the login page, prevent rendering the protected component
  }

  if (role !== requiredRole) {
    // navigate('/401');
    return <Navigate to="/401" />;
  }
  // If the user is logged in, render the protected component
  return <Route path={path} element={element} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/regClient",
    element: <RegClient />,
  },
  {
    path: "/regAgent",
    element: <RegAgent />,
  },
  {
    path: "/regOwner",
    element: <RegOwner />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
