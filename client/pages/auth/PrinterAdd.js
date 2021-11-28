import React, { useState } from "react";
import Link from "next/link";
// layout for page

import Auth from "layouts/InventoryAuth";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import { Camera_inventory } from "./Services-API/api";
import { useRouter } from 'next/router';

// , "Cost_Price":req.body.Cost_Price, "Selling_Price":req.body.Selling_Price, "Admin_ID":req.body.Admin_ID, "Category":req.body.Category};

export default function Inventory() {
const [Unit_ID, setUnit_ID] = useState("")
const [Brand, setBrand] = useState("")
const [Features, setFeatures] = useState("")
const [Product_Name, setProduct_Name] = useState("")
const [Colour, setColour] = useState("")
const [Description, setDescription] = useState("")
const [Images, setImages] = useState("")
const [Cost_Price, setCost_Price] = useState("")
const [Selling_Price, setSelling_Price] = useState("")
const [Admin_ID, setAdmin_ID] = useState("")
const [Category, setCategory] = useState("")
const [Wireless, setWireless] = useState("")
const [Type, setType] = useState("")
const [Portable, setPortable] = useState("")

const router = useRouter()
const InventoryAdd = (e) =>{
Camera_inventory(Unit_ID, Brand, Features, Product_Name, Colour, Description, Images,Cost_Price,Selling_Price,Admin_ID,Category,Wireless, Type, Portable).then((response) =>{
    console.log(response.data)
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
                <large>Add Item to Inventory</large>
                </h6>
            </div>
            <hr className="mt-2 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Or sign up with credentials</small>
            </div> */}
            <form>
                <div className="relative w-full mb-2">
                <label
                    className="mt-2 block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                Unit_ID
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Unit_ID"
                    value={Unit_ID}
                    onChange={(e) => {setUnit_ID(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Brand
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Brand"
                    value={Brand}
                    onChange={(e) => {setBrand(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Features
                </label>
                <input
                    type="Cnic"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Features"
                    value={Features}
                    onChange={(e) => {setFeatures(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Product Name
                </label>
                <input
                    type="Address"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Product Name"
                    value={Product_Name}
                    onChange={(e) => {setProduct_Name(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Colour
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Colour"
                    value={Colour}
                    onChange={(e) => {setColour(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Description
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Description"
                    value={Description}
                    onChange={(e) => {setDescription(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Images
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Images"
                    value={Images}
                    onChange={(e) => {setImages(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Cost Price
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Cost Price"
                    value={Cost_Price}
                    onChange={(e) => {setCost_Price(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Selling Price
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Selling Price"
                    value={Selling_Price}
                    onChange={(e) => {setSelling_Price(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Admin ID
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Admin ID"
                    value={Admin_ID}
                    onChange={(e) => {setAdmin_ID(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                    Category
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Category"
                    value={Category}
                    onChange={(e) => {setCategory(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                Wireless
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Wireless"
                    value={Wireless}
                    onChange={(e) => {setWireless(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                Type
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Type"
                    value={Type}
                    onChange={(e) => {setType(e.target.value);}}
                />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                Portable
                </label>
                <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Portable"
                    value={Portable}
                    onChange={(e) => {setPortable(e.target.value);}}
                />
                </div>
                <div className="text-center mt-6">
                <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                    onClick = {() => {InventoryAdd()}}
                >
                    Add Item
                </button>
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
