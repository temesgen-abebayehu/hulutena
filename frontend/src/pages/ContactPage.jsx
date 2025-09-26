import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const { t } = useLanguage();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t.nameRequired;
        if (!formData.email.trim()) {
            newErrors.email = t.emailRequired;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t.emailInvalid;
        }
        if (!formData.message.trim()) newErrors.message = t.messageRequired;
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setSuccessMessage(t.contactSuccessMessage);
            setFormData({ name: "", email: "", message: "" });
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-20 px-6 text-center">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                        {t.contactTitle}
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto">{t.contactDesc}</p>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="py-16 px-6">
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl">
                    {successMessage && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-8">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-lg font-semibold text-gray-800 mb-2"
                            >
                                {t.name}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg transition-shadow duration-300 ${errors.name
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-teal-500"
                                    } focus:outline-none focus:ring-2`}
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-2">{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-semibold text-gray-800 mb-2"
                            >
                                {t.emailAddress}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg transition-shadow duration-300 ${errors.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-teal-500"
                                    } focus:outline-none focus:ring-2`}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-lg font-semibold text-gray-800 mb-2"
                            >
                                {t.message}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg transition-shadow duration-300 ${errors.message
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-teal-500"
                                    } focus:outline-none focus:ring-2`}
                            ></textarea>
                            {errors.message && (
                                <p className="text-red-600 text-sm mt-2">{errors.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300"
                        >
                            {t.sendMessage}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
