import { Order } from "@api/interfaces";
import { useOrderFulfilledMutation } from "@api/mutations";
import { useListIncomingOrdersQuery } from "@api/queries";
import { useOrderPlacedSubscription } from "@api/subscriptions";
import React, { useCallback } from "react";
import OrderGrid from "../OrderGrid";

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
      <p className="notification">
        New orders will be displayed here. To ensure that sound notifications
        can be played, please click anywhere on the page or allow sound autoplay
        in your browser settings.
      </p>
      <OrderGrid orders={orders} onOrderFulfilled={onOrderFulfilled} />
    </>
  );
};

export default DashboardRenderer;
