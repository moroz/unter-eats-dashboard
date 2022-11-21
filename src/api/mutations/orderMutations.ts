import { ID, MutationResult, Order } from "@api/interfaces";
import { LIST_INCOMING_ORDERS, useListIncomingOrdersQuery } from "@api/queries";
import { gql, useApolloClient, useMutation } from "@apollo/client";

export const ORDER_FULFILLED = gql`
  mutation OrderFulfilled($id: ID!) {
    result: orderFulfilled(id: $id) {
      success
      errors {
        key
        message
      }
      data {
        id
        paidAt
        fulfilledAt
      }
    }
  }
`;

export interface OrderFulfilledMutationResult {
  result: MutationResult<Order>;
}

export interface OrderFulfilledMutationVariables {
  id: ID;
}

export const useOrderFulfilledMutation = () => {
  const { refetch } = useListIncomingOrdersQuery();
  const client = useApolloClient();

  return useMutation<
    OrderFulfilledMutationResult,
    OrderFulfilledMutationVariables
  >(ORDER_FULFILLED, {
    onCompleted: (result) => {
      if (!result.result.success) {
        refetch();
      } else {
        client.cache.updateQuery(
          { query: LIST_INCOMING_ORDERS },
          ({ orders }) => {
            const id = result.result.data?.id;
            if (!id) return { orders };
            return {
              orders: orders.filter((order: Order) => order.id !== id)
            };
          }
        );
      }
    }
  });
};
