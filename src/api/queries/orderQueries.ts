import { ORDER_DETAILS } from "@api/fragments/orderFragments";
import {
  Order,
  PaginationPage,
  StandardPaginationParams
} from "@api/interfaces";
import { gql, useQuery } from "@apollo/client";

export const PAGINATE_ORDERS = gql`
  ${ORDER_DETAILS}

  query PaginateOrders($params: OrderPaginationParams!) {
    paginateOrders(params: $params) {
      pageInfo {
        totalPages
        totalEntries
        page
        pageSize
      }
      data {
        ...OrderDetails
      }
    }
  }
`;

export interface PaginateOrdersQueryResult {
  paginateOrders: PaginationPage<Order>;
}

export interface PaginateOrdersQueryVariables {
  params: StandardPaginationParams;
}

export const usePaginateOrdersQuery = (params: StandardPaginationParams) =>
  useQuery<PaginateOrdersQueryResult, PaginateOrdersQueryVariables>(
    PAGINATE_ORDERS,
    { variables: { params } }
  );

export const LIST_INCOMING_ORDERS = gql`
  ${ORDER_DETAILS}

  query ListIncomingOrders {
    orders: incomingOrders {
      ...OrderDetails
    }
  }
`;

export interface ListIncomingOrdersQueryResult {
  orders: Order[];
}

export const useListIncomingOrdersQuery = () =>
  useQuery<ListIncomingOrdersQueryResult>(LIST_INCOMING_ORDERS);
