import {  Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Resourses from "./pages/Resourses";
import Community from "./pages/Community";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import WrittenPost from "./pages/WrittenPost";

function App() {
  return (
    <div>
      <Header />
    <Routes>
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/resourses" element={<Resourses />} />
      <Route path="/resourses/:id" element={<WrittenPost />} />
      <Route path="/community" element={<Community />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
