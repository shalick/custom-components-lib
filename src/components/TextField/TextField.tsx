import React, { useId, useState, forwardRef } from "react";
import clsx from "clsx";
import classes from "./TextField.module.scss";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "outlined" | "filled" | "standard";
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = "outlined",
      label,
      error = false,
      helperText,
      disabled = false,
      id,
      onFocus,
      onBlur,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    const hasValue = value != null && String(value).length > 0;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!value) setFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div
        className={clsx(
          classes.root,
          classes[variant],
          error && classes.error,
          disabled && classes.disabled,
          focused && classes.focused,
        )}
      >
        <div className={classes.inputWrapper}>
          <input
            id={inputId}
            className={clsx(
              classes.input,
              (focused || hasValue) && classes.notEmpty,
            )}
            disabled={disabled}
            aria-invalid={error}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...rest}
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
