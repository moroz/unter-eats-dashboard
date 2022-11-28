import { Product } from "@api/interfaces";

export const formatAvailability = (product: Product) => {
  return product.inStock ? "In stock" : "Sold out";
};
