import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationControls from "./PaginationControls";

describe("PaginationControls", () => {
  test("renders previous and next buttons", () => {
    render(<PaginationControls page={1} totalPages={3} onChange={() => {}} />);
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  test("calls onChange when next is clicked", () => {
    const onChange = jest.fn();
    render(<PaginationControls page={1} totalPages={3} onChange={onChange} />);
    fireEvent.click(screen.getByText(/next/i));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  test("calls onChange when previous is clicked", () => {
    const onChange = jest.fn();
    render(<PaginationControls page={2} totalPages={3} onChange={onChange} />);
    fireEvent.click(screen.getByText(/previous/i));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test("disables previous button on first page", () => {
    render(<PaginationControls page={1} totalPages={3} onChange={() => {}} />);
    expect(screen.getByText(/previous/i)).toBeDisabled();
  });

  test("disables next button on last page", () => {
    render(<PaginationControls page={3} totalPages={3} onChange={() => {}} />);
    expect(screen.getByText(/next/i)).toBeDisabled();
  });
});
