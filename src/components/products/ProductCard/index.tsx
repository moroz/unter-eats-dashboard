import { formatPrice } from "@lib/priceHelpers";
import { Product } from "@api/interfaces";
import React from "react";
import ProductImage from "../ProductImage";
import styles from "./ProductCard.module.sass";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface Props {
  product: Product;
  referrer?: string;
}

const ProductCard: React.FC<Props> = ({ product, referrer }) => {
  const search = referrer
    ? new URLSearchParams({ ref: referrer }).toString()
    : "";
  const href = `/products/${product.id}?${search}`;
  return (
    <Link
      to={href}
      className={clsx(styles.card, product.imageUuid && styles.hasImage)}
    >
      <ProductImage product={product} />
      <section className={styles.label}>
        <span className={styles.name}>{product.namePl}</span>
        <span className={styles.price}>{formatPrice(product.price)}</span>
      </section>
    </Link>
  );
};

export default ProductCard;
