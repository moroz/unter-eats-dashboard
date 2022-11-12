import { usePaginateProductsQuery } from "@api/queries/productQueries";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import React from "react";
import { ProductGrid } from "@components/products";
import Pagination from "@components/Pagination";
import useParsedQuery from "@hooks/useParsedQuery";

interface Props {}

const ProductIndex: React.FC<Props> = () => {
  const [{ page }] = useParsedQuery();
  const { data, loading } = usePaginateProductsQuery({ page });

  if (loading && !data) return <LayoutLoader />;

  return (
    <Layout title="Products">
      <ProductGrid page={data!.paginateProducts} />
      <Pagination pageInfo={data?.paginateProducts.pageInfo} />
    </Layout>
  );
};

export default ProductIndex;
