import React, { useState } from "react";
// layout for page

import Auth from "layouts/InventoryAuth.js";
import { Delete_inventory } from "./Services-API/api";
import { useRouter } from 'next/router';

export default function Register() {

const [Unit_ID, setUnit_ID] = useState("")
const router = useRouter()
const DeleteItem = (e) =>{
Delete_inventory(Unit_ID).then((response) =>{
    console.log(response.data)
    if(response.data.isSuccessful){
        router.push('/auth/admin_dashboard')
    }
    else
    {
        alert("User ID not found");
    }
})
}
return (
<>
    <div className="container mx-auto px-10 py- mt--1 h-full">
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
            <hr className="mt-2 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
                <div className="relative w-full mb-2">
                <label
                    className="mt-2 block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                Unit ID
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Unit ID"
                    value={Unit_ID}
                    onChange={(e) => {setUnit_ID(e.target.value);}}
                />
                </div>
                <div>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                    id="customCheckLogin"
                    type="checkbox"
                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                    Please confrim{" "}
                    <a
                        href="#pablo"
                        className="text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                    >
                        the deletion
                    </a>
                    </span>
                </label>
                </div>
                <div className="text-center mt-6">
                {/* <Link href="/auth/new_account"> */}
                <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    onClick = {() => {DeleteItem()}}
                >
                    Delete Item
                </button>
                {/* </Link> */}
                </div>
            </form>
            </div>
        </div>
        
        </div>
    </div>
    </div>
</>
);
}

Register.layout = Auth;
