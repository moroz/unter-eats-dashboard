import { Order } from "@api/interfaces";
import { Card } from "@components";
import { compactTime } from "@lib/dateHelpers";
import { formatPhone } from "@lib/phoneHelpers";
import React from "react";
import styles from "./OrderCard.module.sass";

interface Props {
  order: Order;
  onFulfilled: () => Promise<void>;
}

const OrderCard: React.FC<Props> = ({ order, onFulfilled }) => {
  return (
    <Card className={styles.order}>
      <div className={styles.content}>
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
      </div>
      <button
        type="button"
        className="button is-fullwidth is-success mt-4"
        onClick={onFulfilled}
      >
        Order fulfilled
      </button>
    </Card>
  );
};

export default OrderCard;
