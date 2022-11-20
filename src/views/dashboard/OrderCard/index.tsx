import { Order } from "@api/interfaces";
import { Card } from "@components";
import { compactTime } from "@lib/dateHelpers";
import { formatPhone } from "@lib/phoneHelpers";
import React from "react";
import styles from "./OrderCard.module.sass";

interface Props {
  order: Order;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <Card className={styles.order}>
      <p>{compactTime(order.paidAt!)}</p>
      <p>
        {order.firstName} {order.lastName} &lt;{order.email}&gt;,{" "}
        {formatPhone(order.phoneNo)}
      </p>
      <p>
        {order.deliveryType === "DELIVERY"
          ? `Delivery: ${order.shippingAddress}`
          : "Pickup in restaurant"}
      </p>
      <ul className={styles.items}>
        {order.lineItems.map((item, i) => (
          <li key={i}>
            <span className={styles.quantity}>{item.quantity} &times; </span>
            {item.productName} ({item.productPrice} PLN)
          </li>
        ))}
      </ul>
      <button className="button is-fullwidth is-success mt-4">
        Order fulfilled
      </button>
    </Card>
  );
};

export default OrderCard;
