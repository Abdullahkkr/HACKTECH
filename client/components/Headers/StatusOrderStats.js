import React, { useEffect, useState } from "react";
import { Order_Confirmation, Order_Status } from "Services-API/api";

import { useAtom } from "jotai"; //this
import { getOrderIDAtom } from "pages/userState";//this

export default function HeaderStats() {
const [getOrderID, setgetOrderIDAtom] = useAtom(getOrderIDAtom)//this
const [products, setProducts] = useState();
useEffect(() => {
    Order_Status(getOrderID).then((response) => {//this
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
