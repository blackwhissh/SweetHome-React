import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Components

// Pages
import RegClient from "./Pages/Auth/RegClient";
import RegOwner from "./Pages/Auth/RegOwner";
import RegAgent from "./Pages/Auth/RegAgent";

import Login from "./Pages/Auth/Login";
import RegistrationForm from "./Pages/Auth/RegistrationForm";

import Client from "./Pages/Dashboards/Client/Client";
import Owner from "./Pages/Dashboards/Owner/Owner";
import Agent from "./Pages/Dashboards/Agent/Agent";

import Home from "./Pages/Home";
import About from "./Pages/About";
import FAQ from "./Pages/FAQ";
import Contact from "./Pages/Contact";
import ClientRequest from "./Pages/Dashboards/Client/clientRequests";
import ErrorPage from "./Pages/error-page";
// Layouts
import Layout from "./Layouts/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="RegClient" element={<RegClient />} />
      <Route path="RegOwner" element={<RegOwner />} />
      <Route path="RegAgent" element={<RegAgent />} />
      <Route path="client" element={<Client />} />
      <Route path="client/request" element={<ClientRequest />} />
      <Route path="Owner" element={<Owner />} />
      <Route path="Login" element={<Login />} />
      <Route path="Agent" element={<Agent />} />
      <Route path="about" element={<About />} />
      <Route path="RegistrationForm" element={<RegistrationForm />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
