import { useCloseStoreMutation, useOpenStoreMutation } from "@api/mutations";
import { useIsStoreOpenQuery } from "@api/queries";
import { SidebarButton } from "@components/buttons";
import React, { useCallback } from "react";
import styles from "./StoreOpenSection.module.sass";

interface Props {}

const CLOSE_CONFIRMATION_TEXT = `The online store will be closed. No orders can be placed while the restaurant is closed.`;
const OPEN_CONFIRMATION_TEXT = `The online store will be opened. Users will be able to place orders.`;

const StoreOpenSection: React.FC<Props> = () => {
  const { data, loading } = useIsStoreOpenQuery();

  const [closeStore, { loading: closing }] = useCloseStoreMutation();
  const [openStore, { loading: opening }] = useOpenStoreMutation();

  const onCloseStore = useCallback(async () => {
    if (!confirm(CLOSE_CONFIRMATION_TEXT)) return;

    await closeStore();
  }, [closeStore]);

  const onOpenStore = useCallback(async () => {
    if (!confirm(OPEN_CONFIRMATION_TEXT)) return;

    await openStore();
  }, [openStore]);

  const working = closing || opening;

  if (loading) return null;
  const open = data?.isStoreOpen;

  return (
    <section className={styles.section}>
      {open ? (
        <>
          <span className={styles.label}>
            The restaurant is currently open.
          </span>
          <SidebarButton
            className={styles.closeStoreButton}
            disabled={working}
            onClick={onCloseStore}
          >
            Close restaurant
          </SidebarButton>
        </>
      ) : (
        <>
          <span className={styles.label}>The restaurant is closed.</span>
          <SidebarButton
            className={styles.openStoreButton}
            disabled={working}
            onClick={onOpenStore}
          >
            Open restaurant
          </SidebarButton>
        </>
      )}
    </section>
  );
};

export default StoreOpenSection;
