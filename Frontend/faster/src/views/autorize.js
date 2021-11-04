import React from 'react';

import BackButton from '../components/backbtn';

import { Link } from 'react-router-dom';

export default function Autorize() {
  return (
    <div>
      <div className="w-screen h-1/2 pr-6 pt-6 flex justify-end">
        <Link to="/"><BackButton/></Link>
      </div>
      <div className="m-9">
        <h1>Autorize</h1>
      </div>
      <div className="flex justify-center mx-auto gap-x-20">
        <div className="border-2 w-96 h-96 shadow-lg bg-blue-100 p-5 ">
          <div >
            <h3>Case</h3>
            <h3>Product</h3>
            <p>Name: Toy car</p>
            <p>Reference: 12345</p>
          </div>
        </div> 
        <div >
        </div>
      </div>
      <div className="flex justify-center mt-10 gap-x-10">
      </div>
      </div> 
  );
}