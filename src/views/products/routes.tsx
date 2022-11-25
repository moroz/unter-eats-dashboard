import { Routes, Route } from "react-router-dom";

import NotFound from "@views/NotFound";
import EditProduct from "./EditProduct";
import NewProduct from "./NewProduct";
import ProductIndex from "./ProductIndex";
import ShowProduct from "./ShowProduct";

const ProductRoutes = () => {
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
