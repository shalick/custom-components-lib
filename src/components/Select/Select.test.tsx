import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "./Select.tsx";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

describe("Select Component", () => {
  it("renders with label and options", () => {
    render(<Select label="Fruits" options={options} />);
    expect(screen.getByText("Fruits")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens and closes dropdown on click", () => {
    render(<Select label="Fruits" options={options} />);
    const select = screen.getByRole("button");

    fireEvent.click(select);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(select);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("calls onChange and closes when an option is selected", () => {
    const handleChange = jest.fn();
    render(<Select label="Fruits" options={options} onChange={handleChange} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Banana"));

    expect(handleChange).toHaveBeenCalledWith("banana");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows selected option's label", () => {
    render(<Select label="Fruits" options={options} value="orange" />);

    expect(screen.getByText("Orange")).toBeInTheDocument();
  });

  it("handles keyboard interaction to open dropdown", () => {
    render(<Select label="Fruits" options={options} />);
    const select = screen.getByRole("button");

    fireEvent.keyDown(select, { key: "Enter" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("renders helper text and error styling", () => {
    render(
      <Select label="Fruits" options={options} helperText="Required" error />,
    );

    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("does not open dropdown if disabled", () => {
    render(<Select label="Fruits" options={options} disabled />);
    const select = screen.getByRole("button");

    fireEvent.click(select);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
