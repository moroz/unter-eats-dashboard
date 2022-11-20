import { SubscriptionProvider } from "@api/subscriptions";
import Layout from "@views/Layout";
import React from "react";
import DashboardRenderer from "../DashboardRenderer";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <Layout title="Incoming orders">
      <SubscriptionProvider>
        <DashboardRenderer />
      </SubscriptionProvider>
    </Layout>
  );
};

export default Dashboard;
