import { ORDER_DETAILS } from "@api/fragments/orderFragments";
import { Order } from "@api/interfaces";
import { gql, SubscriptionHookOptions, useSubscription } from "@apollo/client";
import { useSubscriptionClientContext } from "./contextHook";

export const ORDER_PLACED_SUBSCRIPTION = gql`
  subscription GetNewOrders {
    orderPlaced {
      id
    }
  }
`;

export interface OrderPlacedSubscriptionResult {
  orderPlaced: Order;
}

export const useOrderPlacedSubscription = (opts?: SubscriptionHookOptions) => {
  const client = useSubscriptionClientContext();

  return useSubscription<OrderPlacedSubscriptionResult>(
    ORDER_PLACED_SUBSCRIPTION,
    { client, ...opts }
  );
};
