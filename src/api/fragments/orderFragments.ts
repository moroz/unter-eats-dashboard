import { gql } from "@apollo/client";

export const ORDER_DETAILS = gql`
  fragment OrderDetails on Order {
    id
    shippingAddress
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
`;
