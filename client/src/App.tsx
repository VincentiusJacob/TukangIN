import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ChooseRole from "./pages/ChooseRole";
import HistoryPage from "./pages/HistoryPage";
import RegisterTukang from "./pages/RegisterTukang";
import Profile from "./pages/Profile";
import ServicesPage from "./pages/ServicesPage";

import "./App.css";
import RegisterCustomer from "./pages/RegisterCustomer";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chooserole" element={<ChooseRole />} />
        <Route path="/registertukang" element={<RegisterTukang />} />
        <Route path="/registercustomer" element={<RegisterCustomer />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
