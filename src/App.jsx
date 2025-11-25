import "./App.css";
import Login from "./components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import IndSignUp from "./components/IndSignUp.jsx";
import OrgSignUp from "./components/OrgSignUp.jsx";
import OrgDashboard from "./components/OrgDashboard.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/individual" element={<IndSignUp />} />
          <Route path="/organisation" element={<OrgSignUp />} />
          <Route path="/org/dashboard" element={<OrgDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
