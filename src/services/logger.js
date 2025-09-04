// services/logger.js
export function logRequest(url, options = {}) {
  console.log(
    "%cAPI Request:",
    "color: blue; font-weight: bold;",
    url,
    options
  );
}

export function logResponse(url, response) {
  console.log(
    "%cAPI Response:",
    "color: green; font-weight: bold;",
    url,
    response
  );
}

export function logError(url, error) {
  console.error(
    "%cAPI Error:",
    "color: red; font-weight: bold;",
    url,
    error
  );
}
