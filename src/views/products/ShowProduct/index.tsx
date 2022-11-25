import { uploadProductImage } from "@api/mutations/imageMutations";
import { useGetProductQuery } from "@api/queries/productQueries";
import AttributesList from "@components/AttributesList";
import { EditButton } from "@components/buttons";
import ProductImage from "@components/products/ProductImage";
import formatPrice from "@lib/formatPrice";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import React, { ChangeEvent, EventHandler, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./ShowProduct.module.sass";

interface Props {}

const ShowProduct: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading, refetch } = useGetProductQuery(id!);
  const product = data?.product;

  const onUploadImage: EventHandler<ChangeEvent> = useCallback(
    async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files![0];
      if (!file) return;
      const success = await uploadProductImage(id!, file);
      if (success) {
        refetch();
      }
    },
    [refetch, id]
  );

  if (loading) return <LayoutLoader />;
  if (!product) return <NotFound />;

  return (
    <Layout
      title={product.namePl}
      subtitle="Product details"
      centered
      backUrl="/products"
    >
      <div className={styles.columns}>
        <section>
          <header className={styles.sectionHeader}>
            <h3 className="title is-4">Attributes</h3>
            <EditButton to={`/products/${id}/edit`} />
          </header>
          <AttributesList>
            {[
              { label: "Database ID:", value: product.id },
              { label: "Price:", value: formatPrice(product.price) },
              { label: "Friendly URL:", value: product.slug, monospace: true },
              { label: "Name in Polish:", value: product.namePl },
              { label: "Name in English:", value: product.nameEn },
              { label: "Description in Polish:", value: product.descriptionPl },
              { label: "Description in English:", value: product.descriptionEn }
            ]}
          </AttributesList>
        </section>
        <section>
          <header className={styles.sectionHeader}>
            <h3 className="title is-4">Image</h3>
          </header>
          <ProductImage product={product} className={styles.thumb} />
          <div className="field">
            <label className="label">Upload image</label>
            <input type="file" className="input" onChange={onUploadImage} />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ShowProduct;
