import React from "react";
import styles from "./StoreOpenSection.module.sass";

interface Props {}

const StoreOpenSection: React.FC<Props> = () => {
  return (
    <section className={styles.section}>
      The restaurant is currently open.
    </section>
  );
};

export default StoreOpenSection;
