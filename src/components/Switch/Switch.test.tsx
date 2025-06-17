import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./Switch.tsx";

describe("Switch", () => {
  const switchText = "Switch";
  it("renders with label", () => {
    render(<Switch label={switchText} />);
    expect(screen.getByText(switchText)).toBeInTheDocument();
  });

  it("toggles state in uncontrolled mode", () => {
    render(<Switch label={switchText} defaultChecked={false} />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;

    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });

  it("respects controlled checked prop", () => {
    const { rerender } = render(<Switch label={switchText} checked={false} />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;

    expect(input.checked).toBe(false);

    rerender(<Switch label={switchText} checked />);
    expect(input.checked).toBe(true);
  });

  it("calls onChange when toggled", () => {
    const handleChange = jest.fn();
    render(<Switch label={switchText} onChange={handleChange} />);
    const input = screen.getByRole("checkbox");

    fireEvent.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", () => {
    const handleChange = jest.fn();
    render(<Switch label={switchText} disabled onChange={handleChange} />);
    const input = screen.getByRole("checkbox");

    fireEvent.click(input);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("is disabled when `disabled` prop is true", () => {
    render(<Switch label={switchText} disabled />);
    const input = screen.getByRole("checkbox");

    expect(input).toBeDisabled();
  });
});
