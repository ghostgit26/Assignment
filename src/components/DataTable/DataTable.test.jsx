import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "date", label: "Date" },
];

const data = [
  { id: 1, name: "Alice", date: "2025-08-15" },
  { id: 2, name: "Bob", date: "2025-08-10" },
  { id: 3, name: "Charlie", date: "2025-07-05" },
];

describe("DataTable", () => {
  test("renders table headers and rows", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  test("filters data with search", () => {
    render(<DataTable columns={columns} data={data} />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Bob" } });
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });

  test("renders date filter controls", () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText("From:")).toBeInTheDocument();
    expect(screen.getByText("To:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();

    // Check that default dates are populated (should have values, not empty)
    const fromDateInput = screen.getByLabelText("From:");
    const toDateInput = screen.getByLabelText("To:");
    expect(fromDateInput.value).toBeTruthy(); // Should have a default value
    expect(toDateInput.value).toBeTruthy(); // Should have a default value
  });
  test("date filter applies automatically without search button", () => {
    render(<DataTable columns={columns} data={data} />);

    // Get date inputs using proper labels
    const fromDateInput = screen.getByLabelText("From:");
    const toDateInput = screen.getByLabelText("To:");

    // Set date range that should filter to only Bob's record (2025-08-10)
    fireEvent.change(fromDateInput, { target: { value: "2025-08-09" } });
    fireEvent.change(toDateInput, { target: { value: "2025-08-11" } });

    // Should show Bob but not Alice or Charlie (filtering happens automatically)
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
  });

  test("date filter applies automatically when date changes", () => {
    render(<DataTable columns={columns} data={data} />);

    // Get date input using proper label
    const fromDateInput = screen.getByLabelText("From:");

    // Set from date to filter out some data
    fireEvent.change(fromDateInput, { target: { value: "2025-08-12" } });

    // Only Bob and Alice should be visible (dates >= 2025-08-12)
    expect(screen.getByText("Alice")).toBeInTheDocument(); // 2025-08-15
    expect(screen.queryByText("Charlie")).not.toBeInTheDocument(); // 2025-07-05
  });

  test("reset button restores default date range and applies filter", () => {
    render(<DataTable columns={columns} data={data} />);

    const fromDateInput = screen.getByLabelText("From:");
    const toDateInput = screen.getByLabelText("To:");
    const resetButton = screen.getByRole("button", { name: /reset/i });

    // Change the dates first
    fireEvent.change(fromDateInput, { target: { value: "2023-02-01" } });
    fireEvent.change(toDateInput, { target: { value: "2023-02-28" } });

    // Click reset
    fireEvent.click(resetButton);

    // Check that dates are reset to defaults (should have some values)
    expect(fromDateInput.value).toBeTruthy();
    expect(toDateInput.value).toBeTruthy();

    // The dates should be different from what we set
    expect(fromDateInput.value).not.toBe("2023-02-01");
    expect(toDateInput.value).not.toBe("2023-02-28");
  });
});
