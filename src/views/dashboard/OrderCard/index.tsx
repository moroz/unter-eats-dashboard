import { Order } from "@api/interfaces";
import { Card } from "@components";
import React from "react";
import styles from "./OrderCard.module.sass";

interface Props {
  order: Order;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <Card className={styles.order}>
      <p>{order.id}</p>
    </Card>
  );
};

export default OrderCard;
