// Check if the app is running in production (Vercel sets this via Vite)
const isProduction = import.meta.env.PROD;

const BASE_URL = isProduction
    ? "https://hulutena.onrender.com/api"
    : "/api"; // Use proxy in development

/**
 * A centralized API client that abstracts away the fetch logic,
 * automatically handles URL construction for different environments,
 * and includes credentials by default.
 *
 * @param {string} path The API endpoint path (e.g., '/users').
 * @param {object} [options={}] The options object for the fetch call.
 * @returns {Promise<Response>} The response from the fetch call.
 */
const apiClient = (path, options = {}) => {
    const url = `${BASE_URL}${path}`;

    const defaultOptions = {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        // Always include credentials for authentication (cookies)
        credentials: "include",
        ...options,
    };

    return fetch(url, defaultOptions);
};

export default apiClient;
