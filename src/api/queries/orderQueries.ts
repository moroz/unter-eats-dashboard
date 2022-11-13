import {
  Order,
  PaginationPage,
  StandardPaginationParams
} from "@api/interfaces";
import { gql, useQuery } from "@apollo/client";

export const PAGINATE_ORDERS = gql`
  query PaginateOrders($params: OrderPaginationParams!) {
    paginateOrders(params: $params) {
      pageInfo {
        totalPages
        totalEntries
        page
        pageSize
      }
      data {
        id
        shippingAddress
        deliveryType
        email
        firstName
        lastName
        grandTotal
        lineItems {
          id
          quantity
          productId
          productName
          productPrice
        }
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
