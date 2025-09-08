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

    // Handle date sorting for date fields
    if (sortKey === "date" || sortKey === "monthYear") {
      const dateA = parseDateValue(valA);
      const dateB = parseDateValue(valB);

      if (dateA && dateB) {
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }
    }

    // Handle numeric sorting
    if (!isNaN(valA) && !isNaN(valB)) {
      const numA = Number(valA);
      const numB = Number(valB);
      return order === "asc" ? numA - numB : numB - numA;
    }

    // Default string sorting
    return order === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
};

/**
 * Parses various date formats and returns a Date object.
 * @param {string|Date} dateValue - The date value to parse.
 * @returns {Date|null} Parsed Date object or null if invalid.
 */
const parseDateValue = (dateValue) => {
  if (!dateValue) return null;

  // If it's already a Date object
  if (dateValue instanceof Date) return dateValue;

  // If it's a string in dd/mm/yyyy or dd-mm-yyyy format (display format)
  if (typeof dateValue === "string") {
    // Handle dd/mm/yyyy or dd-mm-yyyy format
    const ddmmyyyyMatch = dateValue.match(
      /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/
    );
    if (ddmmyyyyMatch) {
      const [, day, month, year] = ddmmyyyyMatch;
      return new Date(year, month - 1, day);
    }

    // Handle yyyy-mm-dd format (storage format)
    const yyyymmddMatch = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (yyyymmddMatch) {
      return new Date(dateValue);
    }

    // Handle MMM yyyy format (like "Jan 2023")
    const monthYearMatch = dateValue.match(/^([A-Za-z]{3})\s(\d{4})$/);
    if (monthYearMatch) {
      const [, monthStr, year] = monthYearMatch;
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthIndex = monthNames.indexOf(monthStr);
      if (monthIndex !== -1) {
        return new Date(year, monthIndex);
      }
    }

    // Try parsing as a general date string
    const parsedDate = new Date(dateValue);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  return null;
};

/**
 * Formats a date from yyyy-mm-dd format to dd-mm-yyyy format.
 * @param {string} dateString - Date string in yyyy-mm-dd format.
 * @returns {string} Formatted date string in dd-mm-yyyy format.
 */
export const formatDateToDisplay = (dateString) => {
  if (!dateString) return "";

  // If already in display format, return as is
  if (dateString.match(/^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/)) {
    return dateString;
  }

  // Parse yyyy-mm-dd format
  const yyyymmddMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (yyyymmddMatch) {
    const [, year, month, day] = yyyymmddMatch;
    return `${parseInt(day)}-${parseInt(month)}-${year}`;
  }

  // Try parsing as Date object
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
  } catch (error) {
    // Return original string if parsing fails
  }

  return dateString;
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
    // Check for originalDate field first (used in TransactionsTable)
    let itemDate = item.originalDate || item[dateField];
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
      } else if (
        typeof itemDate === "string" &&
        /^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/.test(itemDate)
      ) {
        // Handle dd-mm-yyyy or dd/mm/yyyy format
        const parts = itemDate.split(/[/-]/);
        const day = parts[0].padStart(2, "0");
        const month = parts[1].padStart(2, "0");
        const year = parts[2];
        normalizedDate = `${year}-${month}-${day}`;
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
