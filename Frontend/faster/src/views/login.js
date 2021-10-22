import React from 'react';

export default function Login() {
  
  return(
    <div class="flex h-screen items-center bg-gray-100 justify-center">
      <div class="w-auto h-auto bg-loginColor p-9 text-center shadow-2xl rounded-3xl">
        <h1 class="m-3 text-5xl italic">
            Faster Fix
        </h1>
        <p>
            Warranties Manager System
        </p>
        <form>
            <label class="flex gap-x-11 my-6">
                <p>
                    Email:
                </p>
                <input type="text" name="name" class="mx-2   border-2 rounded-lg" />
            </label>
            <label class="flex gap-x-3">
                <p>
                    Password
                </p>
                <input type="password" name="name" class="mx-2   border-2 rounded-lg" />
            </label>
            <div class="mt-7">
                <button 
                type="submit" 
                class=" font-bold text-lg  bg-loginButton active:bg-colorBu py-1 px-4"
                >Start
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}