import { Routes, Route } from "react-router-dom";
import OrderIndex from "./OrderIndex";
import ShowOrder from "./ShowOrder";

const OrderRoutes = () => {
  return (
    <Routes>
      <Route index element={<OrderIndex />} />
      <Route path="/:id" element={<ShowOrder />} />
    </Routes>
  );
};

export default OrderRoutes;
