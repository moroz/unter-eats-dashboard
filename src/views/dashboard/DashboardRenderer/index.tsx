import { Order } from "@api/interfaces";
import { useOrderFulfilledMutation } from "@api/mutations";
import { useListIncomingOrdersQuery } from "@api/queries";
import { useOrderPlacedSubscription } from "@api/subscriptions";
import clsx from "clsx";
import React, { useCallback } from "react";
import OrderCard from "../OrderCard";
import styles from "./DashboardRenderer.module.sass";

interface Props {}

const DashboardRenderer: React.FC<Props> = () => {
  const { data } = useListIncomingOrdersQuery();
  useOrderPlacedSubscription();
  const orders = data?.orders;

  const [mutate] = useOrderFulfilledMutation();

  const onOrderFulfilled = useCallback(
    (order: Order) => async () => {
      await mutate({ variables: { id: order.id } });
    },
    [mutate]
  );

  return (
    <>
      <p className={clsx("notification", styles.audioNotes)}>
        New orders will be displayed here. To ensure that sound notifications
        can be played, please click anywhere on the page or allow sound autoplay
        in your browser settings.
      </p>
      <section className={styles.grid}>
        {orders?.map((order) => (
          <OrderCard
            order={order}
            key={order.id}
            onFulfilled={onOrderFulfilled(order)}
          />
        ))}
      </section>
    </>
  );
};

export default DashboardRenderer;
