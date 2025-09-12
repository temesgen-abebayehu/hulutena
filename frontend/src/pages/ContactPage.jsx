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
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
                    {t.contactTitle}
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    {t.contactDesc}
                </p>
                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            {t.name}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            {t.emailAddress}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                            {t.message}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.message ? "border-red-500" : "border-gray-300"}`}
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        {t.sendMessage}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;
