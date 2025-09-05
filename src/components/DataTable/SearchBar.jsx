import React from "react";

/**
 * SearchBar component provides an input field for filtering table data.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.value - The current search value.
 * @param {Function} props.onChange - Callback function to handle input changes.
 * @returns {JSX.Element} Rendered SearchBar component.
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
