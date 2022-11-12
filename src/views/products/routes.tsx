import React from "react";
import { Routes, Route } from "react-router-dom";
import EditProduct from "./EditProduct";
import NewProduct from "./NewProduct";
import ProductIndex from "./ProductIndex";

const ProductRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProductIndex />} />
      <Route path="/new" element={<NewProduct />} />
      <Route path="/:id" element={<EditProduct />} />
    </Routes>
  );
};

export default ProductRoutes;
