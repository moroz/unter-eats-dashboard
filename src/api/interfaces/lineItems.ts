import { ID } from "./common";
import { Product } from "./products";

export interface LineItem {
  id: string;
  quantity: number;
  product: Product;
  productId: ID;
}
