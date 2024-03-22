import React from "react";
import SideNav from "../components/sidebar/SideNav";
import TopNav from "../components/topbar/TopNav";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden">
    <div className="w-1/6">
      <SideNav />
    </div>
    <div className="w-4/5 grow">
      <TopNav />
      {children}
      </div>
    </div>
  );
};

export default AuthLayout;
