import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal.tsx";

describe("Modal", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("does not render when open is false", () => {
    render(
      <Modal open={false} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("renders when open is true", () => {
    render(
      <Modal open onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls onClose when Escape key is pressed", () => {
    render(
      <Modal open onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnEsc is false", () => {
    render(
      <Modal open onClose={onClose} closeOnEsc={false}>
        <div>Modal Content</div>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(
      <Modal open onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const backdrop = screen.getAllByRole("button")[0]; // outer backdrop
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when backdrop clicked but closeOnBackdropClick is false", () => {
    render(
      <Modal open onClose={onClose} closeOnBackdropClick={false}>
        <div>Modal Content</div>
      </Modal>,
    );

    const backdrop = screen.getAllByRole("button")[0];
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when modal content is clicked", () => {
    render(
      <Modal open onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const modal = screen.getAllByRole("button")[1]; // inner modal
    fireEvent.click(modal);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Enter key is pressed on backdrop", () => {
    render(
      <Modal open onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const backdrop = screen.getAllByRole("button")[0];
    fireEvent.keyDown(backdrop, { key: "Enter" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Space key is pressed on backdrop", () => {
    render(
      <Modal open onClose={onClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const backdrop = screen.getAllByRole("button")[0];
    fireEvent.keyDown(backdrop, { key: " " });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
