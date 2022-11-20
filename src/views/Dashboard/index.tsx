import { SubscriptionProvider } from "@api/subscriptions";
import { useOrderPlacedSubscription } from "@api/subscriptions/orders";
import Layout from "@views/Layout";
import React from "react";

interface Props {}

const Renderer = () => {
  const result = useOrderPlacedSubscription({
    onData: console.log
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
};

const Dashboard: React.FC<Props> = () => {
  return (
    <Layout>
      <SubscriptionProvider>
        <Renderer />
      </SubscriptionProvider>
    </Layout>
  );
};

export default Dashboard;
