import { gql } from "@apollo/client";

export const PRODUCT_DETAILS = gql`
  fragment ProductDetails on Product {
    id
    namePl
    nameEn
    descriptionEn
    descriptionPl
    inStock
    slug
    price
  }
`;
