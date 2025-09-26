const BASE_URL = "/api";

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
