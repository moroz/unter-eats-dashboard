import { usePaginateOrdersQuery } from "@api/queries/orderQueries";
import Layout from "@views/Layout";
import React from "react";

interface Props {}

const OrderIndex: React.FC<Props> = () => {
  const { data, loading } = usePaginateOrdersQuery({});

  return (
    <Layout title="Orders">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
};

export default OrderIndex;
