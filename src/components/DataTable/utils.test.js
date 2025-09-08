import {
  filterData,
  sortData,
  paginateData,
  filterDataByDate,
  formatDateToDisplay,
} from "./utils";

describe("DataTable Utils", () => {
  const testData = [
    { id: 1, name: "Alice", date: "2023-01-15", amount: 100 },
    { id: 2, name: "Bob", date: "2023-02-10", amount: 200 },
    { id: 3, name: "Charlie", date: "2023-03-05", amount: 150 },
    { id: 4, name: "David", date: "2023-04-20", amount: 300 },
  ];

  describe("filterData", () => {
    test("returns all data when search is empty", () => {
      const result = filterData(testData, "");
      expect(result).toEqual(testData);
    });

    test("filters data by search term", () => {
      const result = filterData(testData, "Bob");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bob");
    });

    test("filters case-insensitively", () => {
      const result = filterData(testData, "alice");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Alice");
    });

    test("handles non-array input", () => {
      const result = filterData(null, "test");
      expect(result).toEqual([]);
    });
  });

  describe("sortData", () => {
    test("returns data unsorted when sortKey is empty", () => {
      const result = sortData(testData, "", "asc");
      expect(result).toEqual(testData);
    });

    test("sorts data ascending", () => {
      const result = sortData(testData, "name", "asc");
      expect(result.map((item) => item.name)).toEqual([
        "Alice",
        "Bob",
        "Charlie",
        "David",
      ]);
    });

    test("sorts data descending", () => {
      const result = sortData(testData, "name", "desc");
      expect(result.map((item) => item.name)).toEqual([
        "David",
        "Charlie",
        "Bob",
        "Alice",
      ]);
    });

    test("handles non-array input", () => {
      const result = sortData(null, "name", "asc");
      expect(result).toEqual([]);
    });
  });

  describe("paginateData", () => {
    test("returns correct page of data", () => {
      const result = paginateData(testData, 1, 2);
      expect(result).toHaveLength(2);
      expect(result.map((item) => item.id)).toEqual([1, 2]);
    });

    test("returns correct second page", () => {
      const result = paginateData(testData, 2, 2);
      expect(result).toHaveLength(2);
      expect(result.map((item) => item.id)).toEqual([3, 4]);
    });

    test("handles non-array input", () => {
      const result = paginateData(null, 1, 5);
      expect(result).toEqual([]);
    });
  });

  describe("filterDataByDate", () => {
    test("returns all data when no date filters applied", () => {
      const result = filterDataByDate(testData, "", "");
      expect(result).toEqual(testData);
    });

    test("filters by from date only", () => {
      const result = filterDataByDate(testData, "2023-02-01", "");
      expect(result).toHaveLength(3);
      expect(result.map((item) => item.name)).toEqual([
        "Bob",
        "Charlie",
        "David",
      ]);
    });

    test("filters by to date only", () => {
      const result = filterDataByDate(testData, "", "2023-02-28");
      expect(result).toHaveLength(2);
      expect(result.map((item) => item.name)).toEqual(["Alice", "Bob"]);
    });

    test("filters by date range", () => {
      const result = filterDataByDate(testData, "2023-02-01", "2023-03-31");
      expect(result).toHaveLength(2);
      expect(result.map((item) => item.name)).toEqual(["Bob", "Charlie"]);
    });

    test("handles items without date field", () => {
      const dataWithoutDates = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob", date: "2023-02-10" },
      ];
      const result = filterDataByDate(
        dataWithoutDates,
        "2023-01-01",
        "2023-12-31"
      );
      expect(result).toHaveLength(2); // Items without dates are included
    });

    test("handles invalid dates gracefully", () => {
      const dataWithInvalidDates = [
        { id: 1, name: "Alice", date: "invalid-date" },
        { id: 2, name: "Bob", date: "2023-02-10" },
      ];
      const result = filterDataByDate(
        dataWithInvalidDates,
        "2023-01-01",
        "2023-12-31"
      );
      expect(result).toHaveLength(2); // Invalid dates are included
    });

    test("uses custom date field", () => {
      const customData = [
        { id: 1, name: "Alice", createdAt: "2023-01-15" },
        { id: 2, name: "Bob", createdAt: "2023-02-10" },
      ];
      const result = filterDataByDate(
        customData,
        "2023-02-01",
        "",
        "createdAt"
      );
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bob");
    });

    test("handles non-array input", () => {
      const result = filterDataByDate(null, "2023-01-01", "2023-12-31");
      expect(result).toEqual([]);
    });
  });

  describe("formatDateToDisplay", () => {
    test("formats yyyy-mm-dd to dd-mm-yyyy", () => {
      const result = formatDateToDisplay("2023-01-15");
      expect(result).toBe("15-1-2023");
    });

    test("handles empty string", () => {
      const result = formatDateToDisplay("");
      expect(result).toBe("");
    });

    test("handles null/undefined", () => {
      expect(formatDateToDisplay(null)).toBe("");
      expect(formatDateToDisplay(undefined)).toBe("");
    });

    test("returns already formatted date as is", () => {
      const result = formatDateToDisplay("15-01-2023");
      expect(result).toBe("15-01-2023");
    });

    test("handles invalid date gracefully", () => {
      const result = formatDateToDisplay("invalid-date");
      expect(result).toBe("invalid-date");
    });
  });

  describe("sortData - enhanced", () => {
    test("sorts dates properly", () => {
      const dateData = [
        { id: 1, date: "15-1-2023" },
        { id: 2, date: "10-2-2023" },
        { id: 3, date: "5-3-2023" },
      ];
      const result = sortData(dateData, "date", "asc");
      expect(result.map((item) => item.id)).toEqual([1, 2, 3]);
    });

    test("sorts month-year format properly", () => {
      const monthYearData = [
        { id: 1, monthYear: "Mar 2023" },
        { id: 2, monthYear: "Jan 2023" },
        { id: 3, monthYear: "Feb 2023" },
      ];
      const result = sortData(monthYearData, "monthYear", "asc");
      expect(result.map((item) => item.id)).toEqual([2, 3, 1]);
    });

    test("sorts numeric values properly", () => {
      const numericData = [
        { id: 1, amount: 100 },
        { id: 2, amount: 50 },
        { id: 3, amount: 200 },
      ];
      const result = sortData(numericData, "amount", "asc");
      expect(result.map((item) => item.amount)).toEqual([50, 100, 200]);
    });
  });
});
