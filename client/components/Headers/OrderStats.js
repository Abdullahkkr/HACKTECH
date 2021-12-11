// import React, { useEffect, useState } from "react";
// // import CardStats from "../Cards/Camera"
// // components

// import { allOrders } from "pages/auth/Services-API/api";

// export default function HeaderStats() {
// const [products, setProducts] = useState();
//   useEffect(() => {
//     allOrders().then((response) => {
//       setProducts(response.data.result);
//       console.log(response.data);
//     });
//   }, []);
//   return (
//     <div className="mb-24 " >
//       <ol className="flex flex-wrap" >
//         {products
//           ? products.map((item, i) => {
//               return (
//                   <button>
//                   <li key={i} className="flex-auto p-4 m-4 bg-lightBlue-200">
//                 <button>
//                 <p>{item.Unit_ID}</p>
//                 <p>{item.Order_ID}</p>
//                 {/* if(response.data.isSuccessful){ */}
//                 <p>_____________</p>
//                 </button>
//               </li>
//                   </button>
//               );
//             })
//           : null}
//       </ol>
//       {/* <CardStats /> */}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
// import CardStats from "../Cards/Camera"
// components

import { allOrders } from "pages/auth/Services-API/api";

export default function HeaderStats() {
const [products, setProducts] = useState();

useEffect(() => {
allOrders().then((response) => {
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
                <p>{item.Unit_ID}</p>
                <p>{item.Order_ID}</p>
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
