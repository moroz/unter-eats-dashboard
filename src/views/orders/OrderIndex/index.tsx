import { usePaginateOrdersQuery } from "@api/queries/orderQueries";
import { Pagination } from "@components";
import useParsedQuery from "@hooks/useParsedQuery";
import Layout from "@views/Layout";
import React from "react";
import OrderGrid from "../OrderGrid";

interface Props {}

const OrderIndex: React.FC<Props> = () => {
  const [{ page }] = useParsedQuery();
  const { data } = usePaginateOrdersQuery(
    { page },
    {
      onCompleted: () => {
        window.scroll(0, 0);
      }
    }
  );

  const pageInfo = data?.paginateOrders.pageInfo;
  const orders = data?.paginateOrders.data;

  return (
    <Layout title="Orders">
      <OrderGrid orders={orders} clickable />
      <Pagination pageInfo={pageInfo} />
    </Layout>
  );
};

export default OrderIndex;
