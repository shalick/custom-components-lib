import { LabelHTMLAttributes, useId, useState } from "react";
import clsx from "clsx";
import classes from "./Checkbox.module.scss";

export interface CheckboxProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({
  label,
  defaultChecked = false,
  disabled = false,
  error = false,
  helperText,
  onChange,
  className,
  ...rest
}: CheckboxProps) {
  const id = useId();
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label
      htmlFor={id}
      className={clsx(
        classes.root,
        disabled && classes.disabled,
        error && classes.error,
        className,
      )}
      {...rest}
    >
      <div className={classes.container}>
        <input
          id={id}
          type="checkbox"
          className={classes.input}
          checked={checked}
          disabled={disabled}
          onChange={handleToggle}
        />
        <span className={classes.box} />
        {label && <span className={classes.labelText}>{label}</span>}
      </div>

      {helperText && (
        <p
          className={clsx(classes.helperText, error && classes.helperTextError)}
        >
          {helperText}
        </p>
      )}
    </label>
  );
}
