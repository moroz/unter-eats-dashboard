import {
  ID,
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
        imageUuid
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

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      namePl
      nameEn
      slug
      imageUuid
      descriptionPl
      descriptionEn
      price
      categories {
        id
        namePl
        nameEn
      }
    }
  }
`;

export interface GetProductQueryResult {
  product: Product | null;
}

export interface GetProductQueryVariables {
  id: ID;
}

export const useGetProductQuery = (id: ID) =>
  useQuery<GetProductQueryResult, GetProductQueryVariables>(GET_PRODUCT, {
    variables: { id }
  });
