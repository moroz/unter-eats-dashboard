import { usePaginateProductsQuery } from "@api/queries/productQueries";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import React from "react";
import { ProductGrid } from "@components/products";

interface Props {}

const ProductIndex: React.FC<Props> = () => {
  const { data, loading } = usePaginateProductsQuery({});

  if (loading && !data) return <LayoutLoader />;

  return (
    <Layout title="Products">
      <ProductGrid page={data!.paginateProducts} />
    </Layout>
  );
};

export default ProductIndex;
