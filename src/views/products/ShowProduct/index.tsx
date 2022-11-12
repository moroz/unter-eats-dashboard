import { useGetProductQuery } from "@api/queries/productQueries";
import AttributesList from "@components/AttributesList";
import { EditButton } from "@components/buttons";
import { formatPrice } from "@lib/priceHelpers";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import NotFound from "@views/NotFound";
import React from "react";
import { useParams } from "react-router-dom";

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
        <AttributesList>
          {[
            { label: "Price:", value: formatPrice(product.price) },
            { label: "Friendly URL:", value: product.slug, monospace: true },
            { label: "Name in Polish:", value: product.namePl },
            { label: "Name in English:", value: product.nameEn },
            { label: "Description in Polish:", value: product.descriptionPl },
            { label: "Description in English:", value: product.descriptionEn }
          ]}
        </AttributesList>
      </div>
    </Layout>
  );
};

export default ShowProduct;
