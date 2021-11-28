import React from "react";

// components

import { allInventory } from "pages/auth/Services-API/api";

export default function HeaderStats() {
return (
    allInventory().then((response) =>{
        console.log(response.data);
    })
)
}
