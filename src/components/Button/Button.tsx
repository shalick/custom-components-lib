import { ComponentProps, FC } from "react";
import classes from "./Button.module.scss";

type ButtonProps = ComponentProps<"button">;

export const Button: FC<ButtonProps> = (props) => {
  return <button type="button" className={classes.button} {...props} />;
};
