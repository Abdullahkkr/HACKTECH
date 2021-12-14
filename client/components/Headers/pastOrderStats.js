import React, { useEffect, useState } from "react";
import { Find_Orders } from "Services-API/api";
import {useAtom} from 'jotai';
import { getCustomerIDAtom } from "Services-API/userState";
export default function HeaderStats() {
const [getCustomerID, setgetCustomerID] = useAtom(getCustomerIDAtom)
const [products, setProducts] = useState();
useEffect(() => {
    Find_Orders(getCustomerID).then((response) => {
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
                    const notInclude = ["Cost_Price","Admin_ID","Unit_ID"]
                    if (notInclude.indexOf(key) !== -1) return;
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
