import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ChooseRole from "./pages/ChooseRole";
import HistoryPage from "./pages/HistoryPage";
import RegisterTukang from "./pages/RegisterTukang";
import Profile from "./pages/Profile";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import "./App.css";
import RegisterCustomer from "./pages/RegisterCustomer";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import HomePageTukang from "./pages/HomePageTukang";
import OrdersTukang from "./pages/OrdersTukang";
import ClaimOrderPage from "./pages/ClaimOrderPage";

function App() {
  const currentUserID = localStorage.getItem("tukangid") || "";
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
        <Route path="/services/:serviceName" element={<ServiceDetailPage />} />
        <Route
          path="/tukang/home"
          element={<HomePageTukang userId={currentUserID} />}
        />
        <Route path="/tukang/my-orders" element={<OrdersTukang />} />
        <Route path="/tukang/jobs" element={<ClaimOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
