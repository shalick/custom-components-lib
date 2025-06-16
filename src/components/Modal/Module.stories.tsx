import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal.tsx";
import classes from "./Modal.module.scss";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          type="button"
          className={classes.button}
          onClick={() => setOpen(true)}
        >
          OPEN MODAL
        </button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <h2>Text in a modal</h2>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Modal>
      </>
    );
  },
};
