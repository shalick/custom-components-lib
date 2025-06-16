import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox.tsx";

describe("Checkbox", () => {
  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox label="Accept" />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  it("respects defaultChecked", () => {
    render(<Checkbox label="Accept" defaultChecked />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("calls onChange with correct value", () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Subscribe" onChange={handleChange} />);
    const input = screen.getByRole("checkbox");

    fireEvent.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", () => {
    const handleChange = jest.fn();
    render(
      <Checkbox label="Disabled checkbox" disabled onChange={handleChange} />,
    );
    const input = screen.getByRole("checkbox");

    fireEvent.click(input);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("displays helper text", () => {
    render(<Checkbox label="Accept" helperText="Some help" />);
    expect(screen.getByText("Some help")).toBeInTheDocument();
  });

  it("applies error styling", () => {
    render(<Checkbox label="Invalid" error helperText="Error text" />);
    const label = screen.getByText("Invalid").closest("label");
    expect(label?.className).toMatch(/error/);
    const helper = screen.getByText("Error text");
    expect(helper.className).toMatch(/error/i);
  });
});
