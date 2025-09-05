/**
 * Unit tests for the logger utility functions.
 */
import { logRequest, logResponse, logError } from "./logger";

// Mock console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe("Logger Service", () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  describe("logRequest", () => {
    test("logs request with URL only", () => {
      const url = "/api/test";

      logRequest(url);

      expect(console.log).toHaveBeenCalledWith(
        "%cAPI Request:",
        "color: blue; font-weight: bold;",
        url,
        {}
      );
    });

    test("logs request with URL and options", () => {
      const url = "/api/test";
      const options = { method: "POST", body: JSON.stringify({ test: true }) };

      logRequest(url, options);

      expect(console.log).toHaveBeenCalledWith(
        "%cAPI Request:",
        "color: blue; font-weight: bold;",
        url,
        options
      );
    });

    test("handles undefined options", () => {
      const url = "/api/test";

      logRequest(url, undefined);

      expect(console.log).toHaveBeenCalledWith(
        "%cAPI Request:",
        "color: blue; font-weight: bold;",
        url,
        {} // undefined gets converted to {} due to default parameter
      );
    });
  });

  describe("logResponse", () => {
    test("logs successful response", () => {
      const url = "/api/test";
      const response = { success: true, data: [1, 2, 3] };

      logResponse(url, response);

      expect(console.log).toHaveBeenCalledWith(
        "%cAPI Response:",
        "color: green; font-weight: bold;",
        url,
        response
      );
    });

    test("logs response with null data", () => {
      const url = "/api/test";
      const response = null;

      logResponse(url, response);

      expect(console.log).toHaveBeenCalledWith(
        "%cAPI Response:",
        "color: green; font-weight: bold;",
        url,
        response
      );
    });

    test("logs response with complex data structure", () => {
      const url = "/api/transactions";
      const response = {
        transactions: [
          { id: 1, amount: 100 },
          { id: 2, amount: 200 },
        ],
        meta: { total: 2, page: 1 },
      };

      logResponse(url, response);

      expect(console.log).toHaveBeenCalledWith(
        "%cAPI Response:",
        "color: green; font-weight: bold;",
        url,
        response
      );
    });
  });

  describe("logError", () => {
    test("logs error with Error object", () => {
      const url = "/api/test";
      const error = new Error("Network error");

      logError(url, error);

      expect(console.error).toHaveBeenCalledWith(
        "%cAPI Error:",
        "color: red; font-weight: bold;",
        url,
        error
      );
    });

    test("logs error with string message", () => {
      const url = "/api/test";
      const error = "Something went wrong";

      logError(url, error);

      expect(console.error).toHaveBeenCalledWith(
        "%cAPI Error:",
        "color: red; font-weight: bold;",
        url,
        error
      );
    });

    test("logs error with HTTP status", () => {
      const url = "/api/test";
      const error = {
        status: 404,
        message: "Not Found",
        details: "The requested resource was not found",
      };

      logError(url, error);

      expect(console.error).toHaveBeenCalledWith(
        "%cAPI Error:",
        "color: red; font-weight: bold;",
        url,
        error
      );
    });

    test("logs error with null value", () => {
      const url = "/api/test";
      const error = null;

      logError(url, error);

      expect(console.error).toHaveBeenCalledWith(
        "%cAPI Error:",
        "color: red; font-weight: bold;",
        url,
        error
      );
    });
  });

  describe("styled console output", () => {
    test("logRequest uses correct styling", () => {
      logRequest("/test");

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("API Request:"),
        "color: blue; font-weight: bold;",
        expect.any(String),
        expect.any(Object)
      );
    });

    test("logResponse uses correct styling", () => {
      logResponse("/test", {});

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("API Response:"),
        "color: green; font-weight: bold;",
        expect.any(String),
        expect.any(Object)
      );
    });

    test("logError uses correct styling", () => {
      logError("/test", new Error());

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("API Error:"),
        "color: red; font-weight: bold;",
        expect.any(String),
        expect.any(Error)
      );
    });
  });
});
