import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

const LayoutPage = () => {
  return (
    <section>
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
};

export default LayoutPage;
