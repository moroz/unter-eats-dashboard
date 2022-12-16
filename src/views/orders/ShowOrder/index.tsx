import { useGetOrderQuery } from "@api/queries";
import AttributesList from "@components/AttributesList";
import { compactTime } from "@lib/dateHelpers";
import formatPrice from "@lib/formatPrice";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ShowOrder.module.sass";

interface Props {}

const ShowOrder: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetOrderQuery(id);

  const order = data?.order;
  if (loading && !data) return <LayoutLoader />;
  if (!order) return <NotFound />;

  return (
    <Layout title="Order details">
      <AttributesList>
        {[
          { label: "Database ID:", value: order.id },
          {
            label: "Grand total:",
            value: formatPrice(order.grandTotal)
          },
          {
            label: "Placed at:",
            value: compactTime(order.insertedAt)
          },
          {
            label: "Paid at:",
            value: order.paidAt ? compactTime(order.paidAt) : "Not paid"
          },
          {
            label: "Fulfilled at:",
            value: order.fulfilledAt
              ? compactTime(order.fulfilledAt)
              : "Not fulfilled"
          },
          {
            label: "Full name:",
            value: [order.firstName, order.lastName].filter(Boolean).join(" ")
          }
        ]}
      </AttributesList>
      <table className={styles.items}>
        <thead>
          <tr>
            <th className={styles.quantity}>Quantity</th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.lineItems.map((item) => {
            const amount = Number(item.productPrice || 0) * item.quantity;
            return (
              <tr key={item.id}>
                <td className={styles.quantity}>{item.quantity} &times;</td>
                <td>{item.productName}</td>
                <td>{formatPrice(item.productPrice)}</td>
                <td>{formatPrice(amount)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default ShowOrder;
