import React, { useState } from "react";
// layout for page

import Auth from "layouts/Auth.js";
import { Order_Confirmation } from "./Services-API/api";
import { useRouter } from 'next/router';

import { useAtom } from "jotai"; //this
import { getOrderIDAtom } from "pages/userState";//this

export default function Register() {
  const [getOrderID, setgetOrderID] = useAtom(getOrderIDAtom)//this

  const [Order_ID, setOrder_ID] = useState("")//this

  const router = useRouter()
  const confirmOrder = (e) =>{
    setgetOrderID(Order_ID) //this

    Order_Confirmation(Order_ID).then((response) =>{
      console.log(response.data)
      if(response.data.isSuccessful){
        if(response.data.accountType === 'Customer'){
          router.push('/auth/Confirm_Order')
        }
      }
      else
      {
        if(response.data.accountType === ''){
          console.log("reached outer")
          if (response.data.message === 'customer ID taken'){
            console.log("reached ");
            alert("This user ID is already taken");
          }
        }
      
      }
    })
  }
  return (
    <>
      <div className="container mx-auto px-10 py- mt--1 h-full">
        <div className="flex content-center items-center h-full">
          <div className="w-full lg:w-4/12 px-6 py-10">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-bg rounded-lg bg-blueGray-850 border-0">
              <div className="rounded-t mb-0 px-15 py-15">
                <div className="text-center mb-3">
                <h6 className="text-blueGray-400 text-xl py-30 font-bold">
                    <large>H A C K T E C H</large>
                  </h6>
                  <h6 className="text-blueGray-400 text-l py-2">
                    <small>A tradition of excellent since 2021</small>
                  </h6>
                </div>
                <hr className="mt-2 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Order ID
                    </label>
                    <input
                      type="Order_ID"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Order ID"
                      value={Order_ID}
                      onChange={(e) => {setOrder_ID(e.target.value);}}
                    />
                  </div>
                  
                  
                  {/* <div className="flex flex-wrap mt-6 relative">
              <div className="text-center mt-1">
                <Link href="/auth/login">
                  <a href="#pablo" className="text-blueGray-500">
                    <small>Already have an account</small>
                  </a>
                </Link>
              </div>
            </div> */}
                  <div className="text-center mt-6">
                  {/* <Link href="/auth/new_account"> */}
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick = {() => {confirmOrder()}}
                    >
                      Search
                    </button>
                    {/* </Link> */}
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
