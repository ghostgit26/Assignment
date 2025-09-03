import React from "react";
import PropTypes from "prop-types";

/**
 * Selector to choose rows per page.
 */
const RowsPerPageSelector = ({ value, onChange }) => (
  <div style={{ minWidth: "120px" }}>
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value={5}>5 rows</option>
      <option value={10}>10 rows</option>
      <option value={25}>25 rows</option>
      <option value={50}>50 rows</option>
      <option value={100}>100 rows</option>
    </select>
  </div>
);

RowsPerPageSelector.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RowsPerPageSelector;
