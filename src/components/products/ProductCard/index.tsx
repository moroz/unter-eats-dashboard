import { formatPrice } from "@lib/priceHelpers";
import { Product } from "@api/interfaces";
import React from "react";
import ProductImage from "../ProductImage";
import styles from "./ProductCard.module.sass";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <ProductImage product={product} />
      <section className={styles.label}>
        <span className={styles.name}>{product.namePl}</span>
        <span className={styles.price}>{formatPrice(product.price)}</span>
      </section>
    </Link>
  );
};

export default ProductCard;
