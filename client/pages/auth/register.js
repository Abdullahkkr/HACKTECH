import React, { useState } from "react";
import Link from "next/link";
// layout for page

import Auth from "layouts/Auth.js";

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cnic, setCnic] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [contactnumber, setContactnumber] = useState("")
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
                  {/* <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button> */}
                </div>
                <hr className="mt-2 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div> */}
                <form>
                  <div className="relative w-full mb-2">
                    <label
                      className="mt-2 block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    Name
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {setName(e.target.value);}}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contact Number (92xxxxxxxxxx)
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Contact Number"
                      value={contactnumber}
                      onChange={(e) => {setContactnumber(e.target.value);}}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Cnic
                    </label>
                    <input
                      type="Cnic"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Cnic"
                      value={cnic}
                      onChange={(e) => {setCnic(e.target.value);}}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      type="Address"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => {setAddress(e.target.value);}}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {setEmail,(e.target.value);}}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {setPassword(e.target.value);}}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
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
                  <Link href="/auth/new_account">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create Account
                    </button>
                    </Link>
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
