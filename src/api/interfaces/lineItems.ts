import { Decimal, ID } from "./common";
import { Product } from "./products";

export interface LineItem {
  id: string;
  quantity: number;
  productId: ID;
  productName: string;
  productPrice: Decimal;
}
