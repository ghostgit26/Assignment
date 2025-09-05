import React from "react";
import PropTypes from "prop-types";

/**
 * TableHeader component renders the header row of a table with sortable columns.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<{key: string, label: string}>} props.columns - List of column definitions.
 * @param {string} props.sortKey - The key of the currently sorted column.
 * @param {"asc"|"desc"} props.sortOrder - The current sort order.
 * @param {Function} props.onSort - Callback function to handle column sorting.
 * @returns {JSX.Element} Rendered TableHeader component.
 */
const TableHeader = ({ columns, sortKey, sortOrder, onSort }) => (
  <thead className="table-dark">
    <tr>
      {columns.map((col) => (
        <th
          key={col.key}
          onClick={() => onSort(col.key)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {col.label}
          <span className="ms-1">
            {sortKey === col.key ? (
              sortOrder === "asc" ? (
                "▲"
              ) : (
                "▼"
              )
            ) : (
              <span style={{ color: "#666" }}>⇅</span>
            )}
          </span>
        </th>
      ))}
    </tr>
  </thead>
);

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortOrder: PropTypes.oneOf(["asc", "desc"]).isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
