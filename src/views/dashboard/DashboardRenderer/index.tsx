import { useListIncomingOrdersQuery } from "@api/queries";
import { useOrderPlacedSubscription } from "@api/subscriptions";
import React from "react";
import OrderCard from "../OrderCard";
import styles from "./DashboardRenderer.module.sass";

interface Props {}

const DashboardRenderer: React.FC<Props> = () => {
  const { data } = useListIncomingOrdersQuery();
  useOrderPlacedSubscription();
  const orders = data?.orders;

  return (
    <section className={styles.grid}>
      {orders?.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </section>
  );
};

export default DashboardRenderer;
