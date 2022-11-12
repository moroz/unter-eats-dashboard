import { PaginationPage, Product } from "@api/interfaces";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../ProductCard";
import styles from "./ProductGrid.module.sass";

interface Props {
  page: PaginationPage<Product>;
}

const ProductGrid: React.FC<Props> = ({ page }) => {
  const location = useLocation();
  const referrer = useMemo(() => {
    return location.pathname + location.search;
  }, [location]);

  return (
    <div className={styles.grid}>
      {page.data.map((product) => (
        <ProductCard key={product.id} product={product} referrer={referrer} />
      ))}
    </div>
  );
};

export default ProductGrid;
