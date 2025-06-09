import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button.tsx";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};

export const Contained: Story = {
  args: {
    children: "Click me",
    variant: "contained",
  },
};

export const Outlined: Story = {
  args: {
    children: "Click me",
    variant: "outlined",
  },
};

export const Text: Story = {
  args: {
    children: "Click me",
    variant: "text",
  },
};

export const Primary: Story = {
  args: {
    children: "Click me",
    theme: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Click me",
    theme: "secondary",
  },
};

export const Custom: Story = {
  args: {
    children: "Click me",
    theme: "custom",
  },
};

export const Success: Story = {
  args: {
    children: "Click me",
    theme: "success",
  },
};

export const Error: Story = {
  args: {
    children: "Click me",
    theme: "error",
  },
};

export const Small: Story = {
  args: {
    children: "Click me",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Click me",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Click me",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    children: "Click me",
    disabled: true,
  },
};

export const onClick: Story = {
  args: {
    children: "Click me",
    onClick: () => console.log("Button"),
  },
};
