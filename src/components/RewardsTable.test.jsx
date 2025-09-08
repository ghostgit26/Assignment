import React from "react";
import { render, screen } from "@testing-library/react";
import RewardsTable from "./RewardsTable";

// Mock the DataTable component since it's imported from a relative path
jest.mock("./DataTable/DataTable", () => {
  return function MockDataTable({ columns, data }) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} role="columnheader">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key] || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
});

// Mock the calculatePoints utility function
jest.mock("../utils/rewards", () => ({
  calculatePoints: (amount) => {
    // Mock implementation: 2x points over $100, 1x for $50-$100, 0 below $50
    if (amount > 100) {
      return (amount - 100) * 2 + 50;
    } else if (amount >= 50) {
      return amount - 50;
    }
    return 0;
  },
}));

const mockTransactions = [
  {
    customerId: 1,
    customerName: "Alice",
    date: "2025-08-01",
    amount: 120,
  },
  {
    customerId: 1,
    customerName: "Alice",
    date: "2025-08-15",
    amount: 80,
  },
  {
    customerId: 2,
    customerName: "Bob",
    date: "2025-08-10",
    amount: 200,
  },
];

describe("RewardsTable", () => {
  test("renders monthly rewards section", () => {
    render(<RewardsTable transactions={mockTransactions} />);

    // Check for heading
    expect(screen.getByText("User Monthly Rewards")).toBeInTheDocument();

    // Check for unique column headers that only appear in monthly table
    expect(
      screen.getByRole("columnheader", { name: "Month Year" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Reward Points" })
    ).toBeInTheDocument();

    // Check that there are multiple Customer ID headers (monthly + total tables)
    const customerIdHeaders = screen.getAllByRole("columnheader", {
      name: "Customer ID",
    });
    expect(customerIdHeaders.length).toBe(2);
  });

  test("renders total rewards section", () => {
    render(<RewardsTable transactions={mockTransactions} />);

    // Check for heading
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();

    // Check for total column headers
    const customerIdHeaders = screen.getAllByRole("columnheader", {
      name: "Customer ID",
    });
    const customerNameHeaders = screen.getAllByRole("columnheader", {
      name: "Customer Name",
    });

    // Should have 2 Customer ID headers (one for monthly, one for total)
    expect(customerIdHeaders.length).toBe(2);
    expect(customerNameHeaders.length).toBe(2);

    expect(
      screen.getByRole("columnheader", { name: "Total Reward Points" })
    ).toBeInTheDocument();
  });

  test("displays correct monthly data", () => {
    render(<RewardsTable transactions={mockTransactions} />);

    // Check that monthly data is displayed correctly - use getAllByText for elements that appear multiple times
    const aliceElements = screen.getAllByText("Alice");
    const bobElements = screen.getAllByText("Bob");

    expect(aliceElements.length).toBeGreaterThan(0);
    expect(bobElements.length).toBeGreaterThan(0);
    expect(screen.getAllByText("Aug 2025").length).toBeGreaterThan(0); // Month Year format appears multiple times
  });

  test("displays correct total data", () => {
    render(<RewardsTable transactions={mockTransactions} />);

    // Check that customer names appear in total section
    const aliceNames = screen.getAllByText("Alice");
    const bobNames = screen.getAllByText("Bob");

    // Should appear in both monthly and total sections
    expect(aliceNames.length).toBeGreaterThanOrEqual(2);
    expect(bobNames.length).toBeGreaterThanOrEqual(1);
  });

  test("handles empty transactions array", () => {
    render(<RewardsTable transactions={[]} />);

    // Should still render headings even with no data
    expect(screen.getByText("User Monthly Rewards")).toBeInTheDocument();
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();
  });
});
