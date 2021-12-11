import React, { useEffect, useState } from "react";
import { month } from "pages/auth/Services-API/api";

import { useAtom } from "jotai"; //this
import { getMonthAtom } from "pages/userState";//this
import { getYearAtom } from "pages/userState";//this

export default function HeaderStats() {

const [getMonth, setgetMonthAtom] = useAtom(getMonthAtom)//this
const [getYear, setgetYearAtom] = useAtom(getYearAtom)//this


// const [mess, setmess] = useState();

const [products, setProducts] = useState();
useEffect(() => {
    month(getMonth,getYear).then((response) => {//this
    setProducts(response.data.message);
    setmess(response.data.Profit);
    console.log(response.data);
});
}, []);
return (
<div className="mb-24">
    <ol className="flex flex-wrap" >
    <b><h1>{products} = </h1></b>
    <br></br>
    <br></br>
    {/* <h1>{mess}</h1> */}

    </ol>
    {/* <CardStats /> */}
</div>
);
}
