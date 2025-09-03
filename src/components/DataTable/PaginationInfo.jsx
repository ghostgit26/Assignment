import React from "react";

/**
 * Displays information about pagination (e.g. "Showing 1 to 5 of 20 entries").
 *
 * @component
 * @param {Object} props
 * @param {Array<object>} props.currentPageData - The current page dataset.
 * @param {number} props.page - Current page number.
 * @param {number} props.rowsPerPage - Number of rows per page.
 * @param {number} props.totalFilteredRecords - Total records after filtering.
 * @param {number} props.totalRecords - Total dataset size.
 * @param {string} props.search - Active search query.
 */
const PaginationInfo = ({
  currentPageData = [],
  page = 1,
  rowsPerPage = 5,
  totalFilteredRecords = 0,
  totalRecords = 0,
  search = "",
}) => (
  <div className="text-muted small">
    Showing {currentPageData.length > 0 ? (page - 1) * rowsPerPage + 1 : 0} to{" "}
    {Math.min(page * rowsPerPage, totalFilteredRecords)} of{" "}
    {totalFilteredRecords} entries
    {search && ` (filtered from ${totalRecords} total entries)`}
  </div>
);

export default PaginationInfo;
