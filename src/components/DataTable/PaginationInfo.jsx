import React from "react";

/**
 * PaginationInfo component displays information about the current pagination state.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.currentPageData - The current page dataset.
 * @param {number} props.page - The current page number.
 * @param {number} props.rowsPerPage - The number of rows displayed per page.
 * @param {number} props.totalFilteredRecords - The total number of filtered records.
 * @param {number} props.totalRecords - The total number of records.
 * @param {string} props.search - The current search query.
 * @returns {JSX.Element} Rendered PaginationInfo component.
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
