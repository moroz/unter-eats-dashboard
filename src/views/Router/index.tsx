import Dashboard from "@views/Dashboard";
import LoginPage from "@views/unauthenticated/LoginPage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "@views/NotFound";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
