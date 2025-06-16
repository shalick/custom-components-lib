import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./Switch.tsx";

describe("Switch", () => {
  it("renders with label", () => {
    render(<Switch label="Dark Mode" />);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  it("toggles state in uncontrolled mode", () => {
    render(<Switch label="Notifications" defaultChecked={false} />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;

    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });

  it("respects controlled checked prop", () => {
    const { rerender } = render(<Switch label="Wifi" checked={false} />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;

    expect(input.checked).toBe(false);

    rerender(<Switch label="Wifi" checked />);
    expect(input.checked).toBe(true);
  });

  it("calls onChange when toggled", () => {
    const handleChange = jest.fn();
    render(<Switch label="Bluetooth" onChange={handleChange} />);
    const input = screen.getByRole("checkbox");

    fireEvent.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", () => {
    const handleChange = jest.fn();
    render(<Switch label="Airplane Mode" disabled onChange={handleChange} />);
    const input = screen.getByRole("checkbox");

    fireEvent.click(input);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("is disabled when `disabled` prop is true", () => {
    render(<Switch label="Silent Mode" disabled />);
    const input = screen.getByRole("checkbox");

    expect(input).toBeDisabled();
  });
});
