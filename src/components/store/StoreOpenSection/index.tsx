import { useIsStoreOpenQuery } from "@api/queries";
import { SidebarButton } from "@components/buttons";
import React from "react";
import styles from "./StoreOpenSection.module.sass";

interface Props {}

const StoreOpenSection: React.FC<Props> = () => {
  const { data, loading } = useIsStoreOpenQuery();

  if (loading) return null;
  const open = data?.isStoreOpen;

  return (
    <section className={styles.section}>
      {open ? (
        <>
          <span className={styles.label}>
            The restaurant is currently open.
          </span>
          <SidebarButton className={styles.closeStoreButton}>
            Close restaurant
          </SidebarButton>
        </>
      ) : (
        <>
          <span className={styles.label}>The restaurant is closed.</span>
          <SidebarButton className={styles.openStoreButton}>
            Open restaurant
          </SidebarButton>
        </>
      )}
    </section>
  );
};

export default StoreOpenSection;
