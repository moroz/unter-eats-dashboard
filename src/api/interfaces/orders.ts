import { Decimal, ID, ISOTimestamp } from "./common";
import { LineItem } from "./lineItems";

export interface Order {
  id: ID;

  email: string;
  firstName: string;
  lastName: string | null;
  shippingAddress: string | null;
  phoneNo: string;
  deliveryType: "PICKUP" | "DELIVERY";
  grandTotal: Decimal;
  lineItems: LineItem[];

  paidAt: ISOTimestamp | null;
  insertedAt: ISOTimestamp;
  updatedAt: ISOTimestamp;
}
