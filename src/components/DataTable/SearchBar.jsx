import React from "react";

/**
 * Search input for filtering table data.
 *
 * @component
 * @param {Object} props
 * @param {string} props.value - Current search value.
 * @param {(value: string) => void} props.onChange - Callback when input changes.
 */
const SearchBar = ({ value = "", onChange = () => {} }) => {
  const handleChange = (e) => {
    onChange(e.target.value); // ✅ always calls the parent callback
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
