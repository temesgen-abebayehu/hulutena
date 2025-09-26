import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaGoogle, FaFacebook, FaHeartbeat, FaLanguage, FaBook } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();


  const validateForm = () => {
    if (!email || !password) {
      setError(t.loginAllFieldsRequired);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t.emailInvalid);
      return false;
    }
    return true;
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || t.loginFailedGeneric);
      }

      localStorage.setItem("user", JSON.stringify({ currentUser: data }));
      setMessage(t.loginSuccessRedirecting);
      setEmail("");
      setPassword("");
      setError(null);
      // Simulate redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setError(error.message || t.loginFailedGeneric);
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
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{t.loginTitle}</h1>
              <p className="mt-3 text-white/90">{t.loginSubtitle}</p>
            </div>
            <ul className="mt-8 space-y-4 text-white/95">
              <li className="flex items-start gap-3"><FaHeartbeat className="mt-1" />{t.effortlessAppointments}</li>
              <li className="flex items-start gap-3"><FaLanguage className="mt-1" />{t.multilingualSearch}</li>
              <li className="flex items-start gap-3"><FaBook className="mt-1" />{t.accessibleInfo}</li>
            </ul>
            <div className="mt-8 text-sm text-white/80">
              <span>&copy; HuluTena</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10">
            <div className="text-center md:hidden mb-6">
              <h1 className="text-3xl font-bold text-blue-800">{t.loginTitle}</h1>
              <p className="text-gray-600 mt-2">{t.loginSubtitle}</p>
            </div>

            {/* Display Error Message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-center border border-red-200">
                {error}
              </div>
            )}

            {/* Display Success Message */}
            {message && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-center border border-green-200">
                {message}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="mb-5">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.enterEmailPlaceholder}
                    className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-label={t.emailAddress}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.enterPasswordPlaceholder}
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

              {/* Forgot Password */}
              <div className="flex justify-end mb-4">
                <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">
                  {t.forgotPassword}
                </a>
              </div>

              {/* Submit Button */}
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
                    {t.loggingIn}
                  </span>
                ) : (
                  t.login
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-gray-500 text-sm">{t.orText}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2.5 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaGoogle className="w-5 h-5 mr-2 text-red-600" />
                {t.google}
              </button>
              <button className="flex items-center justify-center py-2.5 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaFacebook className="w-5 h-5 mr-2 text-blue-600" />
                {t.facebook}
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-6">
              {t.dontHaveAccount} {" "}
              <a href="/register" className="text-blue-600 hover:underline">{t.register}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;