import React, { useState } from "react";

function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setSuccessMessage("Thank you for reaching out! We will get back to you soon.");
            setFormData({ name: "", email: "", message: "" });
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Contact Us</h1>

                <p className="text-center text-gray-600 mb-6 font-semibold">
                    Have questions or need assistance? Feel free to reach out to us. We’d love to hear from you!
                </p>

                <div className="mb-8 font-semibold">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Address</h2>
                    <p className="text-gray-600">bole tom tawer, 2 flor room 207 addis ababa, Ethiopia</p>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Phone</h2>
                    <p className="text-gray-600">+251 (907) 525-280</p>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Email</h2>
                    <p className="text-gray-600">contact@hulutena.com</p>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Office Hours</h2>
                    <p className="text-gray-600">
                        Monday - Friday: 2:00 AM - 11:00 AM(Ethiopian Time)<br />
                        Saturday: 4:00 AM - 10:00 AM(Ethiopian Time)<br />
                        Sunday: Closed
                    </p>
                </div>

                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Contact Form</h2>
                {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                            }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                                errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                            }`}
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;
