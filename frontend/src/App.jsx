import {  Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Resources from "./pages/ResourcesPage";
import Community from "./pages/Community";
import DoctorProfile from "./pages/DoctorProfile";
import SingleResource from "./pages/SingleResource";
import ContactPage from "./pages/ContactPage";
import Appointment from "./pages/AppointmentPage";
import Profile from "./pages/ProfilePage";
import UserAppointment from "./pages/UserAppointment";
import EditProfile from "./pages/EditProfile";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <div>
      <Header />
    <Routes>
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/appointment/:id" element={<UserAppointment />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resources/:id" element={<SingleResource />} />
      <Route path="/community" element={<Community />} />
      <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
