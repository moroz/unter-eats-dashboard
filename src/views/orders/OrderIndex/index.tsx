import { usePaginateOrdersQuery } from "@api/queries/orderQueries";
import { Pagination } from "@components";
import Layout from "@views/Layout";
import React from "react";

interface Props {}

const OrderIndex: React.FC<Props> = () => {
  const { data, loading } = usePaginateOrdersQuery({});

  const pageInfo = data?.paginateOrders.pageInfo;

  return (
    <Layout title="Orders">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Pagination pageInfo={pageInfo} />
    </Layout>
  );
};

export default OrderIndex;
