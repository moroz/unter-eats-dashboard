import clsx from "clsx";
import React from "react";

interface Props {
  children?: React.ReactNode;
  level: "success" | "info" | "warning" | "danger";
}

const Message: React.FC<Props> = ({ children, level }) => {
  return <div className={clsx("notification", `is-${level}`)}>{children}</div>;
};

export default Message;
