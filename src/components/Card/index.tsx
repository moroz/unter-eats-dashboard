import clsx from "clsx";
import React from "react";
import styles from "./Card.module.sass";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
  return <div className={clsx(styles.root, className)}>{children}</div>;
};

export default Card;
