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
// import About from "./Pages/About";
// import FAQ from "./Pages/FAQ";
// import Contact from "./Pages/Contact";
import AgentRequests from "./Pages/Dashboards/Agent/agentRequests";
import ClientRequest from "./Pages/Dashboards/Client/clientRequests";
import ErrorPage from "./Pages/error-page";
import OwnerProperties from "./Pages/Dashboards/Owner/ownerProperties";
import ShowAgentsOwner from "./Pages/Dashboards/Owner/ShowAgentsOwner";
// Layouts
import Layout from "./Layouts/Layout";
import ShowAgents from "./Pages/Dashboards/Client/ShowAgents";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="RegClient" element={<RegClient />} />
      <Route path="RegOwner" element={<RegOwner />} />
      <Route path="RegAgent" element={<RegAgent />} />
      <Route path="client" element={<Client />} />

      <Route path="client/requests/all" element={<ClientRequest />} />
      <Route path="client/requests/agents" element={<ShowAgents />} />

      <Route path="owner/properties/all" element={<OwnerProperties />} />
      <Route path="owner/properties/agents" element={<ShowAgentsOwner />} />

      <Route path="agent/requests/active" element={<AgentRequests />} />

      <Route path="Owner" element={<Owner />} />
      <Route path="Login" element={<Login />} />
      <Route path="Agent" element={<Agent />} />
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
