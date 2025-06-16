import clsx from "clsx";
import classes from "./Button.module.scss";

type Variant = "contained" | "outlined" | "text";
type Theme = "primary" | "secondary" | "custom" | "success" | "error";
type Size = "small" | "medium" | "large";

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  theme?: Theme;
  size?: Size;
}

export function Button({
  children,
  onClick = () => {},
  disabled = false,
  variant = "contained",
  theme = "primary",
  size = "medium",
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        classes.button,
        classes[`button--${variant}`],
        classes[`button--${theme}`],
        classes[`button--${size}`],
      )}
    >
      {children}
    </button>
  );
}
