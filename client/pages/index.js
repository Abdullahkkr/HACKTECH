import React, { useState } from "react";
import Link from "next/link";
import { login } from './auth/Services-API/api'; 
import { useRouter } from 'next/router';
// layout for page

import Auth from "layouts/Auth.js";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const sendCreds = (e) =>{
    login(email, password).then((response) =>{
      if(!response.data.isSuccessful)
      {
        // console.log("In first if");
        console.log(response.data.message);          
        if(response.data.message === 'credentials are wrong'){
          // console.log("Inside if ");
          alert("Invalid Credentials");
        }
      }
      else if(response.data.isSuccessful)
      { 
        // console.log("in second if ");
        if(response.data.accountType === 'Admin'){
          router.push('/auth/admin_dashboard')
        }
        else{
          let data = [{name: response.data.Name}]
          this.props.history.push({
            pathname: '/auth/profile',
              state: data
          })
          router.push('/auth/user_dashboard')
        }
      }
    })
  }

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
                <hr className="mt-4 border-b-1 border-blueGray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-15 pt-0">
                <div className="text-blueGray-500 text-center">
                  <small>Sign In With Credentials</small>
                </div>
                <form>
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      ID
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="User ID"
                      value={email}
                      onChange={(e) => {setEmail(e.target.value);}}
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

                  <div className="text-center mt-6">
                  {/* <Link href="/auth/user_dashboard"> */}
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick = {() => {sendCreds()}}
                    >
                      Log in
                    </button>
                    {/* </Link> */}
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative ">
              <div className="text-centre mt-1">
                <Link href="/auth/register">
                  <a href="#pablo" className="text-blueGray-500">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;

