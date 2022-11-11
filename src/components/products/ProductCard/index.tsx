import { Product } from "@api/interfaces";
import React from "react";
import ProductImage from "../ProductImage";
import styles from "./ProductCard.module.sass";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={styles.card}>
      <ProductImage product={product} />
      <span className={styles.name}>{product.namePl}</span>
    </article>
  );
};

export default ProductCard;
