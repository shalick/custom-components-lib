import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox.tsx";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "I agree to terms",
    defaultChecked: false,
    helperText: "This is a checkbox",
  },
};

export const Error: Story = {
  args: {
    label: "I agree",
    error: true,
    helperText: "You must agree before continuing.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Can't interact",
    disabled: true,
    defaultChecked: true,
  },
};
