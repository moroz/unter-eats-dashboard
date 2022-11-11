import { Product } from "@api/interfaces";
import React from "react";
import styles from "./ProductImage.module.sass";

interface Props {
  product: Product;
}

const ProductImage: React.FC<Props> = () => {
  return <picture className={styles.root}></picture>;
};

export default ProductImage;
