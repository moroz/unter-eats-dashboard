import React from "react";
import { Routes, Route } from "react-router-dom";
import EditProduct from "./EditProduct";
import ProductIndex from "./ProductIndex";

const ProductRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProductIndex />} />
      <Route path="/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default ProductRoutes;
