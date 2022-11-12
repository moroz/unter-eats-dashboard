import Dashboard from "@views/Dashboard";
import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "@views/NotFound";
import { OrderIndex } from "@views/orders";
import { LoginPage } from "@views/unauthenticated";
import { ProductRoutes } from "@views/products";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/orders" element={<OrderIndex />} />
      <Route path="/products/*" element={<ProductRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
