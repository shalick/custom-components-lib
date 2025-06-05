import { ComponentProps } from "react";
import classes from "./Button.module.scss";

type ButtonProps = ComponentProps<"button">;

export function Button({ ...props }: ButtonProps) {
  return <button type="button" className={classes.button} {...props} />;
}
