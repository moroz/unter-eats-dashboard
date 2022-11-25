import { gql } from "@apollo/client";

export const ORDER_DETAILS = gql`
  fragment OrderDetails on Order {
    id
    shippingAddress
    firstName
    lastName
    email
    remarks
    grandTotal
    deliveryType
    shippingAddress
    phoneNo
    paidAt
    fulfilledAt
    metadata
    lineItems {
      id
      quantity
      productName
      productPrice
    }
  }
`;
