import React, { useEffect, useState } from "react";
import { allOrders } from "Services-API/api";

export default function HeaderStats() {
const [products, setProducts] = useState();
useEffect(() => {
    allOrders().then((response) => {
    setProducts(response.data.message);
    console.log(response.data);
});
}, []);
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
                    return (
                        <p align="left"><b>{key}:</b>  {item[key]}</p>
                    )
                })}
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
