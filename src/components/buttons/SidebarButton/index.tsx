import clsx from "clsx";
import React, { HTMLProps } from "react";
import styles from "./SidebarButton.module.sass";

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: "button";
}

const SidebarButton: React.FC<Props> = ({
  className,
  type = "button",
  ...rest
}) => {
  return (
    <button className={clsx(styles.button, className)} type={type} {...rest} />
  );
};

export default SidebarButton;
