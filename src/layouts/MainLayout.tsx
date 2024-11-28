import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>Main Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Main Footer</footer>
    </div>
  );
};

export default MainLayout;
