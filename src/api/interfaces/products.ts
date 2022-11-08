import { Decimal, ID, ISOTimestamp } from "./common";

export interface Product {
  id: ID;
  namePl: string;
  descriptionPl: string;
  price: Decimal;

  insertedAt: ISOTimestamp;
  updatedAt: ISOTimestamp;
}
