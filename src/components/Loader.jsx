import React from "react";

/**
 * Loader component displays a spinner while data is being fetched.
 *
 * @component
 * @returns {JSX.Element} Rendered Loader component.
 */

/**
 * Loader spinner shown while data is fetching
 */
function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
