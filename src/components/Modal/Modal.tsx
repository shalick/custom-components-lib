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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        onClose();
      }
    };

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
    <div className={clsx(classes.backdropWrapper)}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Backdrop"
        className={clsx(classes.backdrop, backdropClassName)}
        /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
        onClick={() => closeOnBackdropClick && onClose()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && closeOnBackdropClick) {
            e.preventDefault();
            onClose();
          }
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(classes.modal, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
