import {
  PaginationPage,
  Product,
  StandardPaginationParams
} from "@api/interfaces";
import { gql, useQuery } from "@apollo/client";

export const PAGINATE_PRODUCTS = gql`
  query PaginateProducts($params: ProductPaginationParams!) {
    paginateProducts(params: $params) {
      pageInfo {
        page
        pageSize
        totalPages
        totalEntries
      }
      data {
        id
        price
        namePl
        descriptionPl
        slug
      }
    }
  }
`;

export interface PaginateProductsQueryResult {
  paginateProducts: PaginationPage<Product>;
}

export interface PaginateProductsQueryVariables {
  params: StandardPaginationParams;
}

export const usePaginateProductsQuery = (params: StandardPaginationParams) =>
  useQuery<PaginateProductsQueryResult, PaginateProductsQueryVariables>(
    PAGINATE_PRODUCTS,
    {
      variables: {
        params
      }
    }
  );
