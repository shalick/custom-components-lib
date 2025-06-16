import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select.tsx";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["outlined", "filled", "standard"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

export const Default: Story = {
  args: {
    label: "Fruit",
    options,
  },
};

export const Error: Story = {
  args: {
    label: "Fruit",
    error: true,
    helperText: "Please select a fruit",
    options,
  },
};

export const Filled: Story = {
  args: {
    label: "Fruit",
    variant: "filled",
    options,
  },
};

export const Standard: Story = {
  args: {
    label: "Fruit",
    variant: "standard",
    options,
  },
};

export const Disabled: Story = {
  args: {
    label: "Fruit",
    disabled: true,
    options,
  },
};
