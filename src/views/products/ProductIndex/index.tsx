import { usePaginateProductsQuery } from "@api/queries/productQueries";
import Layout from "@views/Layout";
import { LayoutLoader } from "@views/Layout/Loader";
import React from "react";
import { ProductGrid } from "@components/products";
import Pagination from "@components/Pagination";
import useParsedQuery from "@hooks/useParsedQuery";
import SearchForm from "@components/SearchForm";

interface Props {}

const ProductIndex: React.FC<Props> = () => {
  const [{ page, q }] = useParsedQuery();
  const { data, previousData } = usePaginateProductsQuery({ page, q });

  const result = data?.paginateProducts ?? previousData?.paginateProducts;

  if (!result) return <LayoutLoader />;

  return (
    <Layout title="Products" actions={<SearchForm />}>
      <ProductGrid page={result} />
      <Pagination pageInfo={result.pageInfo} />
    </Layout>
  );
};

export default ProductIndex;
