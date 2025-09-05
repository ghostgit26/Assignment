import React from "react";
import PropTypes from "prop-types";

/**
 * RowsPerPageSelector component allows users to select the number of rows displayed per page.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.value - The current rows per page value.
 * @param {Function} props.onChange - Callback function to handle changes in rows per page.
 * @returns {JSX.Element} Rendered RowsPerPageSelector component.
 */

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
