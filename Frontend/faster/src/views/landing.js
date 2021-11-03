import React from 'react';
import { Link } from "react-router-dom"

let tok = '';
let userType = '';

export const changeToken = (token) => {
  tok = token;
}

export const changeUserType = (user_type) => {
  userType = user_type;
}

export const getToken = () => {
  return tok;
}


export const getUserType = () => {
  return userType;
}


export default function LandingPage(){
    return(
        <div className="w-screen h-screen p-2">
            <div className=" flex justify-end pt-2 pr-2">
                <Link to="/login">
                <button 
                    className="font-bold text-lg flex justify-end bg-loginButton active:bg-colorBu py-1 px-4"
                    >Login
                </button>
                </Link>
            </div>
            <div className="flex flex-col space-y-3 items-center">
                    <h1>
                        FASTER FIX
                    </h1>
                <div className="text-justify space-y-3 pt-9">
                    
                    <h2>
                        Warranties Manager System
                    </h2>
                    <p className="">
                        The PYMES tend to assign client service responsibilities centralized on only one person that receives requests from everyone. 
                    </p>
                    <p>
                        It creates a bottleneck that can generate bad reputation and legal penalty fees. 
                    </p>
                    <p>
                        Lets change that!
                    </p>
                    <div className="flex pl-5 space-x-5 pt-10">
                        <div className="w-72 ">
                            <ul className="list-disc space-y-2.5">
                            <li>Acknowledge the role of every part of the company in the process</li>
                            <li>Notify automatically the next agent when a case is needing its review</li>
                            <li>Give relevant information to take action.</li>
                            </ul>
                        </div>
                        <div className="w-30"/>
                    </div>
                </div>
                <div className="mt-5">
                    <Link to="/register">
                        <button 
                            className="font-bold text-lg flex justify-end bg-loginButton active:bg-colorBu py-1 px-4"
                            >Start Now
                        </button>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}