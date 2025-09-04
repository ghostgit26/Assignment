import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import * as api from "./services/api";

// Mock components
jest.mock("./components/TransactionsTable", () => ({ transactions }) => (
  <div data-testid="transactions-table">{transactions.length} transactions</div>
));
jest.mock("./components/RewardsTable", () => ({ transactions }) => (
  <div data-testid="rewards-table">
    Rewards for {transactions.length} transactions
  </div>
));
jest.mock("./components/Loader", () => () => (
  <div data-testid="loader">Loading...</div>
));
jest.mock("./components/ErrorBoundary", () => ({ children }) => (
  <>{children}</>
));

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows loader while fetching transactions", async () => {
    jest.spyOn(api, "fetchTransactions").mockImplementation(
      () => new Promise(() => {}) // never resolves
    );
    render(<App />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders transactions and rewards tables after data loads", async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    jest.spyOn(api, "fetchTransactions").mockResolvedValue(mockData);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("transactions-table")).toHaveTextContent(
        "2 transactions"
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId("rewards-table")).toHaveTextContent(
        "Rewards for 2 transactions"
      );
    });
  });

  test("shows error message if fetch fails", async () => {
    jest
      .spyOn(api, "fetchTransactions")
      .mockRejectedValue(new Error("Network error"));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });

  test("renders with empty transactions", async () => {
    jest.spyOn(api, "fetchTransactions").mockResolvedValue([]);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("transactions-table")).toHaveTextContent(
        "0 transactions"
      );
    });
    await waitFor(() => {
      expect(screen.getByTestId("rewards-table")).toHaveTextContent(
        "Rewards for 0 transactions"
      );
    });
  });
});
