import NotFound from "@views/NotFound";
import React from "react";
import { Routes, Route } from "react-router-dom";
import EditProduct from "./EditProduct";
import NewProduct from "./NewProduct";
import ProductIndex from "./ProductIndex";
import ShowProduct from "./ShowProduct";

const ProductRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProductIndex />} />
      <Route path="/new" element={<NewProduct />} />
      <Route path="/:id" element={<ShowProduct />} />
      <Route path="/:id/edit" element={<EditProduct />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default ProductRoutes;
