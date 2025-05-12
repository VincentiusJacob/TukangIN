import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ChooseRole from './pages/ChooseRole';
import ServicePage from './pages/ServicePage';
import RegisterTukang from './pages/RegisterTukang';
import Profile from "./pages/Profile";




import "./App.css";
import RegisterCustomer from "./pages/RegisterCustomer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chooserole" element={<ChooseRole />} />
        <Route path="/registertukang" element={<RegisterTukang />} />
        <Route path="/registercustomer" element={<RegisterCustomer />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
