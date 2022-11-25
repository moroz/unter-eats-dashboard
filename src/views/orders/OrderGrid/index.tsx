import { Order } from "@api/interfaces";
import React from "react";
import OrderCard from "../OrderCard";
import styles from "./OrderGrid.module.sass";

interface Props {
  orders?: Order[];
  onOrderFulfilled?: (order: Order) => () => Promise<void>;
  clickable?: boolean;
}

const OrderGrid: React.FC<Props> = ({
  orders,
  onOrderFulfilled,
  clickable
}) => {
  return (
    <div className={styles.grid}>
      {orders?.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onFulfilled={onOrderFulfilled?.(order)}
          clickable={clickable}
        />
      ))}
    </div>
  );
};

export default OrderGrid;
