import React, { useEffect, useState } from "react";
// import CardStats from "../Cards/Camera"
// components

import { allInventory } from "Services-API/api";

export default function HeaderStats() {
const [products, setProducts] = useState();

useEffect(() => {
allInventory().then((response) => {
    setProducts(response.data.result);
    console.log(response.data);
});
}, []);
return (
<div className="mb-24 " >
    <ol className="flex flex-wrap" >
    {products
        ? products.map((item, i) => {
            return (
            <button>
            <li key={i} className="flex-auto p-4 m-4 bg-lightBlue-200">
                <button>
                <p>{item.Category}</p>
                <p>{item.Brand}</p>
                <p>{item.Product_Name}</p>
                <p>{item.Colour}</p>
                <p>{item.Features}</p>
                {/* if(response.data.isSuccessful){ */}
                <p>_____________</p>
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
