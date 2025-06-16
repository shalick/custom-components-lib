import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button.tsx";

describe("Button component", () => {
  it("renders with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("applies correct class names based on props", () => {
    render(
      <Button variant="outlined" theme="success" size="large">
        Styled
      </Button>,
    );
    const button = screen.getByRole("button", { name: /styled/i });
    expect(button.className).toMatch(/button--outlined/);
    expect(button.className).toMatch(/button--success/);
    expect(button.className).toMatch(/button--large/);
  });
});
