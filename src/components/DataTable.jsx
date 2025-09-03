// DataTable.js
import React, { useState, useMemo } from "react";

/**
 * Enhanced DataTable with sorting dropdown, rows per page, and optimizations
 * @param {Array} columns - [{ key: string, label: string }]
 * @param {Array} data - Table rows
 */
const DataTable = ({ columns, data }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Memoized filtering and sorting for better performance
  const processedData = useMemo(() => {
    let filtered = data;

    // Filtering
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = data.filter((row) => {
        return Object.values(row).some((val) => {
          return String(val).toLowerCase().includes(searchLower);
        });
      });
    }

    // Sorting
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        let comparison = 0;
        if (typeof valA === "number" && typeof valB === "number") {
          comparison = valA - valB;
        } else {
          const strA = String(valA).toLowerCase();
          const strB = String(valB).toLowerCase();
          comparison = strA.localeCompare(strB);
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, search, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    return processedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [processedData, page, rowsPerPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, sortKey, sortOrder, rowsPerPage]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleSortDropdownChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setSortKey("");
      setSortOrder("asc");
    } else {
      const parts = value.split("-");
      setSortKey(parts[0]);
      setSortOrder(parts[1]);
    }
  };

  const getSortDropdownValue = () => {
    return sortKey ? sortKey + "-" + sortOrder : "";
  };

  return (
    <div>
      {/* Controls Row */}
      <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
        {/* Search Bar */}
        <div className="flex-grow-1" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div style={{ minWidth: "200px" }}>
          <select
            className="form-select"
            value={getSortDropdownValue()}
            onChange={handleSortDropdownChange}
          >
            <option value="">Sort by...</option>
            {columns.map((col) => (
              <React.Fragment key={col.key}>
                <option value={col.key + "-asc"}>
                  {col.label} (Ascending)
                </option>
                <option value={col.key + "-desc"}>
                  {col.label} (Descending)
                </option>
              </React.Fragment>
            ))}
          </select>
        </div>

        {/* Rows Per Page */}
        <div style={{ minWidth: "120px" }}>
          <select
            className="form-select"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                  className="position-relative"
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
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
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
        </table>
      </div>

      {/* Pagination & Info */}
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <div className="text-muted small">
          Showing {paginatedData.length > 0 ? (page - 1) * rowsPerPage + 1 : 0}{" "}
          to {Math.min(page * rowsPerPage, processedData.length)} of{" "}
          {processedData.length} entries
          {search && " (filtered from " + data.length + " total entries)"}
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Previous
          </button>

          <span className="px-2 text-muted">
            {totalPages > 0 ? page + " of " + totalPages : "0 of 0"}
          </span>

          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
