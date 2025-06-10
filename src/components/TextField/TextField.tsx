import React, { useId, useState, forwardRef } from "react";
import clsx from "clsx";
import classes from "./TextField.module.scss";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "outlined" | "filled" | "standard";
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = "outlined",
      label,
      placeholder,
      error = false,
      helperText,
      disabled = false,
      id,
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    const hasValue = value != null && String(value).length > 0;

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = () => {
      if (!value) setFocused(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <div
        className={clsx(
          classes.root,
          classes[variant],
          error && classes.error,
          disabled && classes.disabled,
        )}
      >
        <div className={classes.inputWrapper}>
          <input
            id={inputId}
            className={clsx(
              classes.input,
              (focused || hasValue) && classes.notEmpty,
            )}
            placeholder={focused ? placeholder : ""}
            disabled={disabled}
            aria-invalid={error}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            ref={ref}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={clsx(
                classes.label,
                (focused || hasValue) && classes.labelFloat,
                error && classes.labelError,
              )}
            >
              {label}
            </label>
          )}
        </div>
        {helperText && <p className={classes.helperText}>{helperText}</p>}
      </div>
    );
  },
);

TextField.displayName = "TextField";
