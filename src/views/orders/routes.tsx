import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderIndex from "./OrderIndex";
import ShowOrder from "./ShowOrder";

interface Props {}

const OrderRoutes: React.FC<Props> = () => {
  return (
    <Routes>
      <Route index element={<OrderIndex />} />
      <Route path="/:id" element={<ShowOrder />} />
    </Routes>
  );
};

export default OrderRoutes;
