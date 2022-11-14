import { VITE_GRAPHQL_URL } from "@api/client";
import { MutationResult, Product } from "@api/interfaces";
import { gql } from "@apollo/client";

export const UPLOAD_PRODUCT_IMAGE = gql`
  mutation UploadProductImage($productId: ID!, $image: Upload!) {
    result: uploadProductImage(image: $image, productId: $productId) {
      success
      data {
        id
        imageUuid
      }
      errors {
        key
        message
      }
    }
  }
`;

export interface UploadProductImageResult {
  result: MutationResult<Product>;
}

export const uploadProductImage = async (productId: string, image: File) => {
  try {
    const data = new FormData();

    data.append("query", UPLOAD_PRODUCT_IMAGE.loc!.source.body);
    data.append("variables", JSON.stringify({ productId, image: "image" }));
    data.append("image", image);

    const result = await fetch(VITE_GRAPHQL_URL, {
      method: "POST",
      credentials: "include",
      body: data
    });
    const json = await result.json();
    const response = json.data as UploadProductImageResult;

    const success = response.result.success;
    return success;
  } catch (e) {
    console.error(e);
    return false;
  }
};
