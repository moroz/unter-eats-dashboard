import { ORDER_DETAILS } from "@api/fragments/orderFragments";
import { Order } from "@api/interfaces";
import {
  ListIncomingOrdersQueryResult,
  LIST_INCOMING_ORDERS
} from "@api/queries";
import {
  gql,
  SubscriptionHookOptions,
  useApolloClient,
  useSubscription
} from "@apollo/client";
import { useSubscriptionClientContext } from "./contextHook";

export const ORDER_PLACED_SUBSCRIPTION = gql`
  subscription GetNewOrders {
    orderPlaced {
      # Fragments don't seem to be working correctly with Apollo Subscriptions
      id
      shippingAddress
      email
      firstName
      lastName
      grandTotal
      deliveryType
      shippingAddress
      phoneNo
      paidAt
      lineItems {
        id
        quantity
        productName
        productPrice
      }
    }
  }
`;

export interface OrderPlacedSubscriptionResult {
  orderPlaced: Order;
}

export const useOrderPlacedSubscription = (opts?: SubscriptionHookOptions) => {
  const client = useSubscriptionClientContext();
  const httpClient = useApolloClient();

  return useSubscription<OrderPlacedSubscriptionResult>(
    ORDER_PLACED_SUBSCRIPTION,
    {
      client,
      onData: ({ data }) => {
        const newOrder = data.data?.orderPlaced;
        if (!newOrder) return;
        httpClient.cache.updateQuery(
          { query: LIST_INCOMING_ORDERS },
          ({ orders }) => {
            const exists = orders.some(
              (order: Order) => order.id === newOrder?.id
            );
            if (exists) return { orders };
            const newValue = [newOrder, ...orders];
            return { orders: newValue };
          }
        );
      },
      ...opts
    }
  );
};
