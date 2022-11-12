import clsx from "clsx";
import React from "react";
import styles from "./AttributesList.module.sass";

interface Props {
  children: RowConfig[];
}

export interface RowConfig {
  label: string | null;
  value: React.ReactNode;
  monospace?: boolean;
}

const AttributesList: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.list}>
      {children.map((row, i) => {
        const isEmpty =
          row.value === null || row.value === undefined || row.value === "";
        return (
          <p key={i}>
            <strong>{row.label}</strong>
            <span className={clsx(isEmpty && styles.empty)}>
              {isEmpty ? "(not set)" : row.value}
            </span>
          </p>
        );
      })}
    </div>
  );
};

export default AttributesList;
