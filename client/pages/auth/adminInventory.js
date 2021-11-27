import React, { useState } from "react";
import Link from "next/link";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
// layout for page


import Auth from "layouts/Login.js";

export default function Login() {

return (
<>
    <div className="container mx-auto px-10 py-20 h-full">
    <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
    </div>
    <div className="flex content-center items-center h-full">
        <div className="w-full lg:w-4/12 px-6 py-10">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-bg rounded-lg bg-blueGray-850 border-0">
            <div className="rounded-t mb-0 px-15 py-15">
            <div className="text-center mb-3">
                <h6 className="text-blueGray-400 text-xl py-30 font-bold">
                <large>H A C K T E C H</large>
                </h6>
                <h6 className="text-blueGray-400 text-l py-2">
                <small>A tradition of excellent since 2021</small>
                </h6>
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-400" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-15 pt-0">
                <div className="text-center mt-6">
                <Link href="/auth/adminInventory">
                <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                >
                    My Inventory will be showed here
                </button>
                </Link>
                </div>
            </div>
        </div>
        <div className="flex flex-wrap mt-6 relative ">
        </div>
        </div>
    </div>
    </div>
</>
);
}

Login.layout = Auth;
