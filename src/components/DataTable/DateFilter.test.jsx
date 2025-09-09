import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DateFilter from "./DateFilter";

describe("DateFilter", () => {
  const mockProps = {
    fromDate: "2023-01-01",
    toDate: "2023-12-31",
    onFromDateChange: jest.fn(),
    onToDateChange: jest.fn(),
    onResetClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders date filter with labels and inputs", () => {
    render(<DateFilter {...mockProps} />);

    expect(screen.getByText("From:")).toBeInTheDocument();
    expect(screen.getByText("To:")).toBeInTheDocument();

    // Check that inputs have the provided values
    expect(screen.getByDisplayValue("2023-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2023-12-31")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  test("renders with provided date values", () => {
    const props = {
      ...mockProps,
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
    };

    render(<DateFilter {...props} />);

    expect(screen.getByDisplayValue("2023-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2023-12-31")).toBeInTheDocument();
  });

  test("calls onFromDateChange when from date changes", () => {
    render(<DateFilter {...mockProps} />);

    const fromDateInput = screen.getByLabelText("From:");
    fireEvent.change(fromDateInput, { target: { value: "2023-02-01" } });

    expect(mockProps.onFromDateChange).toHaveBeenCalledWith("2023-02-01");
  });

  test("calls onToDateChange when to date changes", () => {
    render(<DateFilter {...mockProps} />);

    const toDateInput = screen.getByLabelText("To:");
    fireEvent.change(toDateInput, { target: { value: "2023-11-30" } });

    expect(mockProps.onToDateChange).toHaveBeenCalledWith("2023-11-30");
  });

  test("calls onResetClick when reset button is clicked", () => {
    render(<DateFilter {...mockProps} />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    expect(mockProps.onResetClick).toHaveBeenCalledTimes(1);
  });

  test("has proper styling for minimum widths", () => {
    render(<DateFilter {...mockProps} />);

    const fromDateInput = screen.getByLabelText("From:");
    const toDateInput = screen.getByLabelText("To:");
    const resetButton = screen.getByRole("button", { name: /reset/i });

    expect(fromDateInput).toHaveStyle({ minWidth: "140px" });
    expect(toDateInput).toHaveStyle({ minWidth: "140px" });
    expect(resetButton).toHaveStyle({ minWidth: "80px" });
  });
});
