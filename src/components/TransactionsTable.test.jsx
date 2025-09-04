import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionsTable from "./TransactionsTable";
import * as rewardsUtils from "../utils/rewards"; // so we can spy on calculatePoints

const mockTransactions = [
  {
    transactionId: 101,
    customerName: "Alice",
    date: "2025-08-01",
    product: "Book",
    amount: 120,
  },
  {
    transactionId: 102,
    customerName: "Bob",
    date: "2025-08-10",
    product: "Pen",
    amount: 200,
  },
];

describe("TransactionsTable", () => {
  test("renders transactions table with all columns", () => {
    render(<TransactionsTable transactions={mockTransactions} />);
    expect(screen.getByText("Transaction ID")).toBeInTheDocument();
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Purchase Date")).toBeInTheDocument();
    expect(screen.getByText("Product Purchased")).toBeInTheDocument();
    expect(screen.getByText("Price ($)")).toBeInTheDocument();
    expect(screen.getByText("Reward Points")).toBeInTheDocument();
  });

  test("renders transaction rows with correct data", () => {
    render(<TransactionsTable transactions={mockTransactions} />);

    // Customers
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();

    // Products
    expect(screen.getByText("Book")).toBeInTheDocument();
    expect(screen.getByText("Pen")).toBeInTheDocument();

    // Prices
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();

    // Dates (formatted by toLocaleDateString, typically mm/dd/yyyy in US locale)
    const dateElements = screen.getAllByText(/2025/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  test("calls calculatePoints for each transaction", () => {
    const spy = jest.spyOn(rewardsUtils, "calculatePoints");
    render(<TransactionsTable transactions={mockTransactions} />);
    expect(spy).toHaveBeenCalledWith(120);
    expect(spy).toHaveBeenCalledWith(200);
    expect(spy).toHaveBeenCalledTimes(mockTransactions.length);
    spy.mockRestore();
  });
});
