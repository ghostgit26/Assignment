import React, { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import PaginationControls from "./PaginationControls";
import RowsPerPageSelector from "./RowsPerPageSelector";
import PaginationInfo from "./PaginationInfo";
import { filterData, sortData, paginateData } from "./utils";

/**
 * Generic reusable DataTable with search, sorting, pagination.
 *
 * @component
 * @param {Object} props
 * @param {Array<object>} props.data - The dataset to display.
 * @param {Array<{key:string,label:string}>} props.columns - Table column definitions.
 */
const DataTable = ({ data = [], columns = [] }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /** Processed data (filter + sort) */
  const processedData = useMemo(() => {
    let filtered = filterData(data, search);
    let sorted = sortData(filtered, sortKey, order);
    return sorted;
  }, [data, search, sortKey, order]);

  /** Paginated data */
  const paginatedData = useMemo(
    () => paginateData(processedData, page, rowsPerPage),
    [processedData, page, rowsPerPage]
  );

  /** Total pages */
  const totalPages = Math.ceil(processedData.length / rowsPerPage) || 1;

  return (
    <div className="card p-3 shadow-sm">
      {/* Search + Sort Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown
          columns={columns}
          value={{ key: sortKey, order }}
          onChange={({ key, order }) => {
            setSortKey(key);
            setOrder(order);
          }}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <TableHeader columns={columns} />
          <TableBody data={paginatedData} columns={columns} />
        </table>
      </div>

      {/* Footer Controls */}
      <div className="d-flex justify-content-between align-items-center">
        <RowsPerPageSelector value={rowsPerPage} onChange={setRowsPerPage} />
        <PaginationInfo
          currentPageData={paginatedData}
          page={page}
          rowsPerPage={rowsPerPage}
          totalFilteredRecords={processedData.length}
          totalRecords={data.length}
          search={search}
        />
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </div>
    </div>
  );
};

export default DataTable;
