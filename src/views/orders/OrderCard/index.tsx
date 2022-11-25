import { Order } from "@api/interfaces";
import { Card } from "@components";
import { compactTime } from "@lib/dateHelpers";
import { formatPhone } from "@lib/phoneHelpers";
import React from "react";
import styles from "./OrderCard.module.sass";

interface Props {
  order: Order;
  onFulfilled?: () => Promise<void>;
}

export const formatName = (order: Order) => {
  return [order.firstName, order.lastName].filter(Boolean).join(" ");
};

const OrderCard: React.FC<Props> = ({ order, onFulfilled }) => {
  return (
    <Card className={styles.order}>
      <div className={styles.content}>
        {order.paidAt ? (
          <p>
            <strong>Paid at:</strong> {compactTime(order.paidAt!)}
          </p>
        ) : (
          "Order not paid"
        )}
        <p></p>
        <p>
          <span className={styles.name}>{formatName(order)}</span>,{" "}
          <span className={styles.email}>{order.email}</span>,{" "}
          <span className={styles.phone}>{formatPhone(order.phoneNo)}</span>
        </p>
        <p>
          {order.deliveryType === "DELIVERY" ? (
            <>
              <strong>Delivery:</strong> {order.shippingAddress}
            </>
          ) : (
            "Pickup in restaurant"
          )}
        </p>
        <ul className={styles.items}>
          {order.lineItems.map((item, i) => (
            <li key={i}>
              <span className={styles.quantity}>{item.quantity} &times; </span>
              {item.productName} ({item.productPrice} PLN)
            </li>
          ))}
        </ul>
        {order.remarks ? (
          <p>
            <strong>Client's remarks:</strong> {order.remarks}
          </p>
        ) : null}
      </div>
      {onFulfilled ? (
        <button
          type="button"
          className="button is-fullwidth is-success mt-4"
          onClick={onFulfilled}
        >
          Order fulfilled
        </button>
      ) : null}
    </Card>
  );
};

export default OrderCard;
