import React, { useState } from "react";
import Link from "next/link";
// layout for page

import Auth from "layouts/InventoryAuth";
import { EditOrder } from "./Services-API/api";
import { useRouter } from 'next/router';
import { getOrderConfirmAtom } from "pages/userState";
import { getOrderStatusAtom } from "pages/userState";
import { getOrderIDAtom } from "pages/userState";
import { useAtom } from "jotai";

export default function Inventory() {
const [Order_ID, setOrder_ID] = useState("")
const [Order_Status, setOrder_Status] = useState("")
const [Order_Confirmation, setOrder_Confirmation] = useState("")
const [getOrderConfirmation, setgetOrderConfirmation] = useAtom(getOrderConfirmAtom)
const [getOrderStatus, setgetOrderStatus] = useAtom(getOrderStatusAtom)
const [getOrderID, setgetOrderID] = useAtom(getOrderIDAtom)

const router = useRouter()
const EditOrderDasboard = (e) =>{
    // setgetOrderConfirmation(Order_Confirmation)
    // setgetOrderStatus(Order_Status)
    // setgetOrderID(Order_ID)
    EditOrder(Order_ID, Order_Status, Order_Confirmation).then((response) =>{
    if(response.data.isSuccessful){
    if(response.data.error === false){
        router.push('/auth/admin_dashboard')
    }
    }     
    else
    {
    alert("Invalid Fields-Please Re-Enter values")
    }
})
}

return (
<>
    <div className="container mx-auto px-7 py-4 mt-1 h-full">
    <div className="flex content-center items-center h-full">
        <div className="w-full lg:w-5/12 px-6 py--20">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-bg rounded-lg bg-blueGray-850 border-0">
            <div className="rounded-t mb-0 px-15 py-15">
            <div className="text-center mb-3">
            <h6 className="text-blueGray-400 text-xl py-30 font-bold">
                <large>H A C K T E C H</large>
                </h6>
                <h6 className="text-blueGray-400 text-l py-2">
                <small>A tradition of excellent since 2021</small>
                </h6>
                <h6 className="text-blueGray-400 text-xl py-30 font-bold">
                {/* <large>Edit Order</large> */}
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
                Order_ID
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Order_ID"
                    value={Order_ID}
                    onChange={(e) => {setOrder_ID(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Order_Status
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Order_Status"
                    value={Order_Status}
                    onChange={(e) => {setOrder_Status(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Order_Confirmation
                </label>
                <input
                    type="Cnic"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Order_Confirmation"
                    value={Order_Confirmation}
                    onChange={(e) => {setOrder_Confirmation(e.target.value);}}
                />
                </div>

                <div className="text-center mt-6">
                {/* <Link href="/auth/new_account"> */}
                <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    onClick = {() => {EditOrderDasboard()}}
                >
                    Edit Order
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

Inventory.layout = Auth;
