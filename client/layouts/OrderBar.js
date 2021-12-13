import React from "react";
// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import SidebarAdminNew from "components/Sidebar/SidebarAdminNew.js";
import HeaderStats from "components/Headers/OrderStats.js";

export default function Admin2({ children }) {
return (
<>
<div
    className="absolute top-0 w-full h-full bg-blueGray-800 bg-full"
        >
    <SidebarAdminNew />
    <div className="relative md:ml-64 bg-blueGray-100">
    <AdminNavbar />
    <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
    <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
    <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
    <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
    <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>

    <HeaderStats/>
    <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {children}
        {/* <FooterAdmin /> */}
    </div>
    </div>
</div>
</>
);
}
