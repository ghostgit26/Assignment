/**
 * Logger utility for API requests, responses, and errors.
 *
 * @module logger
 */

/**
 * Logs an API request.
 * @param {string} url - The API endpoint URL.
 * @param {Object} [options={}] - Additional request options.
 */
export function logRequest(url, options = {}) {
  console.log(
    "%cAPI Request:",
    "color: blue; font-weight: bold;",
    url,
    options
  );
}

/**
 * Logs an API response.
 * @param {string} url - The API endpoint URL.
 * @param {Object} response - The API response data.
 */
export function logResponse(url, response) {
  console.log(
    "%cAPI Response:",
    "color: green; font-weight: bold;",
    url,
    response
  );
}

/**
 * Logs an API error.
 * @param {string} url - The API endpoint URL.
 * @param {Error} error - The error object.
 */
export function logError(url, error) {
  console.error("%cAPI Error:", "color: red; font-weight: bold;", url, error);
}
