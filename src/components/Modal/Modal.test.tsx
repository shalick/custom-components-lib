import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal.tsx";

describe("Modal", () => {
  const onClose = jest.fn();
  const modalText = "Modal Content";

  beforeEach(() => {
    onClose.mockClear();
  });

  it("does not render when open is false", () => {
    render(
      <Modal open={false} onClose={onClose}>
        <div>{modalText}</div>
      </Modal>,
    );
    expect(screen.queryByText(modalText)).not.toBeInTheDocument();
  });

  it("renders when open is true", () => {
    render(
      <Modal open onClose={onClose}>
        <div>{modalText}</div>
      </Modal>,
    );
    expect(screen.getByText(modalText)).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls onClose when Escape key is pressed", () => {
    render(
      <Modal open onClose={onClose}>
        <div>{modalText}</div>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnEsc is false", () => {
    render(
      <Modal open onClose={onClose} closeOnEsc={false}>
        <div>{modalText}</div>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(
      <Modal open onClose={onClose}>
        <div>{modalText}</div>
      </Modal>,
    );

    const backdrop = screen.getByRole("button", { name: "Backdrop" });
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when backdrop clicked but closeOnBackdropClick is false", () => {
    render(
      <Modal open onClose={onClose} closeOnBackdropClick={false}>
        <div>{modalText}</div>
      </Modal>,
    );

    const backdrop = screen.getByRole("button", { name: "Backdrop" });
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when modal content is clicked", () => {
    render(
      <Modal open onClose={onClose}>
        <div>{modalText}</div>
      </Modal>,
    );

    const modalContent = screen.getByRole("dialog");
    fireEvent.click(modalContent);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Enter key is pressed on backdrop", () => {
    render(
      <Modal open onClose={onClose}>
        <div>{modalText}</div>
      </Modal>,
    );

    const backdrop = screen.getByRole("button", { name: "Backdrop" });
    fireEvent.keyDown(backdrop, { key: "Enter" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Space key is pressed on backdrop", () => {
    render(
      <Modal open onClose={onClose}>
        <div>{modalText}</div>
      </Modal>,
    );

    const backdrop = screen.getByRole("button", { name: "Backdrop" });
    fireEvent.keyDown(backdrop, { key: " " });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
