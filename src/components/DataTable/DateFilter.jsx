import React from "react";
import PropTypes from "prop-types";

/**
 * DateFilter component provides date range filtering with from and to date inputs and reset button.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.fromDate - The start date for filtering.
 * @param {string} props.toDate - The end date for filtering.
 * @param {Function} props.onFromDateChange - Callback function to handle from date changes.
 * @param {Function} props.onToDateChange - Callback function to handle to date changes.
 * @param {Function} props.onResetClick - Callback function to handle reset button click.
 * @returns {JSX.Element} Rendered DateFilter component.
 */
const DateFilter = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onResetClick,
}) => {
  return (
    <div className="d-flex gap-2 align-items-center">
      <label htmlFor="from-date" className="form-label mb-0 text-nowrap">
        From:
      </label>
      <input
        id="from-date"
        type="date"
        className="form-control"
        value={fromDate}
        onChange={(e) => onFromDateChange(e.target.value)}
        style={{ minWidth: "140px" }}
      />
      <label htmlFor="to-date" className="form-label mb-0 text-nowrap">
        To:
      </label>
      <input
        id="to-date"
        type="date"
        className="form-control"
        value={toDate}
        onChange={(e) => onToDateChange(e.target.value)}
        style={{ minWidth: "140px" }}
      />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onResetClick}
        style={{ minWidth: "80px" }}
      >
        Reset
      </button>
    </div>
  );
};

DateFilter.propTypes = {
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  onFromDateChange: PropTypes.func.isRequired,
  onToDateChange: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
};

export default DateFilter;
