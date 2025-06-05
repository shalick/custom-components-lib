import { useState } from "react";
import classes from "./App.module.scss";

console.log(classes);

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={increment}>
        Click
      </button>
    </>
  );
};
