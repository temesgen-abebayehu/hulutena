import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineUser, AiOutlinePhone, AiOutlineLock } from "react-icons/ai";
import { FaUserMd, FaUser } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "patient",
    password: "",
    contactNumber: "",
    confirmPassword: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(t.registrationSuccess);
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || t.registrationFailed);
      }
      setFormData({ fullName: "", email: "", role: "patient", password: "", contactNumber: "", confirmPassword: "", gender: "" });
    } catch (err) {
      setError(err.message || t.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Info Panel */}
          <div className="hidden md:flex flex-col justify-between rounded-2xl p-8 bg-gradient-to-br from-blue-700 via-sky-600 to-cyan-500 text-white shadow-xl">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{t.registerTitle}</h1>
              <p className="mt-3 text-white/90">{t.exploreFeaturesDesc}</p>
            </div>
            <ul className="mt-8 space-y-4 text-white/95">
              <li className="flex items-start gap-3"><FaUser className="mt-1" />{t.joinCommunity}</li>
              <li className="flex items-start gap-3"><FaUserMd className="mt-1" />{t.connectProfessionals}</li>
            </ul>
            <div className="mt-8 text-sm text-white/80">
              <span>&copy; HuluTena</span>
            </div>
          </div>

          {/* Register Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10">
            <div className="text-center md:hidden mb-6">
              <h1 className="text-3xl font-bold text-blue-800">{t.registerTitle}</h1>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-center border border-red-200">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-center border border-green-200">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                  {t.username}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <AiOutlineUser />
                  </span>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t.enterFullNamePlaceholder}
                    className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    required
                    aria-label={t.username}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  {t.emailAddress}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <AiOutlineMail />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.enterEmailPlaceholder}
                    className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    required
                    aria-label={t.emailAddress}
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                  {t.role}
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    required
                    aria-label={t.role}
                  >
                    <option value="patient">{t.patient}</option>
                    <option value="doctor">{t.doctor}</option>
                  </select>
                </div>
              </div>

              {/* Contact Number */}
              <div className="mb-4">
                <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">
                  {t.contactNumber}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <AiOutlinePhone />
                  </span>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder={t.enterPhoneNumberPlaceholder}
                    className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    required
                    aria-label={t.contactNumber}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="mb-4">
                <span className="block text-gray-700 font-medium mb-2">{t.gender}</span>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} />
                    <span>{t.male}</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} />
                    <span>{t.female}</span>
                  </label>
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <AiOutlineLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t.createPasswordPlaceholder}
                    className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 pr-10"
                    required
                    aria-label={t.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                    ) : (
                      <AiOutlineEye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <AiOutlineLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t.confirmPasswordPlaceholder}
                    className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 pr-10"
                    required
                    aria-label={t.confirmPassword}
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center mb-4">
                <input type="checkbox" id="terms" required className="mr-2" />
                <label htmlFor="terms" className="text-gray-600 text-sm">
                  {t.iAgreeTo} {" "}
                  <a href="#" className="text-blue-600 hover:underline">{t.termsAndConditions}</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.registering}
                  </span>
                ) : (
                  t.register
                )}
              </button>

              <p className="text-center text-gray-600 mt-6">
                {t.alreadyHaveAccount} {" "}
                <a href="/login" className="text-blue-600 hover:underline">{t.login}</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
