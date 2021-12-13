import React, { useEffect, useState } from "react";
// import CardStats from "../Cards/Camera"
// components

import { ShowSpecificInventory } from "Services-API/api";
import { getCustomerIDAtom } from "pages/userState";
import { getCategoryAtom } from "pages/userState";
import { newOrder } from "Services-API/api";
import {useAtom} from 'jotai';
import Modal from 'react-modal';
import router from "next/router";

const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
},
};

export default function HeaderStats() {
const [products, setProducts] = useState();
const [getCategory, setgetCategory] = useAtom(getCategoryAtom)
const [getCustomerID, setgetCustomerID] = useAtom(getCustomerIDAtom)
useEffect(() => {
    ShowSpecificInventory(getCategory).then((response) => {
    setProducts(response.data.message);
    console.log(response.data);
});
}, []);
let subtitle;
const [modalIsOpen, setIsOpen] = React.useState(false);
let productName;
function openModal() {
setIsOpen(true);
}

function afterOpenModal() {
// references are now sync'd and can be accessed.
subtitle.style.color = '#f00';
}
function closeModal() {
setIsOpen(false);
}
const placeOrder = (e) =>{
    newOrder(getCategory, productName, today, deliver, getCustomerID).then((response)=>{
        if(response.data.isSuccessful){
            router.push('/auth/pastOrders')
        }
    })
}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var deliver = new Date();
today = yyyy + '-' + mm + '-' + dd;
deliver = yyyy + '-'+ mm + '-' + dd;
return (
<div className="mb-24">
    <ol className="flex flex-wrap" >
    {products
        ? products.map((item, i) => {
            return ( 
            <button>
            <li key={i} className="flex-auto p-4 m-4 bg-lightBlue-200 ">
                <button onClick={openModal}>
                {Object.keys(item).map(key => {
                    const notInclude = ["Cost_Price","Admin_ID","Unit_ID"]
                    productName = item.Product_Name;
                    if (notInclude.indexOf(key) !== -1) return;
                    return (
                        <p align="left"><b>{key}:</b>  {item[key]}</p>
                    )
                })}
                </button>
                <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Buy this item ?</h2>
                <button onClick={closeModal}>Close</button>
                <br></br><br></br>
                <button onClick={(e) => {placeOrder(e)}}>Add to Cart and Buy</button>
            </Modal>
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
