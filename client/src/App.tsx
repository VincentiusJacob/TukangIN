import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import ChooseRole from './pages/ChooseRole';
import ServicePage from './pages/ServicePage'

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chooserole" element={<ChooseRole />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/service" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
