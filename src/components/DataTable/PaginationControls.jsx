import React from "react";
import PropTypes from "prop-types";

/**
 * Pagination buttons to navigate pages.
 */
const PaginationControls = ({ page, totalPages, onChange }) => (
  <div className="d-flex align-items-center gap-2">
    <button
      className="btn btn-sm btn-outline-secondary"
      disabled={page === 1}
      onClick={() => onChange(page - 1)}
    >
      ← Previous
    </button>
    <span className="px-2 text-muted">
      {totalPages > 0 ? `${page} of ${totalPages}` : "0 of 0"}
    </span>
    <button
      className="btn btn-sm btn-outline-secondary"
      disabled={page === totalPages || totalPages === 0}
      onClick={() => onChange(page + 1)}
    >
      Next →
    </button>
  </div>
);

PaginationControls.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaginationControls;
