import { PaginationPage, Product } from "@api/interfaces";
import React from "react";
import ProductCard from "../ProductCard";
import styles from "./ProductGrid.module.sass";

interface Props {
  page: PaginationPage<Product>;
}

const ProductGrid: React.FC<Props> = ({ page }) => {
  return (
    <div className={styles.grid}>
      {page.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
