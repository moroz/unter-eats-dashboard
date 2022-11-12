import { useGetProductQuery } from "@api/queries/productQueries";
import { EditButton } from "@components/buttons";
import { formatPrice } from "@lib/priceHelpers";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ShowProduct.module.sass";

interface Props {}

const ShowProduct: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetProductQuery(id!);
  const product = data?.product;

  if (loading) return <LayoutLoader />;
  if (!product) return <NotFound />;

  return (
    <Layout
      title={product.namePl}
      subtitle="Product details"
      centered
      backUrl="/products"
    >
      <div>
        <EditButton to={`/products/${id}/edit`} />
        <div className={styles.table}>
          <p>
            <strong>Price:</strong>
            <span>{formatPrice(product.price)}</span>
          </p>
          <p>
            <strong>Friendly URL:</strong>
            <code>{product.slug}</code>
          </p>
          <p>
            <strong>Name in Polish:</strong>
            <span>{product.namePl}</span>
          </p>
          <p>
            <strong>Name in English:</strong>
            <span>{product.nameEn}</span>
          </p>
          <p>
            <strong>Description in Polish:</strong>
            <span>{product.descriptionPl}</span>
          </p>
          <p>
            <strong>Description in English:</strong>
            <span>{product.descriptionEn}</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ShowProduct;
