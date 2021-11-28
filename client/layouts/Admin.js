import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/UserStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  return (
    <>
    <div
      className="absolute top-0 w-full h-full bg-blueGray-800 bg-full"
          >
      <Sidebar />
      <div  className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </div>
    </>
  );
}
