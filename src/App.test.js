import { render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import TransactionsTable from "./components/TransactionsTable";
import RewardsTable from "./components/RewardsTable";

const mockTransactions = [
  {
    id: 1,
    customerId: "C001",
    customerName: "Peter Parker",
    amount: 120,
    date: "2023-01-15",
  },
  {
    id: 2,
    customerId: "C001",
    customerName: "Peter Parker",
    amount: 75,
    date: "2023-02-10",
  },
  {
    id: 3,
    customerId: "C002",
    customerName: "Stephen Strange",
    amount: 200,
    date: "2023-02-20",
  },
  {
    id: 4,
    customerId: "C002",
    customerName: "Stephen Strange",
    amount: 50,
    date: "2023-03-05",
  },
  {
    id: 5,
    customerId: "C003",
    customerName: "Tony Stark",
    amount: 130,
    date: "2023-03-25",
  },
];

describe("App Component", () => {
  test("renders without crashing and shows main header", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /transactions/i })
      ).toBeInTheDocument();
    });
  });
});

describe("TransactionsTable Component", () => {
  test("renders a table with correct number of rows", () => {
    render(<TransactionsTable transactions={mockTransactions} />);
    const rows = screen.getAllByRole("row");
    // +1 because header row also counts
    expect(rows.length).toBe(mockTransactions.length + 1);
  });

  test("renders table headers", () => {
    render(<TransactionsTable transactions={mockTransactions} />);
    expect(
      screen.getByRole("columnheader", { name: /customer/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /amount/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /date/i })
    ).toBeInTheDocument();
  });
});

describe("RewardsTable Component", () => {
  test("renders a table with one row per unique customer", () => {
    render(<RewardsTable transactions={mockTransactions} />);
    const rows = screen.getAllByRole("row");
    // header row + 3 customers
    expect(rows.length).toBe(4);
  });

  test("displays total rewards as a number for each customer", () => {
    render(<RewardsTable transactions={mockTransactions} />);
    const customerRows = screen.getAllByRole("row").slice(1); // skip header row
    customerRows.forEach((row) => {
      const cells = within(row).getAllByRole("cell");
      const rewardCell = cells[cells.length - 1]; // last column = total rewards
      expect(Number.isNaN(Number(rewardCell.textContent))).toBe(false);
    });
  });
});
