import {  Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import AppointmentPage from "./pages/AppointmentPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorsPage from "./pages/DoctorsPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
    <Routes>
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
