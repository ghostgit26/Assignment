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

/**
 * Filters data by date range.
 * @param {Array<object>} data - The dataset to filter.
 * @param {string} fromDate - Start date (YYYY-MM-DD format).
 * @param {string} toDate - End date (YYYY-MM-DD format).
 * @param {string} dateField - The field name containing date values.
 * @returns {Array<object>} Date-filtered dataset.
 */
export const filterDataByDate = (
  data = [],
  fromDate = "",
  toDate = "",
  dateField = "date"
) => {
  if (!Array.isArray(data)) return [];
  if (!fromDate && !toDate) return data;

  return data.filter((item) => {
    const itemDate = item[dateField];
    if (!itemDate) return true;

    // Handle different date formats and ensure valid date parsing
    let normalizedDate;
    try {
      // If itemDate is already in YYYY-MM-DD format, use it directly
      if (
        typeof itemDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(itemDate)
      ) {
        normalizedDate = itemDate;
      } else {
        // Parse other date formats and convert to YYYY-MM-DD
        const dateObj = new Date(itemDate);
        if (isNaN(dateObj.getTime())) {
          return true; // Skip invalid dates
        }
        normalizedDate = dateObj.toISOString().split("T")[0];
      }
    } catch (error) {
      return true; // Skip items with unparseable dates
    }

    if (fromDate && normalizedDate < fromDate) return false;
    if (toDate && normalizedDate > toDate) return false;

    return true;
  });
};
