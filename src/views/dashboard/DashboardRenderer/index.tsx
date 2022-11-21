import { ID, Order } from "@api/interfaces";
import { useOrderFulfilledMutation } from "@api/mutations";
import { useListIncomingOrdersQuery } from "@api/queries";
import { useOrderPlacedSubscription } from "@api/subscriptions";
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
    <section className={styles.grid}>
      {orders?.map((order) => (
        <OrderCard
          order={order}
          key={order.id}
          onFulfilled={onOrderFulfilled(order)}
        />
      ))}
    </section>
  );
};

export default DashboardRenderer;
