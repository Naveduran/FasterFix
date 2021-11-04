import React from 'react';
import BackButton from "../components/backbtn";
import { Link } from "react-router-dom";
export default function SellerView(){
    return(
        <div>
            <div className="w-screen h-1/2 pr-6 pt-6 flex justify-end"> 
                <Link to="/">
                    <BackButton/>       
                </Link>
            </div>
            <h1 className="mt-9">Detailed View</h1>
            <div className="flex justify-center mx-auto gap-x-20 mt-12">

            </div>
        </div>        
    );
}