import { useId, useState, InputHTMLAttributes } from "react";
import clsx from "clsx";
import classes from "./Switch.module.scss";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  className,
  ...rest
}: SwitchProps) {
  const id = useId();
  const isControlled = controlledChecked !== undefined;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  return (
    <label
      htmlFor={id}
      className={clsx(classes.root, disabled && classes.disabled, className)}
    >
      <input
        id={id}
        type="checkbox"
        className={classes.input}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <span className={classes.slider} />
      {label && <span className={classes.label}>{label}</span>}
    </label>
  );
}
