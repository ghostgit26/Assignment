import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RowsPerPageSelector from "./RowsPerPageSelector";

describe("RowsPerPageSelector", () => {
  test("renders selector with options", () => {
    render(<RowsPerPageSelector value={5} onChange={() => {}} />);

    // getByRole works since it's a <select>
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    // check options exist
    expect(screen.getByText("5 rows")).toBeInTheDocument();
    expect(screen.getByText("10 rows")).toBeInTheDocument();
    expect(screen.getByText("25 rows")).toBeInTheDocument();
    expect(screen.getByText("50 rows")).toBeInTheDocument();
    expect(screen.getByText("100 rows")).toBeInTheDocument();
  });

  test("calls onChange when option is selected", () => {
    const onChange = jest.fn();
    render(<RowsPerPageSelector value={5} onChange={onChange} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "10" } });

    expect(onChange).toHaveBeenCalledWith(10);
  });
});
