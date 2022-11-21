import { gql } from "@apollo/client";

export const ORDER_DETAILS = gql`
  fragment OrderDetails on Order {
    id
    shippingAddress
    firstName
    lastName
    email
    grandTotal
    deliveryType
    shippingAddress
    phoneNo
    paidAt
    fulfilledAt
    lineItems {
      id
      quantity
      productName
      productPrice
    }
  }
`;
