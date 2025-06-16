import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch.tsx";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  args: {
    label: "Controlled",
    checked: true,
  },
};
