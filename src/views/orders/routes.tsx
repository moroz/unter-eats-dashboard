import { Routes, Route } from "react-router-dom";
import OrderIndex from "./OrderIndex";
import ShowOrder from "./ShowOrder";
import NotFound from "@views/NotFound";

const OrderRoutes = () => {
  return (
    <Routes>
      <Route index element={<OrderIndex />} />
      <Route path="/:id" element={<ShowOrder />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default OrderRoutes;
