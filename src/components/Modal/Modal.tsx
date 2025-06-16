import { useEffect, ReactNode } from "react";
import clsx from "clsx";
import classes from "./Modal.module.scss";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  backdropClassName?: string;
  closeOnEsc?: boolean;
  closeOnBackdropClick?: boolean;
}

export function Modal({
  open,
  onClose,
  children,
  className,
  backdropClassName,
  closeOnEsc = true,
  closeOnBackdropClick = true,
}: ModalProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && closeOnEsc) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return (
    <button
      type="button"
      className={clsx(classes.backdrop, backdropClassName)}
      onClick={() => closeOnBackdropClick && onClose()}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && closeOnBackdropClick) {
          e.preventDefault();
          onClose();
        }
      }}
      tabIndex={-1}
    >
      <button
        type="button"
        className={clsx(classes.modal, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </button>
    </button>
  );
}
