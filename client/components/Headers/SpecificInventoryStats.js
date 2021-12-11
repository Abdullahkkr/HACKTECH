import React, { useEffect, useState } from "react";
// import CardStats from "../Cards/Camera"
// components

import { ShowSpecificInventory } from "pages/auth/Services-API/api";
import { getCategoryAtom } from "pages/userState";
import {useAtom} from 'jotai';

export default function HeaderStats() {
const [products, setProducts] = useState();
const [getCategory, setgetCategory] = useAtom(getCategoryAtom)
useEffect(() => {
    ShowSpecificInventory(getCategory).then((response) => {
    setProducts(response.data.message);
    console.log(response.data);
});
}, []);
const printcat = (item) =>
{
    console.log("cat called")
    console.log(item.Category)
}
return (

<div className="mb-24">
    <ol className="flex flex-wrap" >
    {products
        ? products.map((item, i) => {
            return ( 
            <button>
            <li key={i} className="flex-auto p-4 m-4 bg-lightBlue-200 ">
                <button>
                {Object.keys(item).map(key => {
                    const notInclude = ["Cost_Price","Admin_ID","Unit_ID"]
                    if (notInclude.indexOf(key) !== -1) return;
                    return (
                        <p align="left"><b>{key}:</b>  {item[key]}</p>
                    )
                })}
                {printcat(item)}
                </button>
            </li>
            </button>
            );
        })
        : null}
    </ol>
    {/* <CardStats /> */}
</div>
);
}
