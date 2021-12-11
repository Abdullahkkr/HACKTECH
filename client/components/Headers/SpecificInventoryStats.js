import React, { useEffect, useState } from "react";
import 'reactjs-popup/dist/index.css';
import { ShowSpecificInventory } from "pages/auth/Services-API/api";
import { getCategoryAtom } from "pages/userState";
import {useAtom} from 'jotai';
import Modal from 'react-modal';
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
useEffect(() => {
    ShowSpecificInventory(getCategory).then((response) => {
    setProducts(response.data.message);
    console.log(response.data);
});
}, []);
let subtitle;
const [modalIsOpen, setIsOpen] = React.useState(false);
function openModal() {
    setIsOpen(true);
}
function afterOpenModal() {
subtitle.style.color = '#f00';
}
function closeModal() {
setIsOpen(false);
}
return (
<div className="mb-24 " >
    <ol className="flex flex-wrap" >
    {products
        ? products.map((item, i) => {
            return (
            <button onClick={openModal}>
            <li key={i} className="flex-auto p-4 m-4 bg-lightBlue-200">
                <button>
                <p>{item.Category}</p>
                <p>{item.Brand}</p>
                <p>{item.Product_Name}</p>
                <p>{item.Colour}</p>
                <p>{item.Features}</p>
                <p>_____________</p>
                </button>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Buy this item</h2>
                <button onClick={closeModal}>Close</button>
                <button>Add to Cart and Buy</button>
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
