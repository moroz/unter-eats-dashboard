import { Decimal, ID, ISOTimestamp } from "./common";
import { LineItem } from "./lineItems";

export interface Order {
  id: ID;

  namePl: string;
  descriptionPl: string;
  grandTotal: Decimal;
  lineItems: LineItem[];

  insertedAt: ISOTimestamp;
  updatedAt: ISOTimestamp;
}
