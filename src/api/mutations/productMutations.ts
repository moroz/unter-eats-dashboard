import { PRODUCT_DETAILS } from "@api/fragments";
import {
  CreateProductParams,
  ID,
  MutationResult,
  Product,
  UpdateProductParams
} from "@api/interfaces";
import { gql, useMutation } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  ${PRODUCT_DETAILS}

  mutation CreateProduct($params: CreateProductParams!) {
    result: createProduct(params: $params) {
      success
      data {
        ...ProductDetails
      }
      errors {
        key
        message
      }
    }
  }
`;

export interface CreateProductMutationResult {
  result: MutationResult<Product>;
}

export interface CreateProductMutationVariables {
  params: CreateProductParams;
}

export const useCreateProductMutation = () =>
  useMutation<CreateProductMutationResult, CreateProductMutationVariables>(
    CREATE_PRODUCT,
    {
      refetchQueries: ["PaginateProducts"]
    }
  );

export const UPDATE_PRODUCT = gql`
  ${PRODUCT_DETAILS}

  mutation UpdateProduct($id: ID!, $params: UpdateProductParams!) {
    result: updateProduct(id: $id, params: $params) {
      success
      data {
        ...ProductDetails
      }
      errors {
        key
        message
      }
    }
  }
`;

export interface UpdateProductMutationResult {
  result: MutationResult<Product>;
}

export interface UpdateProductMutationVariables {
  id: ID;
  params: UpdateProductParams;
}

export const useUpdateProductMutation = () =>
  useMutation<UpdateProductMutationResult, UpdateProductMutationVariables>(
    UPDATE_PRODUCT
  );
