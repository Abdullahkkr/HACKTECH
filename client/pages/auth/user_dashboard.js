import React, { useState } from "react";
import Link from "next/link";


// layout for page


import Auth from "layouts/Auth.js";

export default function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

return (
<>
    <div className="container mx-auto px-10 py-20 h-full">
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
            {/* <div className="btn-wrapper text-center"> */}
                {/* <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
                >
                <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                Github
                </button> */}
                {/* <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
                >
                <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                Google
                </button>
            </div> */}
            <hr className="mt-4 border-b-1 border-blueGray-400" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-15 pt-0">
                {/* <div>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                    id="customCheckLogin"
                    type="checkbox"
                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                    </span>
                </label>
                </div> */}
                <div className="text-center mt-6">
                <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                >
                    You are logged in as a Customer
                </button>
                </div>
            </div>
        </div>
        <div className="flex flex-wrap mt-6 relative ">
            {/* <div className="w-1/2">
            <a
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="text-blueGray-200"
            >
                <medium>Forgot password?</medium>
            </a>
            </div> */}
        </div>
        </div>
    </div>
    </div>
</>
);
}

Login.layout = Auth;
