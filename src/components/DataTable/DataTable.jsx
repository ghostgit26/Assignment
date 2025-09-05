import React, { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import SearchBar from "./SearchBar";
import DateFilter from "./DateFilter";
import PaginationControls from "./PaginationControls";
import RowsPerPageSelector from "./RowsPerPageSelector";
import PaginationInfo from "./PaginationInfo";
import { filterData, sortData, paginateData, filterDataByDate } from "./utils";

/**
 * DataTable component provides a generic, reusable table with search, date filtering, and pagination.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.data - The dataset to display.
 * @param {Array<{key: string, label: string}>} props.columns - Table column definitions.
 * @returns {JSX.Element} Rendered DataTable component.
 */
const DataTable = ({ data = [], columns = [] }) => {
  // Calculate default date range: 90 days ago to today
  const getDefaultDateRange = () => {
    const today = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(today.getDate() - 90);

    return {
      startDate: ninetyDaysAgo.toISOString().split("T")[0], // YYYY-MM-DD format
      endDate: today.toISOString().split("T")[0], // YYYY-MM-DD format
    };
  };

  const defaultDates = getDefaultDateRange();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fromDate, setFromDate] = useState(defaultDates.startDate);
  const [toDate, setToDate] = useState(defaultDates.endDate);
  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");

  /** Handle date filter search */
  const handleDateSearch = () => {
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
    setPage(1); // Reset to first page when applying new filter
  };

  /** Handle date filter reset */
  const handleDateReset = () => {
    const defaultDates = getDefaultDateRange();
    setFromDate(defaultDates.startDate);
    setToDate(defaultDates.endDate);
    setAppliedFromDate(defaultDates.startDate);
    setAppliedToDate(defaultDates.endDate);
    setPage(1); // Reset to first page when resetting filter
  };

  /** Processed data (filter by search + date + sort) */
  const processedData = useMemo(() => {
    let filtered = filterData(data, search);
    let dateFiltered = filterDataByDate(
      filtered,
      appliedFromDate,
      appliedToDate
    );
    let sorted = sortData(dateFiltered, sortKey, order);
    return sorted;
  }, [data, search, appliedFromDate, appliedToDate, sortKey, order]);

  /** Paginated data */
  const paginatedData = useMemo(
    () => paginateData(processedData, page, rowsPerPage),
    [processedData, page, rowsPerPage]
  );

  /** Total pages */
  const totalPages = Math.ceil(processedData.length / rowsPerPage) || 1;

  return (
    <div className="card p-3 shadow-sm">
      {/* Search + Date Filter Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ marginRight: "20px" }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <DateFilter
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onSearchClick={handleDateSearch}
          onResetClick={handleDateReset}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <TableHeader
            columns={columns}
            sortKey={sortKey}
            sortOrder={order}
            onSort={(key) => {
              if (sortKey === key) {
                setOrder(order === "asc" ? "desc" : "asc");
              } else {
                setSortKey(key);
                setOrder("asc");
              }
            }}
          />
          <TableBody data={paginatedData} columns={columns} search={search} />
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
