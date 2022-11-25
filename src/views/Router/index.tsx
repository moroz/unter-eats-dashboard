import { Routes, Route } from "react-router-dom";

import { Dashboard, OrderRoutes } from "@views/orders";
import NotFound from "@views/NotFound";
import { LoginPage } from "@views/unauthenticated";
import { ProductRoutes } from "@views/products";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/orders/*" element={<OrderRoutes />} />
      <Route path="/products/*" element={<ProductRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
