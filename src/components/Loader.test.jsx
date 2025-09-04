import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  test("renders spinner", () => {
    render(<Loader />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  test("shows loading text for accessibility", () => {
    render(<Loader />);
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass("visually-hidden");
  });
});
