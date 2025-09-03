/**
 * Filters data based on a search query.
 * @param {Array<object>} data - The dataset to filter.
 * @param {string} search - The search query.
 * @returns {Array<object>} Filtered dataset.
 */
export const filterData = (data = [], search = "") => {
  if (!Array.isArray(data)) return [];
  if (!search) return data;
  const lowerSearch = search.toLowerCase();
  return data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(lowerSearch)
    )
  );
};

/**
 * Sorts data by a given key and order.
 * @param {Array<object>} data - The dataset to sort.
 * @param {string} sortKey - The key to sort by.
 * @param {"asc"|"desc"} order - Sort order.
 * @returns {Array<object>} Sorted dataset.
 */
export const sortData = (data = [], sortKey = "", order = "asc") => {
  if (!Array.isArray(data) || !sortKey) return data || [];
  return [...data].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA === undefined || valB === undefined) return 0;
    return order === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
};

/**
 * Returns paginated slice of data.
 * @param {Array<object>} data - Full dataset.
 * @param {number} page - Current page number.
 * @param {number} rowsPerPage - Number of rows per page.
 * @returns {Array<object>} Paginated dataset.
 */
export const paginateData = (data = [], page = 1, rowsPerPage = 5) => {
  if (!Array.isArray(data)) return [];
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return data.slice(startIndex, endIndex);
};
