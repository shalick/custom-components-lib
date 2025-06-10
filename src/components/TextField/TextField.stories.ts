import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField.tsx";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["outlined", "filled", "standard"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    error: true,
    helperText: "Invalid email address",
    placeholder: "email@example.com",
  },
};

export const Filled: Story = {
  args: {
    label: "Filled input",
    variant: "filled",
    placeholder: "Filled style",
  },
};

export const Standard: Story = {
  args: {
    label: "Standard input",
    variant: "standard",
    placeholder: "Standard style",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled input",
    disabled: true,
    placeholder: "Can't type here",
  },
};
