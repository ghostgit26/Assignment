import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortDropdown from "./SortDropdown";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
];

describe("SortDropdown", () => {
  test("renders sort options", () => {
    render(
      <SortDropdown
        columns={columns}
        value={{ key: "id", order: "asc" }}
        onChange={() => {}}
      />
    );

    // "Sort by..." placeholder
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();

    // Asc/Desc options for each column
    expect(screen.getByText("ID (Asc)")).toBeInTheDocument();
    expect(screen.getByText("ID (Desc)")).toBeInTheDocument();
    expect(screen.getByText("Name (Asc)")).toBeInTheDocument();
    expect(screen.getByText("Name (Desc)")).toBeInTheDocument();
  });

  test("calls onChange with correct value when option is selected", () => {
    const handleChange = jest.fn();
    render(
      <SortDropdown
        columns={columns}
        value={{ key: "id", order: "asc" }}
        onChange={handleChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "name:desc" } });

    expect(handleChange).toHaveBeenCalledWith({ key: "name", order: "desc" });
  });

  test("renders with empty value when no sort selected", () => {
    render(
      <SortDropdown
        columns={columns}
        value={{ key: "", order: "" }}
        onChange={() => {}}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select.value).toBe(""); // "Sort by..."
  });
});
