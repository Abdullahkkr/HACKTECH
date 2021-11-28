import React, {useEffect, useState} from "react";
// import CardStats from "../Cards/Camera"
// components

import { allInventory } from "pages/auth/Services-API/api";

export default function HeaderStats() {

    const [products, setProducts] = useState()

    useEffect(() => {
        allInventory().then((response) =>{
            setProducts(response.data.result)
            console.log(response.data);
        })
    }, [])

return (
    <div>
        {products ? products.map((item, i) => {
            return (
                <div key={i} >
                    <button>
                    <p>{item.Category}</p>
                    <p>{item.Brand}</p>
                    <br/>
                    <br/>
                    </button>
                </div>
            );
        }) : null }
        {/* <CardStats /> */}
    </div>
)
}
