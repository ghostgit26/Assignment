import React from "react";
import PropTypes from "prop-types";

/**
 * Dropdown for sorting table data.
 */
const SortDropdown = ({ columns = [], value, onChange }) => {
  const handleChange = (e) => {
    const [key, order] = e.target.value.split(":");
    onChange({ key, order });
  };

  return (
    <select
      className="form-select"
      value={value.key ? `${value.key}:${value.order}` : ""}
      onChange={handleChange}
    >
      <option value="">Sort by...</option>
      {columns.map((col) => (
        <React.Fragment key={col.key}>
          <option value={`${col.key}:asc`}>{col.label} (Asc)</option>
          <option value={`${col.key}:desc`}>{col.label} (Desc)</option>
        </React.Fragment>
      ))}
    </select>
  );
};

SortDropdown.propTypes = {
  columns: PropTypes.array.isRequired,
  value: PropTypes.shape({
    key: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SortDropdown;
