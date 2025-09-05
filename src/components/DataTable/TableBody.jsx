import React from "react";
import PropTypes from "prop-types";

/**
 * TableBody component renders the body rows of a table.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<{key: string}>} props.columns - List of column definitions.
 * @param {Array<Object>} props.data - The dataset to display in the table.
 * @param {string} props.search - The current search query.
 * @returns {JSX.Element} Rendered TableBody component.
 */
const TableBody = ({ columns, data, search }) => (
  <tbody>
    {data.length > 0 ? (
      data.map((row, idx) => (
        <tr key={row.id || idx}>
          {columns.map((col) => (
            <td key={col.key}>{row[col.key]}</td>
          ))}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={columns.length} className="text-center text-muted">
          {search ? "No matching records found" : "No records found"}
        </td>
      </tr>
    )}
  </tbody>
);

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
};

export default TableBody;
