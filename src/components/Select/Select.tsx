import React, { useState, useRef, useEffect, useId } from "react";
import clsx from "clsx";
import classes from "./Select.module.scss";

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  value?: string;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  fullWidth?: boolean;
  options: Option[];
  onChange?: (value: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Select({
  label,
  value,
  error = false,
  disabled = false,
  helperText,
  variant = "outlined",
  size = "medium",
  fullWidth = false,
  options,
  onChange,
  onOpen,
  onClose,
  ...rest
}: SelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  const hasValue = selected !== "";

  const toggleDropdown = () => {
    if (disabled) return;
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        onOpen?.();
      } else {
        onClose?.();
      }
      return next;
    });
  };

  const handleSelect = (val: string) => {
    setSelected(val);
    onChange?.(val);
    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        classes.root,
        classes[variant],
        size && classes[size],
        fullWidth && classes.fullWidth,
        error && classes.error,
        disabled && classes.disabled,
        open && classes.open,
      )}
      ref={containerRef}
      {...rest}
    >
      <div className={classes.selectWrapper}>
        <div
          id={id}
          className={clsx(classes.select, (open || hasValue) && classes.filled)}
          role="button"
          tabIndex={0}
          onClick={toggleDropdown}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleDropdown();
            }
          }}
        >
          <span className={classes.selectedValue}>
            {options.find((opt) => opt.value === selected)?.label || ""}
          </span>
          <span className={classes.arrow}>{open ? "▲" : "▼"}</span>
        </div>

        {label && (
          <label
            htmlFor={id}
            className={clsx(
              classes.label,
              (open || hasValue) && classes.labelFloat,
              error && classes.labelError,
            )}
          >
            {label}
          </label>
        )}
      </div>

      {open && (
        <ul className={classes.menu} role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={clsx(
                classes.option,
                selected === opt.value && classes.selected,
              )}
              role="option"
              aria-selected={selected === opt.value}
              onClick={() => handleSelect(opt.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(opt.value);
                }
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {helperText && (
        <p
          className={clsx(classes.helperText, error && classes.helperTextError)}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
