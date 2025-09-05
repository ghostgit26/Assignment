import { fetchTransactions } from "./api";
import * as logger from "./logger";

/**
 * Unit tests for the API service functions.
 */

// Mock the logger module
jest.mock("./logger", () => ({
  logRequest: jest.fn(),
  logResponse: jest.fn(),
  logError: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTransactions", () => {
    test("successfully fetches transactions", async () => {
      const mockData = {
        transactions: [
          {
            transactionId: 1,
            customerId: 1,
            customerName: "Alice",
            date: "2025-08-01",
            product: "Book",
            amount: 120,
          },
          {
            transactionId: 2,
            customerId: 2,
            customerName: "Bob",
            date: "2025-08-10",
            product: "Pen",
            amount: 200,
          },
        ],
      };

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      };

      fetch.mockResolvedValue(mockResponse);

      const result = await fetchTransactions();

      expect(fetch).toHaveBeenCalledWith("/db.json");
      expect(logger.logRequest).toHaveBeenCalledWith("/db.json");
      expect(logger.logResponse).toHaveBeenCalledWith("/db.json", mockData);
      expect(result).toEqual(mockData.transactions);
    });

    test("handles fetch failure with network error", async () => {
      const mockError = new Error("Network error");
      fetch.mockRejectedValue(mockError);

      await expect(fetchTransactions()).rejects.toThrow("Network error");

      expect(fetch).toHaveBeenCalledWith("/db.json");
      expect(logger.logRequest).toHaveBeenCalledWith("/db.json");
      expect(logger.logError).toHaveBeenCalledWith("/db.json", mockError);
    });

    test("handles HTTP error response", async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: "Not Found",
      };

      fetch.mockResolvedValue(mockResponse);

      await expect(fetchTransactions()).rejects.toThrow(
        "Failed to fetch transactions"
      );

      expect(fetch).toHaveBeenCalledWith("/db.json");
      expect(logger.logRequest).toHaveBeenCalledWith("/db.json");
      expect(logger.logError).toHaveBeenCalledWith(
        "/db.json",
        expect.any(Error)
      );
    });

    test("handles JSON parsing error", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
      };

      fetch.mockResolvedValue(mockResponse);

      await expect(fetchTransactions()).rejects.toThrow("Invalid JSON");

      expect(fetch).toHaveBeenCalledWith("/db.json");
      expect(logger.logRequest).toHaveBeenCalledWith("/db.json");
      expect(logger.logError).toHaveBeenCalledWith(
        "/db.json",
        expect.any(Error)
      );
    });

    test("returns empty array when transactions property is missing", async () => {
      const mockData = {}; // No transactions property

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      };

      fetch.mockResolvedValue(mockResponse);

      const result = await fetchTransactions();

      expect(result).toBeUndefined(); // Since mockData.transactions is undefined
      expect(logger.logResponse).toHaveBeenCalledWith("/db.json", mockData);
    });
  });
});
