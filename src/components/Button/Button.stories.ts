import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button.tsx";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["contained", "outlined", "text"],
      defaultValue: "contained",
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "custom", "success", "error"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["small", "medium", "large"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Click me",
    variant: "contained",
    theme: "primary",
    size: "medium",
    disabled: false,
  },
};
