import React, { useEffect, useState } from "react";
import { AmountsOwe } from "Services-API/api";

// import { useAtom } from "jotai"; //this
// import { getOrderIDAtom } from "pages/userState";//this

export default function HeaderStats() {
// const [getOrderID, setgetOrderIDAtom] = useAtom(getOrderIDAtom)//this
const [mess, setmess] = useState();

const [products, setProducts] = useState();
useEffect(() => {
    AmountsOwe().then((response) => {//this
    setProducts(response.data.message);
    // setmess(response.data.Profit);
    console.log(response.data);
});
}, []);
return (
<div className="mb-24">
    <ol className="flex flex-wrap" >
    <b><p>amount Courier service owe to Hacktech</p></b>

    <b><h1> = {products} </h1></b>
    <br></br>
    <br></br>
    {/* <h1>{mess}</h1> */}
    </ol>
    {/* <CardStats /> */}
</div>
);
}
