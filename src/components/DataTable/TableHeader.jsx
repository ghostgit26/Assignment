import React from "react";
import PropTypes from "prop-types";

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
