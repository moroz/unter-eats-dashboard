import { SubscriptionProvider } from "@api/subscriptions";
import Layout from "@views/Layout";
import React from "react";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <SubscriptionProvider>
      <Layout>
        <p>Hello world!</p>
      </Layout>
    </SubscriptionProvider>
  );
};

export default Dashboard;
