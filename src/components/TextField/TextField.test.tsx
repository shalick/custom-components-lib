import { render, screen, fireEvent } from "@testing-library/react";
import { TextField } from "./TextField.tsx";

describe("TextField", () => {
  it("renders with label", () => {
    render(<TextField label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("renders with default value and floating label", () => {
    render(<TextField label="Email" defaultValue="test@example.com" />);
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input.value).toBe("test@example.com");
  });

  it("handles user typing", () => {
    render(<TextField label="Name" />);
    const input = screen.getByLabelText("Name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "John" } });
    expect(input.value).toBe("John");
  });

  it("calls onFocus and onBlur", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(<TextField label="Name" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByLabelText("Name");

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it("applies error styles and renders helper text", () => {
    render(
      <TextField label="Password" error helperText="Password is required" />,
    );

    const input = screen.getByLabelText("Password");
    const helperText = screen.getByText("Password is required");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(helperText).toBeInTheDocument();
  });

  it("is disabled when prop is passed", () => {
    render(<TextField label="Disabled" disabled />);
    const input = screen.getByLabelText("Disabled");
    expect(input).toBeDisabled();
  });

  it("uses the provided id", () => {
    render(<TextField label="Custom ID" id="custom-input" />);
    expect(screen.getByLabelText("Custom ID")).toHaveAttribute(
      "id",
      "custom-input",
    );
  });
});
